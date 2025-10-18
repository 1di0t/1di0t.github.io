#!/usr/bin/env node

/**
 * Convert all existing blog posts' categories from English to Korean
 *
 * This script:
 * 1. Reads the category mapping from _data/categories.yml
 * 2. Scans all posts in _posts/**\/*.md
 * 3. Extracts Front Matter and converts category: field to Korean
 * 4. Updates each file with Korean category name
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Category mapping from English ID to Korean name
const CATEGORY_MAP = {
  'ai': '인공지능 (AI)',
  'programming': '프로그래밍 (Programming)',
  'web': '웹개발 (Web)',
  'database': '데이터베이스 (Database)',
  'data-science': '데이터사이언스 (Data Science)',
  'data-analysis': '데이터분석 (Data Analysis)',
  'Machine-Learning': '머신러닝 (Machine Learning)',
  'MLOps': 'MLOps',
  'Development': '개발 (Development)',
  'development': '개발 (Development)',  // lowercase variant
  'Git': 'Git',
  'git': 'Git',  // lowercase variant
  'Mobile': '모바일 (Mobile)',
  'network': '네트워크 (Network)',
  'cpp': 'C++',
  'Project': '프로젝트 (Project)',
  'project': '프로젝트 (Project)',  // lowercase variant
  'study': '학습 (Study)',
  'Terms': '용어정리 (Terms)',
  'terms': '용어정리 (Terms)',  // lowercase variant
  'troubleshooting': '트러블슈팅 (Troubleshooting)'
};

/**
 * Find all markdown files in a directory recursively
 */
function findMarkdownFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(findMarkdownFiles(filePath));
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  });

  return results;
}

/**
 * Parse Front Matter from markdown content
 * Returns { frontMatter, content }
 */
function parseFrontMatter(content) {
  // Handle both Windows (\r\n) and Unix (\n) line endings
  const frontMatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    return null;
  }

  const frontMatterText = match[1];
  const bodyContent = match[2];

  try {
    const frontMatter = yaml.load(frontMatterText);
    return { frontMatter, content: bodyContent, raw: frontMatterText };
  } catch (error) {
    console.error('Failed to parse YAML:', error.message);
    return null;
  }
}

/**
 * Convert category to Korean
 */
function convertCategory(category) {
  if (!category) {
    return null;
  }

  // If already Korean (contains Hangul), return as-is
  if (/[\u3131-\uD79D]/.test(category)) {
    return category;
  }

  // Map English to Korean
  const korean = CATEGORY_MAP[category];
  if (korean) {
    return korean;
  }

  // Unknown category - keep as-is
  console.warn(`⚠️  Unknown category: ${category}`);
  return category;
}

/**
 * Process a single file
 */
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = parseFrontMatter(content);

  if (!parsed) {
    console.error(`❌ Failed to parse Front Matter: ${filePath}`);
    return { success: false, reason: 'parse-error' };
  }

  const { frontMatter, content: bodyContent } = parsed;

  // Handle both 'category' (singular) and 'categories' (plural)
  let hasCategory = false;
  let originalCategory = null;
  let koreanCategory = null;
  let fieldName = null;

  if (frontMatter.category) {
    // Single category field
    hasCategory = true;
    fieldName = 'category';
    originalCategory = frontMatter.category;
    koreanCategory = convertCategory(originalCategory);
  } else if (frontMatter.categories) {
    // Multiple categories field (array)
    // Convert 'categories' array to single 'category' field
    hasCategory = true;
    fieldName = 'categories';

    if (Array.isArray(frontMatter.categories)) {
      // Take first category and convert
      const categoriesArray = [...frontMatter.categories];
      originalCategory = categoriesArray[0];
      koreanCategory = convertCategory(originalCategory);

      // Remove 'categories' and add 'category'
      delete frontMatter.categories;
      frontMatter.category = koreanCategory;

      // Process below to reconstruct file (don't return early)
      // We'll handle the writing after the reconstructionstep
    }
  }

  if (!hasCategory) {
    console.warn(`⚠️  No category field: ${filePath}`);
    return { success: false, reason: 'no-category' };
  }

  // If no change needed
  if (originalCategory === koreanCategory && fieldName === 'category') {
    return { success: true, reason: 'already-korean', category: originalCategory };
  }

  // Update category (singular field)
  if (fieldName === 'category') {
    frontMatter.category = koreanCategory;
  }

  // Reconstruct file content
  const newFrontMatter = yaml.dump(frontMatter, {
    lineWidth: -1,  // Don't wrap lines
    quotingType: '"',
    forceQuotes: false
  });

  // Detect original line ending style
  const hasWindowsLineEndings = content.includes('\r\n');
  const lineEnding = hasWindowsLineEndings ? '\r\n' : '\n';

  const newContent = `---${lineEnding}${newFrontMatter}---${lineEnding}${bodyContent}`;

  // Write back to file
  fs.writeFileSync(filePath, newContent, 'utf8');

  return {
    success: true,
    reason: 'converted',
    from: originalCategory,
    to: koreanCategory
  };
}

/**
 * Main execution
 */
function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📝 카테고리 한글 변환 시작\n');

  const postsDir = path.join(__dirname, '..', '_posts');

  if (!fs.existsSync(postsDir)) {
    console.error(`❌ _posts 폴더를 찾을 수 없습니다: ${postsDir}`);
    process.exit(1);
  }

  const files = findMarkdownFiles(postsDir);
  console.log(`📂 총 ${files.length}개 파일 발견\n`);

  const stats = {
    total: files.length,
    converted: 0,
    alreadyKorean: 0,
    noCategory: 0,
    parseError: 0,
    unknown: 0
  };

  const conversions = [];

  files.forEach(filePath => {
    const fileName = path.basename(filePath);
    const result = processFile(filePath);

    if (result.success) {
      if (result.reason === 'converted') {
        stats.converted++;
        conversions.push({
          file: fileName,
          from: result.from,
          to: result.to
        });
        console.log(`✅ ${fileName}`);
        console.log(`   ${result.from} → ${result.to}`);
      } else if (result.reason === 'already-korean') {
        stats.alreadyKorean++;
        console.log(`✓  ${fileName} (이미 한글)`);
      }
    } else {
      if (result.reason === 'no-category') {
        stats.noCategory++;
      } else if (result.reason === 'parse-error') {
        stats.parseError++;
      } else {
        stats.unknown++;
      }
    }
  });

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎉 변환 완료!\n');
  console.log('📊 결과 요약:');
  console.log(`- 총 파일: ${stats.total}개`);
  console.log(`- 변환됨: ${stats.converted}개`);
  console.log(`- 이미 한글: ${stats.alreadyKorean}개`);
  console.log(`- 카테고리 없음: ${stats.noCategory}개`);
  console.log(`- 파싱 오류: ${stats.parseError}개`);

  if (conversions.length > 0) {
    console.log('\n📝 변환 내역:');
    conversions.forEach(({ file, from, to }) => {
      console.log(`   ${from} → ${to} (${file})`);
    });
  }

  console.log('\n✨ 모든 작업이 완료되었습니다!');
}

// Run the script
main();
