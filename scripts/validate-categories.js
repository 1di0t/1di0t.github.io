#!/usr/bin/env node

/**
 * 카테고리 파일 일관성 검증 스크립트
 *
 * 검증 항목:
 * 1. 파일명(확장자 제외)과 category 필드가 일치하는지
 * 2. category 필드와 permalink의 카테고리명이 일치하는지
 * 3. 대소문자 일관성
 * 4. 포스트에서 사용 중인 카테고리가 categories.yml에 정의되어 있는지
 * 5. 포스트가 0개인 카테고리 경고
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CATEGORY_DIR = path.join(__dirname, '..', 'category');
const POSTS_DIR = path.join(__dirname, '..', '_posts');
const CATEGORIES_YML = path.join(__dirname, '..', '_data', 'categories.yml');
const errors = [];
const warnings = [];

// Front Matter 파싱 함수
function parseFrontMatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  try {
    return yaml.load(match[1]);
  } catch (e) {
    return null;
  }
}

// 모든 포스트에서 사용 중인 카테고리 추출
function extractUsedCategories(postsDir) {
  const usedCategories = new Map(); // 카테고리 -> 포스트 수

  function processDirectory(dir) {
    const items = fs.readdirSync(dir);

    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        processDirectory(fullPath);
      } else if (item.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const frontMatter = parseFrontMatter(content);

        if (frontMatter && frontMatter.category) {
          const count = usedCategories.get(frontMatter.category) || 0;
          usedCategories.set(frontMatter.category, count + 1);
        }
      }
    });
  }

  processDirectory(postsDir);
  return usedCategories;
}

// categories.yml 읽기
function readCategoriesYml(categoriesPath) {
  try {
    const content = fs.readFileSync(categoriesPath, 'utf8');
    const data = yaml.load(content);
    return data.categories || [];
  } catch (e) {
    return [];
  }
}

// 카테고리 파일 읽기
const categoryFiles = fs.readdirSync(CATEGORY_DIR).filter(f => f.endsWith('.html'));

console.log(`\n🔍 카테고리 파일 검증 시작 (총 ${categoryFiles.length}개)\n`);

categoryFiles.forEach(filename => {
  const filepath = path.join(CATEGORY_DIR, filename);
  const content = fs.readFileSync(filepath, 'utf-8');

  // Front matter 파싱 (Windows/Unix 줄바꿈 모두 지원)
  const frontMatterMatch = content.match(/^---[\r\n]+([\s\S]*?)[\r\n]+---/);
  if (!frontMatterMatch) {
    errors.push(`❌ ${filename}: Front matter를 찾을 수 없습니다`);
    return;
  }

  const frontMatter = frontMatterMatch[1];
  const categoryMatch = frontMatter.match(/category:\s*(.+)/);
  const permalinkMatch = frontMatter.match(/permalink:\s*\/category\/(.+?)\//);

  if (!categoryMatch || !permalinkMatch) {
    errors.push(`❌ ${filename}: category 또는 permalink 필드가 없습니다`);
    return;
  }

  const fileBasename = path.basename(filename, '.html');
  const categoryValue = categoryMatch[1].trim();
  const permalinkCategory = permalinkMatch[1].trim();

  // 검증 1: 파일명과 category 일치
  if (fileBasename !== categoryValue) {
    errors.push(
      `❌ ${filename}: 파일명과 category 불일치\n` +
      `   파일명: "${fileBasename}" | category: "${categoryValue}"\n` +
      `   → 파일명을 "${categoryValue}.html"로 변경하세요`
    );
  }

  // 검증 2: category와 permalink 일치
  if (categoryValue !== permalinkCategory) {
    errors.push(
      `❌ ${filename}: category와 permalink 불일치\n` +
      `   category: "${categoryValue}" | permalink: "/category/${permalinkCategory}/"\n` +
      `   → permalink를 "/category/${categoryValue}/"로 수정하세요`
    );
  }

  // 검증 3: 일관성 확인 (모두 일치하는 경우)
  if (fileBasename === categoryValue && categoryValue === permalinkCategory) {
    console.log(`✅ ${filename}: OK (${categoryValue})`);
  }
});

// 추가 검증: 포스트에서 사용 중인 카테고리 확인
console.log('\n🔍 포스트에서 사용 중인 카테고리 검증 중...\n');

const usedCategories = extractUsedCategories(POSTS_DIR);
const definedCategories = readCategoriesYml(CATEGORIES_YML);
const definedCategoryNames = definedCategories.flatMap(cat => [
  cat.id,
  cat.name,
  cat.name_kr,
  cat.name_en
]);

// 검증 4: 사용 중인 카테고리가 categories.yml에 정의되어 있는지
usedCategories.forEach((count, categoryName) => {
  if (!definedCategoryNames.includes(categoryName)) {
    errors.push(
      `❌ 정의되지 않은 카테고리가 포스트에서 사용됨: "${categoryName}"\n` +
      `   ${count}개의 포스트에서 사용 중\n` +
      `   → categories.yml에 이 카테고리를 추가하거나 sync-categories.js를 실행하세요`
    );
  } else {
    console.log(`✅ ${categoryName}: ${count}개의 포스트`);
  }
});

// 검증 5: 포스트가 0개인 카테고리 경고
console.log('\n🔍 사용되지 않는 카테고리 확인 중...\n');

definedCategories.forEach(cat => {
  const categoryNames = [cat.id, cat.name, cat.name_kr, cat.name_en];
  const totalPosts = categoryNames.reduce((sum, name) => {
    return sum + (usedCategories.get(name) || 0);
  }, 0);

  if (totalPosts === 0) {
    warnings.push(
      `⚠️  포스트가 없는 카테고리: "${cat.name}" (id: ${cat.id})\n` +
      `   → 카테고리를 삭제하거나 포스트를 추가하세요`
    );
  }
});

// 결과 출력
console.log('\n' + '='.repeat(60));

if (warnings.length > 0) {
  console.log('\n⚠️  경고:\n');
  warnings.forEach(warn => console.log(warn + '\n'));
}

if (errors.length === 0) {
  console.log('\n✨ 모든 카테고리 파일이 일관성 검증을 통과했습니다!\n');
  if (warnings.length > 0) {
    console.log('⚠️  경고가 있지만 빌드는 계속됩니다.\n');
  }
  console.log('='.repeat(60) + '\n');
  process.exit(0);
} else {
  console.log('\n❌ 다음 문제를 발견했습니다:\n');
  errors.forEach(err => console.log(err + '\n'));
  console.log('='.repeat(60) + '\n');
  console.log('💡 해결 방법: npm run sync:categories를 실행하여 자동으로 동기화하세요.\n');
  process.exit(1);
}
