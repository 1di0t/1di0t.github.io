#!/usr/bin/env node

/**
 * AutoBlog Post Formatter - 기존 블로그 스타일 유지
 * Claude API를 사용하여 초안을 블로그 포스트로 자동 정리
 *
 * 사용법:
 * node scripts/format-post.js <draft-file-path>
 *
 * 환경 변수:
 * ANTHROPIC_API_KEY - Claude API 키
 */

const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const SYSTEM_PROMPT = `당신은 기술 블로그 포스트 작성 전문가입니다. 러프한 메모나 초안을 잘 구조화된 블로그 포스트로 정리하는 역할을 합니다.

다음 규칙을 따라 주세요:
1. 제목은 H1 (# 제목)으로 시작
2. 간단한 요약을 첫 문단에 작성
3. 적절한 헤딩 구조 사용 (H2, H3)
4. 코드 예시는 언어를 명시한 코드 블록으로
5. 리스트는 가독성 좋게 정리
6. Front matter는 YAML 형식으로 제공
7. 원본의 핵심 내용은 모두 보존
8. 자연스러운 한국어 사용
9. 카테고리는 다음 중 하나 선택: ai, cpp, data-analysis, data-science, database, Development, Git, Machine-Learning, MLOps, Mobile, network, programming, Project, study, Terms, troubleshooting, web
10. 관련된 태그를 3-5개 추가 (영문 소문자, 하이픈 구분)

출력 형식:
---
layout: post
title: "포스트 제목"
date: YYYY-MM-DD
categories: [category]
tags: [tag1, tag2, tag3]
---

포스트 내용...`;

async function formatPost(draftPath) {
    // API 키 확인
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        console.error('❌ Error: ANTHROPIC_API_KEY 환경 변수가 설정되지 않았습니다.');
        console.error('   GitHub Actions에서 실행 중이라면 Secrets에 API 키를 추가하세요.');
        process.exit(1);
    }

    // 파일 읽기
    if (!fs.existsSync(draftPath)) {
        console.error(`❌ Error: 파일을 찾을 수 없습니다: ${draftPath}`);
        process.exit(1);
    }

    const draftContent = fs.readFileSync(draftPath, 'utf-8');
    console.log(`📖 Reading draft: ${draftPath}`);
    console.log(`   Length: ${draftContent.length} characters\n`);

    // Claude API 호출
    const anthropic = new Anthropic({
        apiKey: apiKey,
    });

    console.log('🤖 Formatting with Claude...');

    try {
        const message = await anthropic.messages.create({
            model: 'claude-3-5-haiku-20241022',
            max_tokens: 4096,
            system: SYSTEM_PROMPT,
            messages: [
                {
                    role: 'user',
                    content: `다음 초안을 블로그 포스트로 정리해주세요:\n\n${draftContent}`
                }
            ],
        });

        const formattedContent = message.content[0].text;
        console.log('✅ Formatting complete!\n');

        // 저장 경로 결정 (_drafts -> _posts)
        const fileName = path.basename(draftPath);

        // 파일명에서 날짜 추출 또는 현재 날짜 사용
        let dateMatch = fileName.match(/^(\d{4})-(\d{2})-(\d{2})-/);
        let dateStr;
        if (dateMatch) {
            dateStr = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
        } else {
            dateStr = new Date().toISOString().split('T')[0];
        }

        // 연도-월 폴더 생성
        const [year, month] = dateStr.split('-');
        const postsDir = path.join(path.dirname(path.dirname(draftPath)), '_posts', `${year}-${month}`);

        // _posts/YYYY-MM 폴더가 없으면 생성
        if (!fs.existsSync(postsDir)) {
            fs.mkdirSync(postsDir, { recursive: true });
        }

        // 파일명에 날짜가 없으면 추가
        let outputFileName = fileName;
        if (!dateMatch) {
            outputFileName = `${dateStr}-${fileName}`;
        }

        const outputPath = path.join(postsDir, outputFileName);

        // 저장
        fs.writeFileSync(outputPath, formattedContent, 'utf-8');
        console.log(`💾 Saved to: ${outputPath}`);
        console.log(`   Length: ${formattedContent.length} characters`);

        // 원본 삭제 (선택)
        if (process.env.DELETE_DRAFT === 'true') {
            fs.unlinkSync(draftPath);
            console.log(`🗑️  Deleted draft: ${draftPath}`);
        }

        return outputPath;

    } catch (error) {
        console.error('❌ Error calling Claude API:', error.message);
        if (error.status) {
            console.error(`   Status: ${error.status}`);
        }
        process.exit(1);
    }
}

// CLI 실행
if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.error('Usage: node scripts/format-post.js <draft-file-path>');
        console.error('');
        console.error('Example:');
        console.error('  node scripts/format-post.js _drafts/my-post.md');
        process.exit(1);
    }

    const draftPath = path.resolve(args[0]);
    formatPost(draftPath).catch(error => {
        console.error('❌ Unexpected error:', error);
        process.exit(1);
    });
}

module.exports = { formatPost };
