# 바보곰의 개발 블로그

> Python, 딥러닝, 머신러닝을 공부하고 프로젝트를 기록하는 기술 블로그
> **2단계 학습 프레임워크 (PACER)** 적용 ✨

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Jekyll](https://img.shields.io/badge/Jekyll-4.3-red)]()
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-blue)]()

**블로그**: https://1di0t.github.io

---

## ✨ 주요 특징

### 🧠 2단계 학습 프레임워크 (NEW! 🔥)

모든 포스트가 **PACER 분류**로 자동 분류되어 효과적인 학습을 지원합니다:

- 🔨 **Procedural** (절차형): 실습/튜토리얼 - 즉시 실전 적용
- 💡 **Conceptual** (개념형): 이론/개념 - 구조화하여 학습
- 📊 **Evidence** (근거형): 사례/경험 - 수집 & 반복 활용
- 📚 **Reference** (참고형): 치트시트/명령어 - 간격 반복 학습
- 🔗 **Analogous** (유사형): 비유/비교 - 비판적 검토

각 포스트에 **학습 전략 힌트**가 자동으로 표시됩니다!

👉 자세히: [docs/LEARNING_FRAMEWORK.md](docs/LEARNING_FRAMEWORK.md)

### 🎯 계층 구조 카테고리

- **5개 상위 카테고리**: 공부, 취미, 프로젝트, 정리, 트러블슈팅
- **18개 하위 카테고리**: AI, 프로그래밍, 웹개발, 커피 등
- **Breadcrumb 네비게이션**: 공부 › AI › 포스트

### 🤖 99% 자동화 블로그 시스템

- **Slash Commands**: `/blog`, `/blog-batch`
- **입력 길이 90% 감소**: 150자 → 15자
- **배치 처리**: 최대 3개 파일 일괄 정리
- **AI 자동 추천**: 카테고리, 태그, PACER 타입
- **Obsidian + Claude Desktop MCP 연동**

### 🎨 모던 디자인

- **Tailwind CSS** 커스텀 디자인
- **다크모드** 지원 (석양/숲속 테마)
- **검색 기능** (Lunr.js)
- **목차(TOC) 자동 생성**
- **utterances 댓글** (GitHub Issues 기반)
- **SEO 최적화**

### 📊 통계

- **총 포스트**: 45개 (2023-12 ~ 현재)
- **Procedural**: 24개 (53%)
- **Conceptual**: 11개 (24%)
- **Evidence**: 5개 (11%)
- **Reference**: 4개 (9%)

---

## 🚀 빠른 시작

### 1. 저장소 클론

```bash
git clone https://github.com/1di0t/1di0t.github.io.git
cd 1di0t.github.io
```

### 2. 로컬 테스트 (선택)

```bash
# 의존성 설치
npm install
bundle install

# Tailwind CSS 빌드
npm run build:css

# Jekyll 서버 실행
bundle exec jekyll serve

# 브라우저에서 확인
# http://localhost:4000
```

### 3. 새 포스트 작성 (98% 자동화)

**AutoBlog 방법 (권장)** ⭐:

**단일 파일**:
```
1. Obsidian에서 _drafts/에 대충 작성
2. Claude Desktop: "블로그 정리: 파일명"
3. _posts/로 자동 저장
4. 10분 후 자동 배포!
```

**여러 파일 일괄 처리** (NEW! 🔥):
```
1. Obsidian에서 _drafts/에 여러 글 작성
2. Claude Desktop: "example-draft.md 형식으로 모든 초안 정리해줘"  ← 1줄!
3. 참조 파일 형식으로 최대 3개 파일 자동 처리
4. 10분 후 자동 배포!
```

**자세한 가이드**:
- [docs/setup/QUICKSTART.md](docs/setup/QUICKSTART.md) - 5분 시작 가이드 🚀
- [docs/setup/MCP_SETUP.md](docs/setup/MCP_SETUP.md) - MCP 설정 가이드 🔌 (NEW!)
- [docs/setup/WRITING_GUIDE.md](docs/setup/WRITING_GUIDE.md) - 작성 가이드 ✍️

---

## 📁 프로젝트 구조

```
AutoBlog/
├── 📄 루트 파일 (필수)
│   ├── README.md              # 프로젝트 소개
│   ├── LICENSE                # MIT 라이선스
│   ├── _config.yml            # Jekyll 설정
│   ├── index.html             # 메인 페이지
│   ├── package.json           # Node.js 설정
│   ├── Gemfile                # Ruby 의존성
│   ├── tailwind.config.js     # Tailwind 설정
│   ├── postcss.config.js      # PostCSS 설정
│   └── robots.txt             # SEO 설정
│
├── 📚 docs/                   # 문서 (간소화됨!)
│   ├── README.md              # 문서 목차 및 빠른 참조
│   └── setup/                 # 설정 가이드
│       ├── QUICKSTART.md      # 5분 빠른 시작
│       ├── MCP_SETUP.md       # Claude Desktop MCP 설정
│       └── WRITING_GUIDE.md   # 글 작성 가이드
│
├── ✍️ 콘텐츠 (Jekyll)
│   ├── _posts/                # 블로그 포스트 (YYYY-MM 폴더별)
│   ├── _drafts/               # 초안 (AutoBlog 워크플로우)
│   ├── _pages/                # 고정 페이지 (About, Projects)
│   └── _projects/             # 프로젝트 컬렉션
│
├── 🎨 디자인 (Jekyll)
│   ├── _layouts/              # Jekyll 레이아웃
│   ├── _includes/             # 컴포넌트 (사이드바, 푸터)
│   ├── category/              # 17개 카테고리 페이지
│   └── tags/                  # 태그 페이지
│
├── 🖼️ 에셋
│   ├── assets/
│   │   ├── css/              # Tailwind CSS
│   │   ├── fonts/            # 웹폰트 (MaruBuri, D2Coding)
│   │   ├── images/           # 이미지 (포스트 이미지, 로고 등)
│   │   └── js/               # JavaScript (다크모드, 검색, TOC)
│
├── 🔧 스크립트 & 설정
│   ├── scripts/              # 자동화 스크립트
│   ├── .github/workflows/    # GitHub Actions 워크플로우
│   ├── .obsidian/            # Obsidian 설정
│   └── daily-notes/          # 개인 메모 (Git 제외)
│
└── 🚫 제외 (Git ignore)
    ├── _site/                # Jekyll 빌드 결과
    ├── node_modules/         # Node.js 패키지
    ├── .jekyll-cache/        # Jekyll 캐시
    └── .env                  # 환경변수
```

---

## 📝 포스트 작성

### Front Matter 예시

```yaml
---
layout: post
title: "포스트 제목"
date: 2025-10-18
categories: [programming]
tags: [python, django, web]
---
```

### 카테고리 (17개, 한글 지원)

```
인공지능 (AI), 프로그래밍 (Programming), 웹개발 (Web),
데이터베이스 (Database), 데이터사이언스 (Data Science),
데이터분석 (Data Analysis), 머신러닝 (Machine Learning),
MLOps, 개발 (Development), Git, 모바일 (Mobile),
네트워크 (Network), C++, 프로젝트 (Project), 학습 (Study),
용어정리 (Terms), 트러블슈팅 (Troubleshooting)
```

**자동 추천**: AI가 포스트 내용을 분석하여 자동으로 카테고리를 추천합니다.

**자세한 작성 방법**: [docs/setup/WRITING_GUIDE.md](docs/setup/WRITING_GUIDE.md)

---

## 🎨 디자인

### 색상 스킴

**라이트 모드**
- 배경: `#FDFBF7` (따뜻한 석양)
- 주조색: `#E5774A`
- 텍스트: `#242220`

**다크 모드**
- 배경: `#242220` (세련된 숲)
- 주조색: `#F28E63`
- 텍스트: `#FDFBF7`

### 폰트
- **본문**: MaruBuri (5종)
- **코드**: D2Coding (2종)

---

## 🛠️ 개발

### npm 스크립트

```bash
# 개발 서버 (Tailwind + Jekyll)
npm run dev

# Tailwind CSS 빌드
npm run build:css

# 전체 빌드
npm run build
```

### 기술 스택

- **정적 사이트**: Jekyll 4.3
- **CSS**: Tailwind CSS 3.4
- **검색**: Lunr.js
- **댓글**: utterances
- **배포**: GitHub Actions → GitHub Pages

---

## 🌐 배포

### GitHub Pages (현재)

- **URL**: https://1di0t.github.io
- **빌드**: GitHub Actions (자동)
- **배포**: main 브랜치 push 시 자동

### 배포 확인

1. **GitHub Actions**: https://github.com/1di0t/1di0t.github.io/actions
2. **블로그**: https://1di0t.github.io (1-2분 후)

---

## 🤖 AutoBlog (선택)

### Obsidian 연동

Obsidian을 사용하면 더 편리하게 작성할 수 있습니다:

1. **Obsidian 설치**: https://obsidian.md/download
2. **Vault 열기**: File → Open folder as vault → 이 폴더 선택
3. **포스트 작성**: `_posts/YYYY-MM/` 폴더에 작성
4. **자동 커밋** (선택): Obsidian Git 플러그인 설치

### Claude Desktop (선택)

러프한 메모를 AI가 자동으로 정리해줍니다:

1. `_drafts/` 폴더에 러프하게 작성
2. Claude Desktop에서 정리 요청
3. `_posts/`로 저장
4. 자동 배포!

**자세한 방법**: [docs/setup/WRITING_GUIDE.md](docs/setup/WRITING_GUIDE.md)

---

## 💬 댓글 시스템

### utterances

- **GitHub Issues 기반** (완전 무료)
- **다크모드 자동 전환**
- **첫 댓글 작성 시**: GitHub 로그인 + 앱 권한 승인 (1회)

---

## 📖 문서

모든 문서는 [docs/](docs/) 폴더에서 확인하세요.

### 빠른 시작
- [docs/README.md](docs/README.md) - **문서 목차 및 빠른 참조** 📚
- [docs/setup/QUICKSTART.md](docs/setup/QUICKSTART.md) - **5분 안에 시작하기** 🚀

### 설정 가이드
- [docs/setup/MCP_SETUP.md](docs/setup/MCP_SETUP.md) - **Claude Desktop MCP 설정** 🔌
- [docs/setup/WRITING_GUIDE.md](docs/setup/WRITING_GUIDE.md) - **글 작성 가이드** ✍️

---

## 📊 통계

- **총 포스트**: 44개
- **카테고리**: 17개
- **기술 스택**: Jekyll + Tailwind + Lunr.js
- **월 비용**: 0원 (완전 무료)

---

## 👤 저자

**전성일 (1di0t)**

- GitHub: [@1di0t](https://github.com/1di0t)
- Blog: https://1di0t.github.io

---

## 📜 라이선스

MIT License

---

## 🙏 감사의 말

- [Jekyll](https://jekyllrb.com/) - 정적 사이트 생성기
- [Tailwind CSS](https://tailwindcss.com/) - CSS 프레임워크
- [Obsidian](https://obsidian.md/) - 노트 앱
- [utterances](https://utteranc.es/) - 댓글 시스템
- [Lunr.js](https://lunrjs.com/) - 검색 엔진
- [GitHub Pages](https://pages.github.com/) - 호스팅

---

**"The best blog is the one you actually write."** 💪
