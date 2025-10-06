# 📚 개발 블로그

Jekyll + Tailwind CSS 기반의 깔끔한 개인 블로그입니다.

🔗 **블로그 주소**: [https://1di0t.github.io](https://1di0t.github.io)

## ✨ 주요 기능

### 1차 구현 완료 (필수 기능)
- ✅ **Markdown 지원**: 포스트 작성을 위한 Markdown 문법
- ✅ **코드 하이라이팅**: Rouge를 사용한 문법 강조 (모든 언어 지원)
- ✅ **목차(TOC) 자동 생성**: JavaScript 기반 동적 목차
- ✅ **코드 복사 버튼**: 클립보드 API를 활용한 원클릭 복사
- ✅ **반응형 디자인**: 모바일/태블릿/데스크톱 완벽 지원
- ✅ **SEO 최적화**: jekyll-seo-tag, sitemap, robots.txt
- ✅ **카테고리/태그 시스템**: 계층 구조 카테고리 + 태그
- ✅ **사이드바 네비게이션**: 좌측 고정 사이드바
- ✅ **다크모드**: 토글 버튼 + localStorage 저장
- ✅ **읽기 시간 표시**: 자동 계산

### 2차 구현 예정
- ⏳ 수학 수식 지원 (KaTeX)
- ⏳ 클라이언트 사이드 검색 (Lunr.js)
- ⏳ Giscus 댓글 시스템
- ⏳ Open Graph 태그
- ⏳ 이전/다음 포스트 네비게이션

### 3차 선택사항
- ⏳ Google Analytics
- ⏳ 이미지 최적화 (WebP)
- ⏳ PWA 기능
- ⏳ 관련 포스트 추천

## 🛠 기술 스택

- **정적 사이트 생성기**: Jekyll 4.3
- **CSS 프레임워크**: Tailwind CSS 3.4
- **템플릿 엔진**: Liquid
- **마크다운 파서**: Kramdown
- **문법 하이라이터**: Rouge
- **배포**: GitHub Pages + GitHub Actions
- **댓글 (예정)**: Giscus

## 📁 프로젝트 구조

```
githubPage/
├── _config.yml              # Jekyll 설정
├── Gemfile                  # Ruby 의존성
├── package.json             # Node.js 의존성
├── tailwind.config.js       # Tailwind 설정
│
├── _layouts/                # 레이아웃 템플릿
│   ├── default.html         # 기본 레이아웃
│   ├── post.html            # 포스트 레이아웃
│   ├── page.html            # 일반 페이지
│   ├── category.html        # 카테고리 페이지
│   └── tag.html             # 태그 페이지
│
├── _includes/               # 재사용 컴포넌트
│   ├── sidebar.html         # 사이드바
│   └── footer.html          # 푸터
│
├── _pages/                  # 정적 페이지
│   ├── blog.html            # 전체 포스트
│   ├── about.md             # 소개
│   └── projects.html        # 프로젝트
│
├── _posts/                  # 블로그 포스트 (발행된 글)
│   └── YYYY-MM-DD-title.md
│
├── docs/                    # 문서 (Git 제외)
│   ├── POST_GUIDE.md        # 포스트 작성 완벽 가이드
│   ├── AI_WORKFLOW.md       # AI 기반 글 작성 워크플로우
│   ├── AI_PROMPT.md         # AI 프롬프트 템플릿
│   ├── Guide.txt            # 글쓰기 품질 가이드라인
│   ├── Flow.md              # 시스템 작동 원리
│   └── drafts/              # 초안 작업 폴더
│       └── TEMPLATE.md      # 초안 작성 템플릿
│
├── assets/                  # 정적 리소스
│   ├── css/
│   ├── js/
│   ├── fonts/
│   └── images/
│
└── .github/workflows/       # GitHub Actions
    └── deploy.yml
```

## 🚀 시작하기

### 사전 요구사항

- Ruby 3.2 이상
- Node.js 20 이상
- Git

### 로컬 개발 환경 설정

```bash
# 1. 저장소 클론
git clone https://github.com/1di0t/1di0t.github.io.git
cd 1di0t.github.io

# 2. Ruby 의존성 설치
bundle install

# 3. Node.js 의존성 설치
npm install

# 4. 개발 서버 실행 (Tailwind watch + Jekyll serve)
npm run dev

# 브라우저에서 http://localhost:4000 접속
```

### 프로덕션 빌드

```bash
# Tailwind CSS 빌드
npm run build:css

# Jekyll 프로덕션 빌드
JEKYLL_ENV=production bundle exec jekyll build
```

## 📝 포스트 작성 가이드

### 빠른 시작 (2가지 방법)

#### 방법 1: Claude Code로 간편하게 작성 (권장)
```
1. 간단한 초안 작성 (5분)
2. Claude Code에게 초안 전달
3. 자동으로 완성된 포스트 생성 + 저장
4. Git 커밋 & 푸시
```
📖 **자세한 가이드**: [docs/AI_WORKFLOW.md](docs/AI_WORKFLOW.md)

#### 방법 2: 직접 작성
```
1. _posts/YYYY-MM-DD-title.md 파일 생성
2. Front Matter + Markdown 본문 작성
3. Git으로 업로드
```
📖 **자세한 가이드**: [docs/POST_GUIDE.md](docs/POST_GUIDE.md)

### Front Matter 예시

```yaml
---
layout: post
title: "포스트 제목"
date: 2024-01-15
category: Python  # 카테고리 (단일)
tags: [tutorial, beginner]  # 태그 (복수)
excerpt: "포스트 요약 (선택사항)"
math: true  # 수식 지원 여부 (선택사항)
toc: true   # 목차 표시 (기본: true)
comments: true  # 댓글 표시 (기본: true)
---
```

## 📂 카테고리 구조

### 공부
- Python
- 딥러닝
- 머신러닝
- 알고리즘
- 자료구조
- 수학

### 프로젝트
- AI/ML
- 웹개발
- 데이터분석
- 토이프로젝트

## 🎨 디자인

### 색상 팔레트

#### 라이트 모드
- `--bg-main`: #FDFBF7 (배경)
- `--text-primary`: #1A1A1A (본문)
- `--accent-primary`: #E5774A (강조)
- `--text-secondary`: #887B74 (보조 텍스트)
- `--bg-subtle`: #F9F3EE (카드 배경)
- `--border-subtle`: #EAE3DC (테두리)
- `--accent-secondary`: #7E8569 (보조 강조)

#### 다크 모드
- `--dark-bg-main`: #1A1A1A
- `--dark-text-primary`: #E8E6E3
- (기타 색상은 `tailwind.config.js` 참조)

### 폰트
- **본문**: 마루부리 (MaruBuri)
- **코드**: D2Coding

## 🔧 커스터마이징

### 사이트 정보 수정

[_config.yml](_config.yml)에서 다음 항목을 수정하세요:

```yaml
title: "개발 블로그"
description: "블로그 설명"
url: "https://1di0t.github.io"
author:
  name: "이름"
  email: "이메일@example.com"
  github: "깃허브아이디"
```

### Tailwind CSS 색상 변경

[tailwind.config.js](tailwind.config.js)에서 `theme.extend.colors` 수정

### 카테고리 추가/수정

[_includes/sidebar.html](_includes/sidebar.html)에서 카테고리 메뉴 수정

## 📦 배포

### GitHub Actions 자동 배포

`main` 브랜치에 push하면 자동으로 빌드 및 배포됩니다.

```bash
git add .
git commit -m "포스트 추가"
git push origin main
```

### GitHub Pages 설정

1. GitHub 저장소 > Settings > Pages
2. Source: "GitHub Actions" 선택
3. 완료! 몇 분 후 사이트가 배포됩니다.

## 🐛 트러블슈팅

### Tailwind CSS 클래스가 적용되지 않을 때

```bash
npm run build:css
```

### Jekyll 빌드 오류

```bash
bundle install
bundle update
```

### 로컬 서버가 시작되지 않을 때

```bash
# 포트가 사용 중인지 확인
lsof -i :4000

# 다른 포트로 실행
bundle exec jekyll serve --port 4001
```

## 📖 참고 문서

### 프로젝트 문서
- [docs/POST_GUIDE.md](docs/POST_GUIDE.md) - 포스트 작성 완벽 가이드
- [docs/AI_WORKFLOW.md](docs/AI_WORKFLOW.md) - AI 기반 글 작성 워크플로우
- [docs/Guide.txt](docs/Guide.txt) - 양질의 기술 블로그 글쓰기 가이드라인
- [docs/Flow.md](docs/Flow.md) - 시스템 흐름 및 원리 상세 설명
- [docs/AI_PROMPT.md](docs/AI_PROMPT.md) - AI 프롬프트 템플릿

### 외부 문서
- [Jekyll 공식 문서](https://jekyllrb.com/docs/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Liquid 템플릿 가이드](https://shopify.github.io/liquid/)
- [Kramdown 문법](https://kramdown.gettalong.org/)

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여

이슈 및 Pull Request 환영합니다!

---

**Made with ❤️ using Jekyll & Tailwind CSS**
