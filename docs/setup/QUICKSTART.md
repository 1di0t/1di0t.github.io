# ⚡ AutoBlog 5분 시작 가이드

> **"대충 작성 → Claude 정리 → 자동 배포"**
> 3단계로 끝나는 블로그 작성

---

## 📊 워크플로우

### 방법 1: 단일 파일 (기본)
```
1️⃣ Obsidian에 러프하게 작성 (_drafts/)
    ↓
2️⃣ Claude Desktop "블로그 정리: 파일명"
    ↓  (카테고리/태그 자동 추천)
3️⃣ 10분 후 자동 배포
    ↓
✅ https://1di0t.github.io 에서 확인!
```

### 방법 2: 배치 처리 (NEW! 🔥)
```
1️⃣ Obsidian에 여러 글 작성 (_drafts/)
    ↓
2️⃣ Claude Desktop: /blog-batch  ← 1줄!
    ↓  (최대 3개 파일 일괄 처리)
3️⃣ 10분 후 자동 배포
    ↓
✅ https://1di0t.github.io 에서 확인!
```

**자동화율: 95% → 99% (Slash Commands 사용 시)**
**입력 길이: 150자 → 15자 (90% 감소)**

---

## 🚀 시작하기 (4단계)

### 1단계: 기본 설치 (최초 1회, 15분)

1. **Obsidian 설치**
   - https://obsidian.md/download
   - `E:\self\AutoBlog` 폴더 열기

2. **Claude Desktop 설치**
   - https://claude.ai/download
   - Claude MAX 구독 필요

3. **Node.js 설치** (MCP 필수)
   - https://nodejs.org/ → LTS 버전
   - 설치 확인: `npx --version`

4. **Git 인증**
   ```bash
   cd E:\self\AutoBlog
   git config user.name "1di0t"
   git config user.email "your-email@example.com"
   ```

5. **Obsidian Git 플러그인**
   ```
   Settings → Community plugins
   → "Obsidian Git" 설치/활성화
   → Interval: 10분
   ```

---

### 2단계: MCP 설정 (최초 1회, 5분)

**Claude Desktop에서**:
```
/mcp-setup
```

안내에 따라 설정 파일 생성 (상세: [MCP_SETUP.md](MCP_SETUP.md))

**테스트**:
```
"_drafts 폴더 읽어줘"
```

✅ 파일 목록 표시되면 성공!

---

### 3단계: 글 작성 (매번, 1분)

#### A. 러프하게 작성
`_drafts/my-idea.md`:
```markdown
# 오늘 배운 것

- Python 데코레이터
- @property, @staticmethod
- 예제 추가 필요
```

#### B. Claude Desktop에서 정리

**단일 파일**:
```
/blog my-idea.md
```

**배치 처리** (여러 파일 한 번에):
```
/blog-batch
```

Claude가 자동으로:
- ✅ 카테고리 추천 (17개 중)
- ✅ 태그 생성 (3-5개)
- ✅ Front Matter 작성
- ✅ 내용 정리 + 코드 예시
- ✅ `_posts/YYYY-MM/` 저장

---

### 4단계: 배포 확인 (자동, 10분)

1. **10분 후**: Obsidian Git 자동 커밋
2. **1-2분 후**: GitHub Actions 자동 빌드
3. **완료**: https://1di0t.github.io 에서 확인

---

## 💡 카테고리 자동 추천

Claude가 내용을 분석하여 다음 17개 카테고리 중 자동 선택:

| 카테고리 | 예시 키워드 |
|---------|------------|
| **ai** | machine learning, deep learning, neural network |
| **programming** | python, javascript, algorithm, function |
| **web** | html, css, react, django, api |
| **database** | sql, mysql, mongodb, query |
| **data-science** | pandas, numpy, visualization |
| **troubleshooting** | error, bug, fix, debug |

**매칭 로직**:
1. 포스트 내용에서 키워드 추출
2. `_data/categories.yml` 참조
3. 가장 많이 매칭되는 카테고리 선택
4. 매칭률 < 30% → 새 카테고리 제안

---

## 📱 OS별 차이점

| OS | 글 작성 | Claude 정리 | 자동 배포 |
|----|---------|-------------|----------|
| **Windows** | ✅ Obsidian | ✅ Claude Desktop | ✅ 자동 |
| **macOS** | ✅ Obsidian | ✅ Claude Desktop | ✅ 자동 |
| **Linux** | ✅ Obsidian | ✅ Claude Desktop | ✅ 자동 |
| **iOS/Android** | ✅ Mobile | ⚠️ PC 필요 | ✅ 자동 |

**모바일**: 러프 작성만 가능, 정리는 PC에서

---

## 🎯 실전 예시

### Before (사용자가 작성)
```markdown
# _drafts/docker-tips.md

Docker Compose 팁

1. 환경변수 .env로 분리
2. depends_on 순서 중요
3. volumes 경로 주의
```

### After (Claude가 정리)
```markdown
---
layout: post
title: "Docker Compose 실무 팁 3가지"
date: 2025-10-18
category: Development
tags: [docker, docker-compose, devops, tips]
excerpt: "Docker Compose를 실무에서 사용할 때 알아두면 좋은 팁"
---

# Docker Compose 실무 팁 3가지

## 1. 환경변수 .env 파일로 분리

docker-compose.yml에 직접 환경변수를 하드코딩하지 말고...

```yaml
# docker-compose.yml
services:
  db:
    environment:
      POSTGRES_USER: ${DB_USER}
```

...
```

---

## 🔧 트러블슈팅

### Q1: Obsidian Git 자동 커밋 안 됨
```bash
# 설정 확인
Settings → Obsidian Git → Interval: 10

# Git 인증 확인
git config user.name
git config user.email
```

### Q2: Claude가 파일을 못 찾음
```json
// C:\Users\YourName\AppData\Roaming\Claude\claude_desktop_config.json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "E:\\self\\AutoBlog"]
    }
  }
}
```

### Q3: 배포 실패
```bash
# GitHub Actions 확인
https://github.com/1di0t/1di0t.github.io/actions

# 로컬 테스트
bundle exec jekyll build
```

---

## 📚 상세 가이드

| 문서 | 내용 |
|------|------|
| **[DEPLOYMENT_SIMPLE.md](DEPLOYMENT_SIMPLE.md)** | 배포 가이드 (초간단) |
| **[CATEGORY_AUTO.md](CATEGORY_AUTO.md)** | 카테고리 자동화 설명 |
| **[WRITING_GUIDE.md](WRITING_GUIDE.md)** | 작성 가이드 (상세) |

---

## ✅ 체크리스트

### 최초 설정 (1회)
- [ ] Obsidian 설치
- [ ] Claude Desktop 설치
- [ ] Obsidian Git 플러그인 설치
- [ ] Git 인증 설정

### 글 작성 시 (매번)
- [ ] `_drafts/`에 러프하게 작성
- [ ] Claude Desktop "블로그 정리: 파일명"
- [ ] 10분 후 자동 배포 확인
- [ ] https://1di0t.github.io 에서 확인

---

## 🎉 완료!

이제 **"블로그 정리: 파일명"** 한 줄이면 끝!

**"The best blog is the one you actually write."** 💪
