# 바보곰의 개발 블로그 + AutoBlog

> Obsidian으로 작성하고, Claude로 정리하고, Cloudflare/GitHub Pages로 자동 배포하는 기술 블로그

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/Platform-iOS%20|%20Windows%20|%20Mac%20|%20Ubuntu-blue)]()
[![Jekyll](https://img.shields.io/badge/Jekyll-4.3-red)]()
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-blue)]()

## 🎯 특징

### 기존 블로그 기능
- ✅ **44개 포스트** (2023-12 ~ 현재)
- ✅ **Tailwind CSS** 기반 커스텀 디자인
- ✅ **다크모드** 지원 (localStorage 저장)
- ✅ **좌측 사이드바** (280px, 고정)
- ✅ **utterances 댓글** (GitHub Issues 기반, 무료)
- ✅ **Lunr.js 검색** (클라이언트 사이드)
- ✅ **목차(TOC) 자동 생성**
- ✅ **17개 카테고리** 시스템
- ✅ **태그 시스템**
- ✅ **MaruBuri + D2Coding** 웹폰트
- ✅ **GitHub Actions** 자동 배포
- ✅ **SEO 최적화** (sitemap, RSS)

### AutoBlog 추가 기능 🆕
- 🆕 **Obsidian 연동** (멀티 기기 작성)
- 🆕 **Claude AI 자동 정리** (MCP)
- 🆕 **Remotely Save** 동기화 (선택)
- 🆕 **자동 커밋/푸시** (Obsidian Git)
- 🆕 **Cloudflare Pages** 배포 (선택)
- 🆕 **95% 자동화** (명령 2번만 입력)

---

## 🚀 빠른 시작

### 로컬 테스트 (5분)

```bash
# 저장소 클론
git clone https://github.com/1di0t/1di0t.github.io.git
cd 1di0t.github.io

# 의존성 설치
npm install
bundle install

# Tailwind CSS 빌드
npm run build:css

# Jekyll 로컬 서버 실행
bundle exec jekyll serve

# 브라우저에서 확인
# http://localhost:4000
```

---

## 📁 프로젝트 구조

```
1di0t.github.io/
├── _posts/                   # 블로그 포스트 (YYYY-MM 폴더별)
│   ├── 2023-12/
│   ├── 2024-09/
│   └── 2025-10/
├── _drafts/                  # 초안 (AutoBlog 자동 정리)
├── _layouts/                 # Jekyll 레이아웃
│   ├── default.html         # 기본 레이아웃
│   ├── post.html            # 포스트 레이아웃
│   └── ...
├── _includes/                # 컴포넌트
│   ├── sidebar.html
│   └── footer.html
├── _pages/                   # 고정 페이지
│   ├── about.md
│   ├── blog.html
│   └── projects.html
├── assets/
│   ├── css/
│   │   ├── main.css         # Tailwind 소스
│   │   └── output.css       # 빌드 결과
│   ├── fonts/               # MaruBuri, D2Coding
│   └── js/
│       ├── main.js          # 다크모드, TOC, 검색
│       └── search.js        # Lunr.js 검색
├── category/                 # 17개 카테고리 페이지
├── tags/                     # 태그 페이지
├── scripts/
│   ├── format-post.js       # Claude API 포매터
│   ├── validate-categories.js
│   └── generate-tag-pages.js
├── daily-notes/              # 개인 메모 (Git 제외)
├── .obsidian/                # Obsidian 설정
│   └── templates/           # 포스트 템플릿
├── _config.yml              # Jekyll 설정
├── Gemfile                  # Ruby 의존성
├── package.json             # Node.js 설정
├── tailwind.config.js       # Tailwind 설정
└── ...
```

---

## 🎨 디자인

### 색상 스킴

**라이트 모드** (따뜻한 석양)
- 배경: `#FDFBF7`
- 주조색: `#E5774A`
- 텍스트: `#242220`

**다크 모드** (세련된 숲)
- 배경: `#242220`
- 주조색: `#F28E63`
- 텍스트: `#FDFBF7`

### 폰트
- **본문**: MaruBuri (5종)
- **코드**: D2Coding (2종)

---

## 🤖 AutoBlog 워크플로우

### 95% 자동화 (기본)

```
1️⃣ 모바일/PC에서 Obsidian으로 작성
   └─> Remotely Save → 5분 후 자동 동기화

2️⃣ PC에서 Claude Desktop 열기
   └─> "최근 노트 'XXX' 블로그 포스트로 정리해줘" (수동 1회)

3️⃣ 저장 명령
   └─> "_posts/2025-10-18-제목.md로 저장해줘" (수동 1회)

4️⃣ 자동 배포
   └─> 10분 후 Obsidian Git 커밋
   └─> GitHub push (자동)
   └─> GitHub Actions 빌드 (자동)
   └─> 1-2분 후 배포 완료! 🎉
```

**수동 작업**: 2번 (Claude 명령)
**자동 작업**: 나머지 전부

---

## 🔧 AutoBlog 설정

### 1. Obsidian 설치 및 연동

```bash
# Obsidian에서 볼트 열기
# File → Open folder as vault → 이 저장소 폴더 선택
```

### 2. 필수 플러그인 설치

**Settings → Community plugins:**

1. **Remotely Save** (멀티 기기 동기화)
   - Dropbox 연동
   - 5분 자동 동기화

2. **Local REST API** (Claude MCP 연동)
   - 기본 포트: 27124

3. **Obsidian Git** (자동 커밋/푸시)
   - 10분 자동 커밋
   - Auto push: ON

### 3. Claude Desktop + MCP 연동

```bash
# MCP-Obsidian 서버 설치
npx -y @smithery/cli install mcp-obsidian --client claude

# Vault 경로 입력
# Windows: E:\path\to\1di0t.github.io
# Mac: /Users/username/1di0t.github.io
# Ubuntu: /home/username/1di0t.github.io
```

### 4. Cloudflare Pages (선택)

1. Cloudflare 계정 생성
2. Pages → GitHub 저장소 연결
3. 빌드 설정:
   ```yaml
   Framework: Jekyll
   Build command: bundle exec jekyll build
   Output directory: _site
   ```

---

## 💬 댓글 시스템

### utterances 설정

이 블로그는 **utterances**를 사용합니다 (GitHub Issues 기반, 완전 무료).

**자동 설정 완료**:
- Repository: `1di0t/1di0t.github.io`
- Issue term: `pathname`
- Label: `comments`
- Theme: 다크모드 자동 전환

**첫 댓글 작성 시**:
1. GitHub 로그인
2. utterances 앱 권한 승인 (1회)
3. 댓글 작성!

---

## 🔍 카테고리 및 태그

### 17개 카테고리

```
ai, cpp, data-analysis, data-science, database,
Development, Git, Machine-Learning, MLOps, Mobile,
network, programming, Project, study, Terms,
troubleshooting, web
```

### 태그 시스템

- 자동 태그 페이지 생성: `scripts/generate-tag-pages.js`
- 카테고리 검증: `scripts/validate-categories.js`

---

## 📊 통계

- **총 포스트**: 44개
- **카테고리**: 17개
- **폰트 크기**: 5.4MB
- **빌드 시간**: ~10초
- **자동화율**: 95%

---

## 🛠️ 개발

### npm 스크립트

```bash
# 개발 서버 (Tailwind + Jekyll)
npm run dev

# Tailwind CSS 빌드
npm run build:css

# 카테고리 검증
npm run validate:categories

# 태그 페이지 생성
npm run generate:tags

# 전체 빌드
npm run build
```

### 새 포스트 작성

**방법 1: Obsidian에서 직접 작성**
```bash
1. _posts/YYYY-MM/ 폴더에 파일 생성
2. 파일명: YYYY-MM-DD-title.md
3. Front matter 작성
4. 저장 → 10분 후 자동 배포
```

**방법 2: Claude Desktop으로 자동 정리**
```bash
1. _drafts/에 러프하게 작성
2. Claude Desktop: "이 초안을 정리해줘"
3. "_posts/YYYY-MM/파일명.md로 저장해줘"
4. 10분 후 자동 배포
```

---

## 🌐 배포

### GitHub Pages (현재)

- **URL**: https://1di0t.github.io
- **빌드**: GitHub Actions
- **배포**: 자동 (main 브랜치 push 시)

### Cloudflare Pages (선택)

- **URL**: 커스텀 도메인 가능
- **빌드**: 자동 (GitHub 연동)
- **CDN**: 300+ 글로벌 노드
- **Bandwidth**: 무제한

---

## 📖 문서

- [상세 설치 가이드](SETUP.md) - 단계별 설정
- [빠른 시작](QUICKSTART.md) - 5분 시작
- [전체 계획](Plan.md) - AutoBlog 구현 계획
- [변경 이력](CHANGELOG.md) - 버전 히스토리

---

## 🤝 기여

이슈 및 PR 환영합니다!

자세한 내용은 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요.

---

## 📜 라이선스

MIT License

---

## 👤 저자

**전성일 (1di0t)**

- GitHub: [@1di0t](https://github.com/1di0t)
- Blog: https://1di0t.github.io
- Email: (비공개)

---

## 🙏 감사의 말

이 블로그는 다음 오픈소스 프로젝트들 덕분에 가능했습니다:

- [Jekyll](https://jekyllrb.com/) - 정적 사이트 생성기
- [Tailwind CSS](https://tailwindcss.com/) - CSS 프레임워크
- [Obsidian](https://obsidian.md/) - 노트 앱
- [Claude](https://claude.ai/) - AI 어시스턴트
- [utterances](https://utteranc.es/) - 댓글 시스템
- [Lunr.js](https://lunrjs.com/) - 검색 엔진
- [GitHub Pages](https://pages.github.com/) - 호스팅
- [Cloudflare Pages](https://pages.cloudflare.com/) - 호스팅 (선택)

---

**"The best blog is the one you actually write."** 💪

지금 바로 AutoBlog로 블로그를 시작하세요! 🚀
