#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// ANSI 색상 코드
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

// 카테고리 ID를 정규화 (한글 카테고리명을 ID로 변환)
function normalizeToId(categoryName) {
  const mapping = {
    '인공지능 (AI)': 'ai',
    'AI': 'ai',
    '인공지능': 'ai',
    '프로그래밍 (Programming)': 'programming',
    'Programming': 'programming',
    '프로그래밍': 'programming',
    '웹개발 (Web)': 'web',
    'Web': 'web',
    '웹개발': 'web',
    '데이터베이스 (Database)': 'database',
    'Database': 'database',
    '데이터베이스': 'database',
    '데이터사이언스 (Data Science)': 'data-science',
    'Data Science': 'data-science',
    '데이터사이언스': 'data-science',
    '데이터분석 (Data Analysis)': 'data-analysis',
    'Data Analysis': 'data-analysis',
    '데이터분석': 'data-analysis',
    '머신러닝 (Machine Learning)': 'Machine-Learning',
    'Machine Learning': 'Machine-Learning',
    '머신러닝': 'Machine-Learning',
    'MLOps': 'MLOps',
    '개발 (Development)': 'Development',
    'Development': 'Development',
    '개발': 'Development',
    'Git': 'Git',
    '모바일 (Mobile)': 'Mobile',
    'Mobile': 'Mobile',
    '모바일': 'Mobile',
    '네트워크 (Network)': 'network',
    'Network': 'network',
    '네트워크': 'network',
    'C++': 'cpp',
    '프로젝트 (Project)': 'Project',
    'Project': 'Project',
    '프로젝트': 'Project',
    '학습 (Study)': 'study',
    'Study': 'study',
    '학습': 'study',
    '용어정리 (Terms)': 'Terms',
    'Terms': 'Terms',
    '용어정리': 'Terms',
    '트러블슈팅 (Troubleshooting)': 'troubleshooting',
    'Troubleshooting': 'troubleshooting',
    '트러블슈팅': 'troubleshooting',
    '커피 (Coffee)': 'coffee',
    'Coffee': 'coffee',
    '커피': 'coffee',
  };

  // 정확히 일치하는 매핑이 있으면 사용
  if (mapping[categoryName]) {
    return mapping[categoryName];
  }

  // 없으면 ID 형식으로 변환 (공백, 괄호 제거 후 소문자 및 하이픈 사용)
  return categoryName
    .replace(/\s*\([^)]*\)/g, '') // 괄호 및 내용 제거
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// 카테고리명에서 영문/한글명 추출
function extractNames(categoryName) {
  const match = categoryName.match(/^(.+?)\s*\((.+?)\)$/);
  if (match) {
    // "한글 (English)" 형식
    return {
      name_kr: match[1].trim(),
      name_en: match[2].trim(),
      name: categoryName,
    };
  } else {
    // 단일 이름 (한글 또는 영문)
    const isKorean = /[가-힣]/.test(categoryName);
    return {
      name_kr: categoryName,
      name_en: categoryName,
      name: categoryName,
    };
  }
}

// Front Matter 파싱
function parseFrontMatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  try {
    return yaml.load(match[1]);
  } catch (e) {
    console.error('YAML 파싱 오류:', e.message);
    return null;
  }
}

// 모든 포스트에서 사용 중인 카테고리 추출
function extractUsedCategories(postsDir) {
  const usedCategories = new Set();

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
          usedCategories.add(frontMatter.category);
        }
      }
    });
  }

  processDirectory(postsDir);
  return Array.from(usedCategories);
}

// categories.yml 읽기
function readCategoriesYml(categoriesPath) {
  try {
    const content = fs.readFileSync(categoriesPath, 'utf8');
    const data = yaml.load(content);
    return data.categories || [];
  } catch (e) {
    console.error('categories.yml 읽기 오류:', e.message);
    return [];
  }
}

// categories.yml 쓰기
function writeCategoriesYml(categoriesPath, categories) {
  // 원본 파일의 주석 및 구조 보존
  const originalContent = fs.readFileSync(categoriesPath, 'utf8');

  // 주석 부분 추출 (categories: 이전 부분)
  const headerMatch = originalContent.match(/^([\s\S]*?)(categories:)/);
  const header = headerMatch ? headerMatch[1] : '';

  // 카테고리 데이터를 YAML로 변환
  const categoriesYaml = yaml.dump({ categories }, {
    lineWidth: -1,
    quotingType: '"',
    forceQuotes: false,
    indent: 2,
  });

  // 헤더와 카테고리 데이터 결합
  const newContent = header + categoriesYaml;

  fs.writeFileSync(categoriesPath, newContent, 'utf8');
}

// 카테고리 페이지 생성
function createCategoryPage(categoryDir, categoryId, categoryName) {
  const pagePath = path.join(categoryDir, `${categoryId}.html`);

  // 이미 존재하면 생성하지 않음 (수동 수정 보존)
  if (fs.existsSync(pagePath)) {
    console.log(`  ${colors.blue}→ 카테고리 페이지 이미 존재: ${categoryId}.html${colors.reset}`);
    return false;
  }

  const content = `---
layout: category
title: "${categoryName}"
category: ${categoryId}
permalink: /category/${categoryId}/
---
`;

  fs.writeFileSync(pagePath, content, 'utf8');
  console.log(`  ${colors.green}✓ 카테고리 페이지 생성: ${categoryId}.html${colors.reset}`);
  return true;
}

// 메인 함수
function main() {
  console.log(`${colors.bright}${colors.cyan}=== 카테고리 자동 동기화 시작 ===${colors.reset}\n`);

  const postsDir = path.join(__dirname, '..', '_posts');
  const categoriesPath = path.join(__dirname, '..', '_data', 'categories.yml');
  const categoryDir = path.join(__dirname, '..', 'category');

  // 1. 사용 중인 카테고리 추출
  console.log(`${colors.yellow}1. 포스트에서 사용 중인 카테고리 추출...${colors.reset}`);
  const usedCategories = extractUsedCategories(postsDir);
  console.log(`   발견된 카테고리: ${usedCategories.length}개`);
  usedCategories.forEach(cat => console.log(`   - ${cat}`));

  // 2. 기존 categories.yml 읽기
  console.log(`\n${colors.yellow}2. 기존 categories.yml 읽기...${colors.reset}`);
  const existingCategories = readCategoriesYml(categoriesPath);
  const existingIds = existingCategories.map(cat => cat.id);
  const existingNames = existingCategories.flatMap(cat => [cat.id, cat.name, cat.name_kr, cat.name_en]);
  console.log(`   기존 카테고리: ${existingCategories.length}개`);

  // 3. 누락된 카테고리 찾기
  console.log(`\n${colors.yellow}3. 누락된 카테고리 확인...${colors.reset}`);
  const missingCategories = [];

  usedCategories.forEach(usedCat => {
    const normalizedId = normalizeToId(usedCat);

    // ID, name, name_kr, name_en 중 하나라도 일치하면 존재하는 것으로 간주
    const exists = existingNames.includes(usedCat) || existingIds.includes(normalizedId);

    if (!exists) {
      missingCategories.push(usedCat);
    }
  });

  if (missingCategories.length === 0) {
    console.log(`   ${colors.green}✓ 모든 카테고리가 이미 등록되어 있습니다.${colors.reset}`);
  } else {
    console.log(`   ${colors.red}⚠ 누락된 카테고리: ${missingCategories.length}개${colors.reset}`);
    missingCategories.forEach(cat => console.log(`   - ${cat}`));

    // 4. 누락된 카테고리 추가
    console.log(`\n${colors.yellow}4. 누락된 카테고리를 categories.yml에 추가...${colors.reset}`);

    missingCategories.forEach(missingCat => {
      const id = normalizeToId(missingCat);
      const names = extractNames(missingCat);

      const newCategory = {
        id: id,
        name_en: names.name_en,
        name_kr: names.name_kr,
        name: names.name,
        description: `${names.name_kr} 관련 내용`,
        parent: 'study', // 기본값
        pacer_tendency: 'conceptual', // 기본값
        keywords: [
          id,
          names.name_en.toLowerCase(),
          names.name_kr,
        ],
      };

      existingCategories.push(newCategory);
      console.log(`   ${colors.green}✓ 추가: ${newCategory.name} (id: ${id})${colors.reset}`);
    });

    // categories.yml 업데이트
    writeCategoriesYml(categoriesPath, existingCategories);
    console.log(`\n${colors.green}✓ categories.yml 업데이트 완료${colors.reset}`);
  }

  // 5. 카테고리 페이지 생성
  console.log(`\n${colors.yellow}5. 카테고리 페이지 확인 및 생성...${colors.reset}`);
  let createdPages = 0;

  existingCategories.forEach(cat => {
    if (createCategoryPage(categoryDir, cat.id, cat.name)) {
      createdPages++;
    }
  });

  if (createdPages > 0) {
    console.log(`\n${colors.green}✓ ${createdPages}개의 카테고리 페이지 생성 완료${colors.reset}`);
  } else {
    console.log(`\n${colors.blue}→ 모든 카테고리 페이지가 이미 존재합니다.${colors.reset}`);
  }

  // 요약
  console.log(`\n${colors.bright}${colors.cyan}=== 동기화 완료 ===${colors.reset}`);
  console.log(`사용 중인 카테고리: ${usedCategories.length}개`);
  console.log(`등록된 카테고리: ${existingCategories.length}개`);
  console.log(`추가된 카테고리: ${colors.green}${missingCategories.length}개${colors.reset}`);
  console.log(`생성된 페이지: ${colors.green}${createdPages}개${colors.reset}\n`);
}

// 실행
if (require.main === module) {
  main();
}

module.exports = { normalizeToId, extractNames };
