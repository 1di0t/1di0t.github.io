#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 디렉토리 생성
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// 포스트 파일 읽기
const postsDir = path.join(__dirname, '_posts');
const posts = fs.readdirSync(postsDir)
  .filter(file => file.endsWith('.md'))
  .map(file => {
    const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const { data } = matter(content);
    return data;
  });

// 태그와 카테고리 추출
const tags = new Set();
const categories = new Set();

posts.forEach(post => {
  if (post.tags) {
    if (Array.isArray(post.tags)) {
      post.tags.forEach(tag => tags.add(tag));
    } else {
      tags.add(post.tags);
    }
  }
  if (post.category) {
    if (Array.isArray(post.category)) {
      post.category.forEach(cat => categories.add(cat));
    } else {
      categories.add(post.category);
    }
  }
});

// 슬러그 생성 함수 (한글 유지)
const createSlug = (str) => {
  return encodeURIComponent(str.trim().toLowerCase().replace(/\s+/g, '-'));
};

// 태그 페이지 생성
ensureDir(path.join(__dirname, 'tags'));
tags.forEach(tag => {
  const slug = createSlug(tag);
  const filename = Buffer.from(tag).toString('base64').replace(/[/+=]/g, '_');
  const content = `---
layout: tag
title: "${tag}"
tag: "${tag}"
permalink: /tags/${slug}/
---
`;
  fs.writeFileSync(path.join(__dirname, 'tags', `${filename}.html`), content);
  console.log(`Created tag page: ${tag} -> tags/${filename}.html`);
});

// 카테고리 페이지 생성
ensureDir(path.join(__dirname, 'category'));
categories.forEach(category => {
  const slug = createSlug(category);
  const filename = Buffer.from(category).toString('base64').replace(/[/+=]/g, '_');
  const content = `---
layout: category
title: "${category}"
category: "${category}"
permalink: /category/${slug}/
---
`;
  fs.writeFileSync(path.join(__dirname, 'category', `${filename}.html`), content);
  console.log(`Created category page: ${category} -> category/${filename}.html`);
});

console.log(`\nGenerated ${tags.size} tag pages and ${categories.size} category pages.`);
