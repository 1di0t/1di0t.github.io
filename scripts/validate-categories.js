#!/usr/bin/env node

/**
 * 카테고리 파일 일관성 검증 스크립트
 *
 * 검증 항목:
 * 1. 파일명(확장자 제외)과 category 필드가 일치하는지
 * 2. category 필드와 permalink의 카테고리명이 일치하는지
 * 3. 대소문자 일관성
 */

const fs = require('fs');
const path = require('path');

const CATEGORY_DIR = path.join(__dirname, '..', 'category');
const errors = [];
const warnings = [];

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

// 결과 출력
console.log('\n' + '='.repeat(60));
if (errors.length === 0) {
  console.log('\n✨ 모든 카테고리 파일이 일관성 검증을 통과했습니다!\n');
  process.exit(0);
} else {
  console.log('\n⚠️  다음 문제를 발견했습니다:\n');
  errors.forEach(err => console.log(err + '\n'));
  console.log('='.repeat(60) + '\n');
  process.exit(1);
}
