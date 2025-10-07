#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// 태그 디렉토리 생성
const tagsDir = path.join(__dirname, '..', 'tags');
if (!fs.existsSync(tagsDir)) {
  fs.mkdirSync(tagsDir, { recursive: true });
}

// 모든 포스트에서 태그 수집
const postsDir = path.join(__dirname, '..', '_posts');
const allTags = new Set();

function collectTags(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      collectTags(fullPath);
    } else if (item.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const match = content.match(/^---\n([\s\S]*?)\n---/);
      
      if (match) {
        try {
          const frontmatter = yaml.load(match[1]);
          if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
            frontmatter.tags.forEach(tag => allTags.add(tag));
          }
        } catch (e) {
          console.error(`Error parsing ${fullPath}:`, e.message);
        }
      }
    }
  }
}

collectTags(postsDir);

console.log(`Found ${allTags.size} unique tags`);

// 각 태그에 대한 페이지 생성
allTags.forEach(tag => {
  const tagSlug = tag.toLowerCase().replace(/\s+/g, '-');
  const tagFile = path.join(tagsDir, `${tagSlug}.html`);
  
  const content = `---
layout: tag
title: "${tag}"
tag: ${tag}
permalink: /tags/${tag}/
---
`;
  
  fs.writeFileSync(tagFile, content);
  console.log(`Created: ${tagFile}`);
});

console.log('\nTag pages generated successfully!');
