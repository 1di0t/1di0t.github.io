# AutoBlog 프로젝트 요약

## 📋 프로젝트 개요

**AutoBlog**는 옵시디언으로 작성하고, Claude AI로 정리하고, Cloudflare Pages로 자동 배포하는 **95% 자동화 블로그 시스템**입니다.

- **버전**: 1.0.0
- **작성일**: 2025-10-18
- **라이선스**: MIT
- **운영 비용**: 월 0원 (완전 무료)

---

## 🎯 핵심 목표

1. **어디서나 작성**: iOS, Windows, Mac, Ubuntu 모든 기기 지원
2. **최대 자동화**: 95% 자동화로 글쓰기에만 집중
3. **무료 운영**: 월 0원으로 프로페셔널한 블로그 운영
4. **AI 정리**: 러프한 메모를 Claude가 자동으로 블로그 포스트로 변환

---

## 📁 프로젝트 구조

```
AutoBlog/
├── 📝 Core Files
│   ├── _config.yml              # Jekyll 설정
│   ├── Gemfile                  # Ruby 의존성
│   ├── package.json             # Node.js 의존성
│   ├── .gitignore               # Git 제외 파일
│   └── .env.example             # 환경 변수 예시
│
├── 📄 Documentation
│   ├── README.md                # 프로젝트 소개
│   ├── Plan.md                  # 전체 구현 계획 (597줄)
│   ├── SETUP.md                 # 상세 설치 가이드
│   ├── QUICKSTART.md            # 5분 빠른 시작
│   ├── CHANGELOG.md             # 버전 히스토리
│   ├── CONTRIBUTING.md          # 기여 가이드
│   ├── LICENSE                  # MIT 라이선스
│   └── PROJECT_SUMMARY.md       # 이 파일
│
├── 📰 Content
│   ├── _posts/                  # 발행된 포스트
│   │   └── 2025-10-18-welcome-to-autoblog.md
│   ├── _drafts/                 # 초안 (AI가 자동 정리)
│   │   └── example-draft.md
│   ├── index.html               # 홈페이지
│   └── about.md                 # About 페이지
│
├── 🎨 Design
│   ├── _layouts/
│   │   ├── default.html         # 기본 레이아웃
│   │   └── post.html            # 포스트 레이아웃
│   └── assets/
│       └── images/              # 이미지 파일
│
├── 🤖 Automation
│   ├── scripts/
│   │   ├── setup.js             # 초기 설정 자동화
│   │   └── format-post.js       # Claude API 포매터
│   └── .github/workflows/
│       ├── auto-format.yml      # 자동 포스트 정리
│       ├── cloudflare-pages.yml # Cloudflare 배포
│       └── test.yml             # 빌드 테스트
│
└── 🗂️ Obsidian
    ├── .obsidian/
    │   ├── plugins/             # Obsidian 플러그인
    │   └── templates/
    │       └── blog-post-template.md
    └── daily-notes/             # 개인 메모 (발행 안됨)
```

---

## 🔧 구현된 기능

### ✅ 완료된 기능

#### 1. 프로젝트 기반 설정
- [x] Jekyll 4.3 설정 및 Gemfile
- [x] 반응형 레이아웃 (mobile/desktop)
- [x] SEO 최적화 (jekyll-seo-tag)
- [x] RSS 피드 (jekyll-feed)
- [x] 사이트맵 (jekyll-sitemap)

#### 2. 자동화 스크립트
- [x] `setup.js` - 프로젝트 초기 설정 자동화
- [x] `format-post.js` - Claude API로 포스트 자동 정리
- [x] 에러 핸들링 및 로깅

#### 3. GitHub Actions
- [x] `auto-format.yml` - _drafts 자동 정리 워크플로우
- [x] `cloudflare-pages.yml` - Cloudflare Pages 배포
- [x] `test.yml` - PR 빌드 테스트

#### 4. 문서화
- [x] README.md - 프로젝트 소개 및 빠른 시작
- [x] Plan.md - 597줄 상세 구현 계획
- [x] SETUP.md - 단계별 설치 가이드
- [x] QUICKSTART.md - 5분 빠른 시작
- [x] CHANGELOG.md - 버전 관리
- [x] CONTRIBUTING.md - 기여 가이드

#### 5. 템플릿 및 샘플
- [x] 블로그 포스트 템플릿
- [x] Welcome 포스트 (완전한 예시)
- [x] 초안 예시 파일
- [x] About 페이지

---

## 🚀 워크플로우

### 일반적인 사용 (95% 자동)

```
1️⃣ 모바일에서 메모 작성 (iOS Obsidian)
   └─> Remotely Save → 5분 후 자동 동기화

2️⃣ PC에서 확인 (자동으로 동기화됨)
   └─> Claude Desktop 열기

3️⃣ AI 정리 요청 (수동 1회)
   "최근 노트 'XXX' 블로그 포스트로 정리해줘"

4️⃣ 저장 명령 (수동 1회)
   "_posts/2025-10-18-제목.md로 저장해줘"

5️⃣ 자동 배포 (전부 자동)
   └─> 10분 후 Obsidian Git 커밋
   └─> GitHub push
   └─> Cloudflare Pages 빌드
   └─> 1-2분 후 배포 완료! 🎉
```

**수동 작업**: 단 2번 (3, 4단계)
**자동 작업**: 나머지 전부

### 완전 자동화 옵션 (100%)

GitHub Actions 사용 시:

```
1️⃣ _drafts 폴더에 파일 저장
2️⃣ Git push
3️⃣ GitHub Actions 자동 실행
   └─> Claude API로 자동 정리
   └─> _posts로 이동
   └─> Cloudflare 배포
   └─> 완료! 🎉
```

**수동 작업**: 0번 (전부 자동)
**비용**: 월 300원 (Claude API)

---

## 💰 비용 분석

### 기본 구성 (95% 자동)

| 항목 | 서비스 | 월 비용 | 비고 |
|------|--------|---------|------|
| 작성 | Obsidian | 0원 | 무료 앱 |
| 동기화 | Dropbox Free | 0원 | 2GB 무료 |
| AI 정리 | Claude Desktop MCP | 0원 | 구독 활용 |
| 저장소 | GitHub | 0원 | Public/Private 무료 |
| 호스팅 | Cloudflare Pages | 0원 | 무제한 bandwidth |
| **총계** | | **0원** | 💸 |

### 완전 자동화 (100%)

| 항목 | 추가 비용 | 비고 |
|------|-----------|------|
| Claude API | ~300원/월 | Haiku 4.5, 20포스트 기준 |
| **총계** | **300원/월** | 💸 |

---

## 🎓 기술 스택

### Frontend
- **Jekyll 4.3**: 정적 사이트 생성
- **Liquid**: 템플릿 엔진
- **Kramdown**: Markdown 파서
- **Rouge**: 문법 강조

### Backend & Automation
- **Node.js 18+**: 스크립트 실행
- **Ruby 3.1+**: Jekyll 빌드
- **GitHub Actions**: CI/CD
- **Claude API**: AI 포스트 정리

### Sync & Storage
- **Obsidian**: 노트 작성 앱
- **Remotely Save**: 멀티 기기 동기화
- **Dropbox**: 클라우드 스토리지
- **Obsidian Git**: Git 자동화

### Hosting & Deployment
- **GitHub**: 소스 저장소
- **Cloudflare Pages**: 호스팅 & CDN
- **Jekyll Build**: 자동 빌드

---

## 📊 GitHub Pages vs AutoBlog

| 항목 | GitHub Pages | AutoBlog |
|------|--------------|----------|
| **작성 위치** | PC 로컬만 | 📱 모든 기기 (iOS/Win/Mac/Ubuntu) |
| **동기화** | 수동 git push | ✅ 자동 (5분마다) |
| **포스트 정리** | 수동 | 🤖 AI 자동 (Claude) |
| **커밋/푸시** | 수동 | ✅ 자동 (10분마다) |
| **배포 속도** | ~30초 | ⚡ 1-2분 (300+ CDN) |
| **Bandwidth** | 100GB/월 | ♾️ 무제한 |
| **Jekyll 플러그인** | 제한적 | ✅ 전부 사용 가능 |
| **Analytics** | 없음 | ✅ 무료 제공 |
| **비용** | 0원 | 0원 |
| **자동화** | 30% | **95%** |

---

## 🔮 로드맵

### v1.1 (계획 중)
- [ ] Obsidian Templater 단축키 통합
- [ ] 태그 기반 자동 분류
- [ ] 이미지 자동 최적화

### v1.2 (계획 중)
- [ ] Web Analytics 대시보드
- [ ] 댓글 시스템 (utterances)
- [ ] 다크 모드 지원

### v2.0 (장기)
- [ ] 커스텀 테마 시스템
- [ ] 플러그인 아키텍처
- [ ] CLI 도구

---

## 📚 파일 목록 요약

### 생성된 핵심 파일 (총 30개)

#### 설정 파일 (7개)
1. `_config.yml` - Jekyll 설정
2. `Gemfile` - Ruby 의존성
3. `package.json` - Node.js 의존성
4. `.gitignore` - Git 제외 규칙
5. `.env.example` - 환경 변수 템플릿
6. `LICENSE` - MIT 라이선스
7. `.obsidian/plugins/.gitkeep` - Obsidian 플러그인 디렉토리

#### 문서 파일 (8개)
8. `README.md` - 프로젝트 소개
9. `Plan.md` - 전체 계획 (597줄)
10. `SETUP.md` - 상세 설치 가이드
11. `QUICKSTART.md` - 5분 시작 가이드
12. `CHANGELOG.md` - 버전 히스토리
13. `CONTRIBUTING.md` - 기여 가이드
14. `PROJECT_SUMMARY.md` - 이 파일
15. `about.md` - About 페이지

#### 레이아웃 파일 (3개)
16. `_layouts/default.html` - 기본 레이아웃
17. `_layouts/post.html` - 포스트 레이아웃
18. `index.html` - 홈페이지

#### 콘텐츠 파일 (4개)
19. `_posts/2025-10-18-welcome-to-autoblog.md` - 샘플 포스트
20. `_drafts/example-draft.md` - 초안 예시
21. `.obsidian/templates/blog-post-template.md` - 포스트 템플릿
22. `daily-notes/.gitkeep` - 개인 메모 디렉토리

#### 스크립트 파일 (2개)
23. `scripts/setup.js` - 초기 설정 자동화
24. `scripts/format-post.js` - Claude API 포매터

#### GitHub Actions (3개)
25. `.github/workflows/auto-format.yml` - 자동 정리
26. `.github/workflows/cloudflare-pages.yml` - 배포
27. `.github/workflows/test.yml` - 테스트

#### 디렉토리 구조 (3개)
28. `_posts/` - 발행 포스트 폴더
29. `_drafts/` - 초안 폴더
30. `assets/images/` - 이미지 폴더

---

## ✨ 주요 특징 정리

### 1. 완전한 자동화
- ✅ 5분마다 자동 동기화
- ✅ 10분마다 자동 커밋
- ✅ GitHub push 자동화
- ✅ Cloudflare Pages 자동 배포

### 2. AI 기반 정리
- 🤖 Claude Desktop MCP 통합
- 🤖 러프한 메모 → 블로그 포스트 자동 변환
- 🤖 선택적 GitHub Actions (100% 자동)

### 3. 멀티 플랫폼
- 📱 iOS Obsidian
- 💻 Windows Obsidian
- 🍎 Mac Obsidian
- 🐧 Ubuntu Obsidian

### 4. 무료 운영
- 💰 월 0원 (기본)
- 💰 월 300원 (완전 자동화)

### 5. 프로페셔널 배포
- 🚀 Cloudflare Pages (300+ CDN)
- 🚀 무제한 Bandwidth
- 🚀 자동 HTTPS
- 🚀 무료 Analytics

---

## 🎯 다음 단계

### 바로 시작하기
1. **5분 시작**: [QUICKSTART.md](QUICKSTART.md)
2. **상세 설치**: [SETUP.md](SETUP.md)
3. **전체 계획**: [Plan.md](Plan.md)

### 고급 설정
1. Claude Desktop + MCP 연동
2. Remotely Save 멀티 기기 동기화
3. Cloudflare Pages 배포
4. GitHub Actions 자동화 (선택)

---

## 📞 지원 및 커뮤니티

- **GitHub**: https://github.com/1di0t/autoblog
- **Issues**: 버그 리포트 및 기능 제안
- **Discussions**: 질문 및 아이디어 공유
- **Pull Requests**: 코드 기여 환영

---

## 🙏 감사의 말

이 프로젝트는 다음 오픈소스 프로젝트들 덕분에 가능했습니다:

- **Obsidian**: 최고의 노트 앱
- **Claude**: 강력한 AI 어시스턴트
- **Jekyll**: 신뢰할 수 있는 정적 사이트 생성기
- **Cloudflare**: 무료 글로벌 CDN
- **GitHub**: 코드 호스팅 및 CI/CD

---

**Version**: 1.0.0
**Date**: 2025-10-18
**Author**: 1di0t
**License**: MIT

**"The best blog is the one you actually write."** 💪
