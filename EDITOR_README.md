# AutoBlog Web Editor

> 웹 기반 블로그 에디터 + Claude MCP 자동 정리 시스템

모바일/PC 어디서나 블로그를 작성하고, Claude Desktop이 자동으로 정리하여 배포합니다.

[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-orange)]()
[![100% 무료](https://img.shields.io/badge/비용-0원-green)]()
[![MCP](https://img.shields.io/badge/Claude-MCP-blue)]()

---

## 🎯 워크플로우 (옵션 1: PC 중심)

```
📱 모바일/PC → 웹 에디터
    ↓ "저장" 버튼
☁️ GitHub _drafts/ (자동 커밋)
    ↓
💻 Claude Desktop (MCP GitHub) [⚠️ PC 필요]
    "모든 초안 정리해줘"
    ↓ AI 정리 (카테고리, 태그, 구조화)
☁️ GitHub _posts/ (자동 커밋 + 푸시)
    ↓
🌐 Cloudflare Pages (자동 배포)
```

**실제 사용 시나리오**:
1. **외출 중 (모바일)**: 웹 에디터에서 러프하게 작성 → 저장
2. **집에 도착 (PC)**: PC 켜기 → Claude Desktop 실행
3. **Claude에게 요청**: "모든 초안 정리해줘"
4. **자동 배포**: 1-2분 후 블로그 업데이트 ✅

**소요 시간**: 웹 작성 5분 + Claude 정리 10초 = **총 5분**

---

## ✨ 주요 기능

### 웹 에디터
- ✅ **GitHub OAuth 로그인** (본인만 접근)
- ✅ **마크다운 + 실시간 프리뷰**
- ✅ **이미지 업로드** (Cloudflare R2, 자동 압축)
- ✅ **사용량 모니터링** (비용 0원 보장)
- ✅ **모바일 최적화**

### Claude MCP 연동
- ✅ **완전 자동화** (git pull/push 불필요)
- ✅ **AI 정리** (카테고리, 태그, 구조화)
- ✅ **구독형 Claude 사용** (API 키 불필요)
- ⚠️ **PC 실행 필요** (Claude Desktop은 로컬 앱)

### 보안
- ✅ **GitHub Token 암호화** (AES-256-GCM)
- ✅ **Rate Limiting** (DDoS 방어)
- ✅ **CSRF 보호**
- ✅ **CSP 헤더**

### 비용 관리
- ✅ **일일 한도 제한** (무료 한도의 2%)
- ✅ **R2 저장소 모니터링** (9GB 도달 시 차단)
- ✅ **사용량 대시보드**
- ✅ **10년간 무료 보장**

---

## 📁 프로젝트 구조

```
AutoBlog/
├── wrangler.toml              # Cloudflare 설정
├── schema.sql                 # D1 Database 스키마
│
├── functions/                 # Cloudflare Pages Functions
│   ├── config.js             # 사용량 제한 설정
│   ├── _middleware.js        # Rate Limiting
│   │
│   ├── auth/                 # 인증
│   │   ├── login.js          # GitHub OAuth 시작
│   │   ├── callback.js       # OAuth 콜백
│   │   └── logout.js         # 로그아웃
│   │
│   ├── api/                  # API
│   │   ├── save-token.js     # GitHub Token 저장
│   │   ├── save-draft.js     # Draft 저장 (GitHub API)
│   │   ├── upload-image.js   # 이미지 업로드 (R2)
│   │   └── usage-stats.js    # 사용량 통계
│   │
│   └── utils/                # 유틸리티
│       ├── crypto.js         # 암호화/복호화
│       ├── jwt.js            # JWT 생성/검증
│       └── github.js         # GitHub API 헬퍼
│
├── editor/                    # 웹 에디터 UI
│   ├── index.html            # 에디터 페이지
│   ├── app.js                # 에디터 로직
│   └── styles.css            # 스타일
│
└── docs/setup/               # 문서
    ├── DEPLOYMENT_EDITOR.md  # 배포 가이드
    └── MCP_SETUP_EDITOR.md   # MCP 설정 가이드
```

---

## 🚀 빠른 시작

### 1. 배포 (15분)

1. **GitHub OAuth App 생성**
   - [https://github.com/settings/developers](https://github.com/settings/developers)
   - Client ID & Secret 복사

2. **Cloudflare Pages 배포**
   - Git 저장소 연결
   - D1, R2, KV 설정
   - 환경변수 설정

3. **웹 에디터 접속**
   - `https://your-project.pages.dev/editor`
   - GitHub 로그인
   - GitHub Token 설정

**자세한 가이드**: [docs/setup/DEPLOYMENT_EDITOR.md](docs/setup/DEPLOYMENT_EDITOR.md)

### 2. Claude MCP 설정 (5분)

1. **GitHub Personal Access Token 생성**
2. **Claude Desktop 설정**
   ```json
   {
     "mcpServers": {
       "github": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-github"],
         "env": {
           "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token"
         }
       }
     }
   }
   ```
3. **Claude Desktop 재시작**

**자세한 가이드**: [docs/setup/MCP_SETUP_EDITOR.md](docs/setup/MCP_SETUP_EDITOR.md)

---

## 📊 사용량 제한 (보수적 설정)

### 일일 한도 (매일 UTC 자정 초기화)

| 항목 | 제한 | 무료 한도 | 사용률 |
|------|------|-----------|--------|
| 로그인 | 100회 | - | - |
| 저장 | 100회 | - | - |
| 이미지 (일) | 20개 | - | - |
| 총 요청 | 2,000회 | 100,000회 | 2% |

### 월간 한도 (매월 1일 초기화)

| 항목 | 제한 | 무료 한도 | 사용률 |
|------|------|-----------|--------|
| 이미지 | 200개 | - | - |

### 누적 (초기화 안 됨) ⚠️

| 항목 | 제한 | 무료 한도 | 5년 예상 |
|------|------|-----------|----------|
| R2 Storage | 9GB 차단 | 10GB | 6GB |

**결론: 10년간 사용해도 비용 0원** ✅

---

## 💰 비용 분석

| 서비스 | 무료 한도 | 초기화 주기 | 비고 |
|--------|-----------|-------------|------|
| **Cloudflare Pages Functions** | 100,000/일 | 매일 | 우리 사용: 2% |
| **Cloudflare D1** | 100,000 read/일 | 매일 | 우리 사용: 0.1% |
| **Cloudflare KV** | 100,000 read/일 | 매일 | 우리 사용: 1% |
| **Cloudflare R2 Class A/B** | 1M/월 | 매월 | 우리 사용: 0.02% |
| **Cloudflare R2 Storage** | 10GB | ⚠️ 누적 | 우리 사용: 60% (5년 후) |

**총 비용: 0원** (영구 무료)

---

## 🔐 보안 기능

### 인증 & 권한
- ✅ GitHub OAuth (본인만 접근)
- ✅ JWT 세션 (30일)
- ✅ GitHub Token 암호화 저장

### 공격 방어
- ✅ Rate Limiting (IP별, 일일)
- ✅ CSRF 보호
- ✅ XSS 방어 (CSP)
- ✅ SQL Injection 방어 (Prepared Statements)

### 데이터 보호
- ✅ HTTPS 강제 (HSTS)
- ✅ AES-256-GCM 암호화
- ✅ HttpOnly 쿠키

---

## 📖 문서

- [DEPLOYMENT_EDITOR.md](docs/setup/DEPLOYMENT_EDITOR.md) - 배포 가이드
- [MCP_SETUP_EDITOR.md](docs/setup/MCP_SETUP_EDITOR.md) - MCP 설정 가이드
- [README.md](README.md) - 기존 블로그 시스템 (Obsidian + Jekyll)

---

## 🛠️ 기술 스택

### Frontend
- Vanilla JavaScript
- Marked.js (마크다운 파서)
- CSS Grid/Flexbox

### Backend
- Cloudflare Pages Functions (서버리스)
- D1 Database (SQLite)
- R2 Storage (이미지)
- KV (Rate Limiting)

### 인증 & 보안
- GitHub OAuth
- JWT
- AES-256-GCM

### AI
- Claude Desktop (MCP)
- GitHub MCP Server

---

## 🆚 기존 시스템 vs 웹 에디터

| 항목 | 기존 (Obsidian) | 웹 에디터 (NEW) |
|------|-----------------|-----------------|
| **작성 환경** | Obsidian 앱 (PC) | 웹 (모바일/PC) |
| **동기화** | Obsidian Git | Git API (자동) |
| **이미지** | 로컬 저장 | R2 (CDN) |
| **모바일** | Working Copy ($20) | 무료 ✅ |
| **설정** | 복잡 | 간단 |
| **비용** | $20 (iOS) | 0원 |

---

## 🤝 기여

이 프로젝트는 개인 블로그용이지만, 코드는 참고용으로 공개되어 있습니다.

---

## 📜 라이선스

MIT License

---

## 👤 저자

**전성일 (1di0t)**

- GitHub: [@1di0t](https://github.com/1di0t)
- Blog: https://1di0t.github.io

---

**"웹에서 러프하게 → Claude가 정리 → 자동 배포"** 🚀
