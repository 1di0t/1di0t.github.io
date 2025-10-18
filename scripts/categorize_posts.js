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
};

// PACER 타입 분석 함수
function analyzePacerType(content, title) {
  const scores = {
    procedural: 0,
    conceptual: 0,
    evidence: 0,
    reference: 0,
    analogous: 0
  };

  // 코드 블록 개수 (```)
  const codeBlocks = (content.match(/```/g) || []).length / 2;

  // Procedural 지표
  if (codeBlocks >= 3) scores.procedural += 3;
  if (codeBlocks >= 1) scores.procedural += 1;
  if (/단계|step|가이드|guide|방법|how to|튜토리얼|tutorial/i.test(content)) {
    scores.procedural += 2;
  }
  if (/명령어|command|설치|install|실행|run/i.test(content)) {
    scores.procedural += 1;
  }

  // Conceptual 지표
  if (/이란|란\?|정의|definition|개념|concept|이론|theory|원리|principle/i.test(content)) {
    scores.conceptual += 3;
  }
  if (/## 개요|## 설명|## 개념/i.test(content)) {
    scores.conceptual += 2;
  }
  if (/무엇|what is|왜|why/i.test(content)) {
    scores.conceptual += 1;
  }

  // Evidence 지표
  if (/프로젝트|project|개발일지|dev log|사례|case|경험|experience/i.test(content)) {
    scores.evidence += 3;
  }
  if (/트러블슈팅|troubleshooting|문제|problem|해결|solution|에러|error/i.test(content)) {
    scores.evidence += 2;
  }
  if (/## Trouble|## 문제|## 해결/i.test(content)) {
    scores.evidence += 2;
  }

  // Reference 지표
  const lines = content.split('\n').length;
  if (lines < 150) scores.reference += 1;
  if (lines < 100) scores.reference += 1;

  if (/\| .+ \| .+ \|/g.test(content)) { // 테이블 형식
    scores.reference += 2;
  }
  if (/치트시트|cheatsheet|명령어 모음|참고/i.test(title)) {
    scores.reference += 3;
  }

  // Analogous 지표
  if (/비유|비교|compare|처럼|like|마치|같은|similar|차이|difference/i.test(content)) {
    scores.analogous += 2;
  }
  if (/vs |와 |과 |비교/i.test(title)) {
    scores.analogous += 2;
  }

  // 최고 점수 찾기
  let maxScore = 0;
  let primaryType = 'conceptual'; // 기본값

  for (const [type, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      primaryType = type;
    }
  }

  // 복합 타입 판단 (점수가 비슷한 경우)
  const types = [];
  Object.entries(scores)
    .filter(([type, score]) => score >= maxScore * 0.7 && score > 0)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type]) => types.push(type));

  return types.length > 1 ? types : [primaryType];
}

// 상위 카테고리 매핑
function getParentCategory(category) {
  const categoryMapping = {
    'ai': 'study',
    'programming': 'study',
    'web': 'study',
    'database': 'study',
    'data-science': 'study',
    'data-analysis': 'study',
    'Machine-Learning': 'study',
    'MLOps': 'study',
    'Development': 'study',
    'Git': 'study',
    'Mobile': 'study',
    'network': 'study',
    'cpp': 'study',
    'Project': 'project',
    'study': 'documentation',
    'Terms': 'documentation',
    'troubleshooting': 'troubleshooting',
    'coffee': 'hobby',
    // 한글 카테고리도 지원
    '인공지능 (AI)': 'study',
    '프로그래밍 (Programming)': 'study',
    '웹개발 (Web)': 'study',
    '데이터베이스 (Database)': 'study',
    '데이터사이언스 (Data Science)': 'study',
    '데이터분석 (Data Analysis)': 'study',
    '머신러닝 (Machine Learning)': 'study',
    '개발 (Development)': 'study',
    '네트워크 (Network)': 'study',
    '모바일 (Mobile)': 'study',
    'C++': 'study',
    '프로젝트 (Project)': 'project',
    '학습 (Study)': 'documentation',
    '용어정리 (Terms)': 'documentation',
    '트러블슈팅 (Troubleshooting)': 'troubleshooting',
    '커피 (Coffee)': 'hobby',
  };

  return categoryMapping[category] || 'study';
}

// Front Matter 파싱
function parseFrontMatter(content) {
  // Windows (\r\n)와 Unix (\n) 줄바꿈 모두 처리
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  try {
    return yaml.load(match[1]);
  } catch (e) {
    console.error('YAML 파싱 오류:', e.message);
    return null;
  }
}

// Front Matter 업데이트
function updateFrontMatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const frontMatter = parseFrontMatter(content);

  if (!frontMatter) {
    console.log(`${colors.yellow}⚠ ${filePath}: Front Matter 없음${colors.reset}`);
    return false;
  }

  // 이미 learning_framework가 있으면 스킵
  if (frontMatter.learning_framework) {
    console.log(`${colors.blue}→ ${path.basename(filePath)}: 이미 분류됨${colors.reset}`);
    return false;
  }

  // PACER 타입 분석
  const pacerTypes = analyzePacerType(content, frontMatter.title || '');

  // 상위 카테고리 결정
  const parentCategory = getParentCategory(frontMatter.category);

  // Front Matter 업데이트
  frontMatter.parent_category = parentCategory;
  frontMatter.learning_framework = {
    stage: 'digestion',
    pacer_type: pacerTypes[0],
  };

  if (pacerTypes.length > 1) {
    frontMatter.learning_framework.pacer_types = pacerTypes;
  }

  // 새 Front Matter 생성
  const newFrontMatter = yaml.dump(frontMatter, {
    lineWidth: -1,
    quotingType: '"',
    forceQuotes: false,
  });

  // 파일 업데이트 (Windows/Unix 줄바꿈 모두 처리)
  const newContent = content.replace(
    /^---\r?\n[\s\S]*?\r?\n---/,
    `---\r\n${newFrontMatter}---`
  );

  fs.writeFileSync(filePath, newContent, 'utf8');

  console.log(`${colors.green}✓ ${path.basename(filePath)}${colors.reset}`);
  console.log(`  카테고리: ${frontMatter.category} → ${parentCategory}`);
  console.log(`  PACER: ${pacerTypes.join(', ')}`);

  return true;
}

// 메인 함수
function main() {
  console.log(`${colors.bright}${colors.cyan}=== 블로그 포스트 자동 분류 시작 ===${colors.reset}\n`);

  const postsDir = path.join(__dirname, '..', '_posts');
  let totalCount = 0;
  let updatedCount = 0;

  // _posts 폴더의 모든 하위 폴더 탐색
  function processDirectory(dir) {
    const items = fs.readdirSync(dir);

    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        processDirectory(fullPath);
      } else if (item.endsWith('.md')) {
        totalCount++;
        if (updateFrontMatter(fullPath)) {
          updatedCount++;
        }
      }
    });
  }

  processDirectory(postsDir);

  console.log(`\n${colors.bright}${colors.cyan}=== 처리 완료 ===${colors.reset}`);
  console.log(`총 포스트: ${totalCount}개`);
  console.log(`업데이트: ${colors.green}${updatedCount}개${colors.reset}`);
  console.log(`스킵: ${totalCount - updatedCount}개\n`);
}

// 실행
if (require.main === module) {
  main();
}

module.exports = { analyzePacerType, getParentCategory };
