# 바보곰의 개발 블로그

> Python, 딥러닝, 머신러닝을 공부하고 프로젝트를 기록하는 기술 블로그

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Jekyll](https://img.shields.io/badge/Jekyll-4.3-red)]()
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-blue)]()

**블로그**: https://1di0t.github.io

---

## ✨ 특징

- **44개 포스트** (2023-12 ~ 현재)
- **98% 자동화** 블로그 작성 시스템
- **배치 처리** 최대 3개 파일 일괄 정리 (NEW! 🔥)
- **Tailwind CSS** 커스텀 디자인
- **다크모드** 지원
- **17개 카테고리** + 태그 시스템 (AI 자동 추천)
- **검색 기능** (Lunr.js)
- **목차(TOC) 자동 생성**
- **utterances 댓글** (GitHub Issues 기반, 무료)
- **SEO 최적화**
- **Obsidian + Claude Desktop 연동** (AutoBlog)

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
2. Claude Desktop: "블로그 배치 정리"  ← 1번만!
3. 최대 3개 파일 자동 처리
4. 10분 후 자동 배포!
```

**간단한 방법**:
```bash
# 1. 파일 생성
touch _posts/2025-10/2025-10-18-my-post.md

# 2. 내용 작성 (Front matter + 본문)

# 3. Git 푸시
git add _posts/2025-10/2025-10-18-my-post.md
git commit -m "Add: 새 포스트"
git push origin main

# 4. 1-2분 후 https://1di0t.github.io 에서 확인!
```

**자세한 가이드**:
- [docs/QUICKSTART.md](docs/QUICKSTART.md) - 5분 시작 가이드 🚀
- [docs/CATEGORY_AUTO.md](docs/CATEGORY_AUTO.md) - 카테고리 자동화 🤖
- [docs/DEPLOYMENT_SIMPLE.md](docs/DEPLOYMENT_SIMPLE.md) - 배포 가이드 📦
- [docs/WRITING_GUIDE.md](docs/WRITING_GUIDE.md) - 작성 가이드 ✍️

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
├── 📚 docs/                   # 문서 (정리됨!)
│   ├── QUICKSTART_SUMMARY.md  # 5분 빠른 시작
│   ├── WRITING_GUIDE.md       # OS별 글 작성 가이드
│   ├── DEPLOYMENT.md          # 배포 및 확인 방법
│   ├── CHANGELOG.md           # 버전 히스토리
│   ├── CONTRIBUTING.md        # 기여 가이드
│   └── PROJECT_STATUS.md      # 프로젝트 현황
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

### 카테고리 (17개)

```
ai, cpp, data-analysis, data-science, database,
Development, Git, Machine-Learning, MLOps, Mobile,
network, programming, Project, study, Terms,
troubleshooting, web
```

**자세한 작성 방법**: [WRITING_GUIDE.md](WRITING_GUIDE.md)

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

**자세한 방법**: [WRITING_GUIDE.md](WRITING_GUIDE.md) - 방법 3 참고

---

## 💬 댓글 시스템

### utterances

- **GitHub Issues 기반** (완전 무료)
- **다크모드 자동 전환**
- **첫 댓글 작성 시**: GitHub 로그인 + 앱 권한 승인 (1회)

---

## 📖 문서

### 빠른 시작
- [docs/QUICKSTART_SUMMARY.md](docs/QUICKSTART_SUMMARY.md) - **5분 안에 시작하기** 🚀

### 상세 가이드
- [docs/WRITING_GUIDE.md](docs/WRITING_GUIDE.md) - **OS별 글 작성 가이드** (Windows/macOS/Linux/iOS/Android) ⭐
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) - **배포 및 확인 방법** 📦

### 기타
- [docs/CHANGELOG.md](docs/CHANGELOG.md) - 버전 히스토리
- [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) - 기여 가이드
- [docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md) - 프로젝트 현황

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
