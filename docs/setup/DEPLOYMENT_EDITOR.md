# AutoBlog Editor 배포 가이드

Cloudflare Pages에 웹 에디터를 배포하는 전체 가이드입니다.

## 목차
- [사전 준비](#사전-준비)
- [GitHub OAuth App 생성](#1-github-oauth-app-생성)
- [Cloudflare Pages 배포](#2-cloudflare-pages-배포)
- [D1 Database 설정](#3-d1-database-설정)
- [R2 Bucket 설정](#4-r2-bucket-설정)
- [KV Namespace 설정](#5-kv-namespace-설정)
- [환경변수 설정](#6-환경변수-설정)
- [테스트](#7-테스트)
- [트러블슈팅](#트러블슈팅)

---

## 사전 준비

필요한 것들:
- ✅ GitHub 계정
- ✅ Cloudflare 계정 (무료)
- ✅ Git 저장소 (1di0t/1di0t.github.io)

---

## 1. GitHub OAuth App 생성

### 1.1. GitHub OAuth App 등록

1. [https://github.com/settings/developers](https://github.com/settings/developers) 접속
2. **"OAuth Apps"** 클릭
3. **"New OAuth App"** 클릭

### 1.2. 설정 입력

| 항목 | 값 |
|------|-----|
| **Application name** | `AutoBlog Editor` |
| **Homepage URL** | `https://your-project.pages.dev` |
| **Authorization callback URL** | `https://your-project.pages.dev/auth/callback` |

⚠️ `your-project.pages.dev`는 나중에 Cloudflare에서 확인 후 업데이트하세요.

### 1.3. Client ID & Secret 복사

1. **"Register application"** 클릭
2. **Client ID** 복사 (나중에 사용)
3. **"Generate a new client secret"** 클릭
4. **Client Secret** 복사 (한 번만 표시됨!)

---

## 2. Cloudflare Pages 배포

### 2.1. Cloudflare Dashboard 접속

1. [https://dash.cloudflare.com](https://dash.cloudflare.com) 로그인
2. **"Workers & Pages"** 클릭
3. **"Create application"** → **"Pages"** → **"Connect to Git"** 클릭

### 2.2. GitHub 저장소 연결

1. GitHub 계정 연결 (최초 1회)
2. 저장소 선택: `1di0t/1di0t.github.io`
3. **"Begin setup"** 클릭

### 2.3. 빌드 설정

| 설정 | 값 |
|------|-----|
| **Project name** | `autoblog-editor` (또는 원하는 이름) |
| **Production branch** | `main` |
| **Build command** | `npm run build` (또는 비워두기) |
| **Build output directory** | `/` |

**"Save and Deploy"** 클릭

### 2.4. 배포 URL 확인

배포 완료 후:
```
https://autoblog-editor.pages.dev
```

이 URL을 복사하고 GitHub OAuth App 설정으로 돌아가서 업데이트하세요.

---

## 3. D1 Database 설정

### 3.1. D1 Database 생성

1. Cloudflare Dashboard → **"Workers & Pages"** → **"D1"**
2. **"Create database"** 클릭
3. **Database name**: `autoblog-db`
4. **"Create"** 클릭

### 3.2. 스키마 생성

1. 생성된 데이터베이스 클릭
2. **"Console"** 탭 선택
3. `schema.sql` 파일 내용을 복사하여 실행:

```sql
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  github_id INTEGER NOT NULL UNIQUE,
  github_username TEXT NOT NULL,
  email TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_tokens (
  user_id INTEGER PRIMARY KEY,
  encrypted_token TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS usage_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  stat_type TEXT NOT NULL,
  period_type TEXT NOT NULL,
  period TEXT NOT NULL,
  count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, stat_type, period_type, period)
);

CREATE INDEX IF NOT EXISTS idx_usage_stats_lookup
  ON usage_stats(user_id, stat_type, period_type, period);
```

**"Execute"** 클릭

### 3.3. Database ID 복사

1. **"Overview"** 탭으로 이동
2. **"Database ID"** 복사 (환경변수로 사용)

---

## 4. R2 Bucket 설정

### 4.1. R2 Bucket 생성

1. Cloudflare Dashboard → **"R2"**
2. **"Create bucket"** 클릭
3. **Bucket name**: `autoblog-images`
4. **Location**: `Automatic` (권장)
5. **"Create bucket"** 클릭

### 4.2. Public Access 설정

1. 생성된 Bucket 클릭
2. **"Settings"** 탭
3. **"Public access"** → **"Allow Access"** 클릭
4. **"Connect Domain"** (선택사항, 커스텀 도메인)

### 4.3. Public URL 복사

```
https://pub-xxxxxxxxxxxxx.r2.dev
```

이 URL을 환경변수 `R2_PUBLIC_URL`로 사용하세요.

---

## 5. KV Namespace 설정

### 5.1. KV Namespace 생성

1. Cloudflare Dashboard → **"Workers & Pages"** → **"KV"**
2. **"Create namespace"** 클릭
3. **Namespace Name**: `autoblog-kv`
4. **"Add"** 클릭

### 5.2. Namespace ID 복사

생성된 Namespace의 ID를 복사하세요.

---

## 6. 환경변수 설정

### 6.1. Pages 프로젝트 설정

1. Cloudflare Dashboard → **"Workers & Pages"**
2. 프로젝트 (`autoblog-editor`) 선택
3. **"Settings"** → **"Environment variables"** 탭

### 6.2. 환경변수 추가

**Production** 탭에서 다음 변수들을 추가하세요:

| 변수명 | 값 | 설명 |
|--------|-----|------|
| `GITHUB_CLIENT_ID` | `Iv1.xxxxx` | GitHub OAuth App Client ID |
| `GITHUB_CLIENT_SECRET` | `xxxxx` | GitHub OAuth App Client Secret |
| `GITHUB_OWNER` | `1di0t` | GitHub 저장소 소유자 |
| `GITHUB_REPO` | `1di0t.github.io` | GitHub 저장소 이름 |
| `JWT_SECRET` | `랜덤 문자열 (32자 이상)` | JWT 암호화 키 |
| `ENCRYPTION_KEY` | `랜덤 문자열 (32자 이상)` | 데이터 암호화 키 |
| `R2_PUBLIC_URL` | `https://pub-xxxxx.r2.dev` | R2 Public URL |

**랜덤 문자열 생성 방법**:
```bash
# Mac/Linux
openssl rand -base64 32

# Windows PowerShell
[System.Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### 6.3. Bindings 설정

같은 **"Settings"** 페이지에서:

**D1 database bindings**:
- Variable name: `DB`
- D1 database: `autoblog-db` 선택

**R2 bucket bindings**:
- Variable name: `R2_BUCKET`
- R2 bucket: `autoblog-images` 선택

**KV namespace bindings**:
- Variable name: `KV`
- KV namespace: `autoblog-kv` 선택

### 6.4. 재배포

환경변수 저장 후 **"Deployments"** 탭에서:
1. 최신 배포 선택
2. **"Manage deployment"** → **"Redeploy"** 클릭

---

## 7. 테스트

### 7.1. 웹 에디터 접속

```
https://autoblog-editor.pages.dev/editor
```

### 7.2. 로그인 테스트

1. **"GitHub로 로그인"** 클릭
2. GitHub 인증 승인
3. 에디터 화면으로 리다이렉트 확인

### 7.3. GitHub Token 설정

1. **"설정"** 버튼 클릭
2. GitHub Personal Access Token 입력 ([MCP_SETUP_EDITOR.md](MCP_SETUP_EDITOR.md) 참고)
3. **"저장"** 클릭

### 7.4. Draft 작성 테스트

1. 제목 입력
2. 마크다운 작성
3. **"저장"** 클릭
4. GitHub 저장소 확인: `_drafts/` 폴더에 파일 생성 확인

### 7.5. 이미지 업로드 테스트

1. **"이미지"** 버튼 클릭
2. 이미지 선택 후 업로드
3. 마크다운에 이미지 URL 삽입 확인

### 7.6. 사용량 통계 확인

1. **"사용량"** 버튼 클릭
2. 통계 데이터 표시 확인

---

## 8. 워크플로우 이해하기

### 💡 옵션 1: PC 중심 워크플로우 (현재 설계)

```
📱 외출 중 (모바일)
   웹 에디터 접속 → 러프 작성 → "저장"
   → GitHub _drafts/ 폴더에 자동 커밋

   ⏸️ (작성 완료, PC 대기)

💻 집에서 (PC)
   PC 켜기 → Claude Desktop 실행
   → "모든 초안 정리해줘"
   → AI 정리 (카테고리, 태그, 구조화)
   → GitHub _posts/ 폴더에 자동 커밋 + 푸시

☁️ 자동 (Cloudflare Pages)
   GitHub main 브랜치 업데이트 감지
   → Jekyll 빌드 → 배포 완료 (1-2분)
```

### 장점 ✅

- **API 비용 0원**: 구독형 Claude 사용 (API 키 불필요)
- **외출 중 작성 가능**: 모바일에서 언제든 작성
- **완전 무료**: 10년간 비용 0원 보장

### 제약 ⚠️

- **AI 정리는 PC에서만**: Claude Desktop은 로컬 앱
- **PC 실행 필요**: Claude Desktop이 켜져 있어야 함
- **모바일 단독 불가**: AI 정리 기능만 PC 필요

### 실제 사용 시나리오

**예시 1: 평일 출퇴근**
```
09:00 지하철 (모바일) → 글 작성 → 저장
19:00 집 도착 (PC)     → Claude "정리해줘" → 완료
19:05 자동 배포        → 블로그 업데이트 ✅
```

**예시 2: 주말 카페**
```
14:00 카페 (모바일)    → 3개 글 작성 → 저장
20:00 집 도착 (PC)     → Claude "모두 정리해줘" → 완료
20:10 자동 배포        → 3개 포스트 동시 발행 ✅
```

### 다른 옵션은?

**옵션 2: 완전 자동화 (Claude API)**
- ✅ PC 불필요, 모바일 단독 가능
- ❌ API 비용 발생 ($15~50/월)
- ❌ **비용 발생 절대 금지 원칙 위배**

**결론**: 옵션 1이 유일한 무료 솔루션 ✅

---

## 트러블슈팅

### 문제 1: "GitHub OAuth Error"

**원인**: OAuth App 설정 오류

**해결**:
1. GitHub OAuth App의 **Authorization callback URL** 확인:
   - `https://your-actual-domain.pages.dev/auth/callback`
2. HTTP**S** 확인 (HTTP는 안 됨)

### 문제 2: "Database not found"

**원인**: D1 바인딩 오류

**해결**:
1. Pages 설정 → "Functions" → "D1 database bindings" 확인
2. Variable name이 `DB`인지 확인
3. 재배포

### 문제 3: "R2 upload failed"

**원인**: R2 바인딩 또는 Public Access 오류

**해결**:
1. R2 Bucket → "Settings" → "Public access" 활성화 확인
2. Pages 설정 → "Functions" → "R2 bucket bindings" 확인
3. Variable name이 `R2_BUCKET`인지 확인

### 문제 4: "JWT verification failed"

**원인**: JWT_SECRET 환경변수 오류

**해결**:
1. Pages 설정 → "Environment variables" → `JWT_SECRET` 확인
2. Production과 Preview 모두 설정했는지 확인
3. 재배포

---

## 비용 모니터링

### Cloudflare Dashboard에서 확인

1. **R2** → `autoblog-images` → "Metrics" 탭
   - Storage 사용량 확인
   - 8GB 도달 시 이메일 알림 설정

2. **D1** → `autoblog-db` → "Metrics" 탭
   - Read/Write 작업 수 확인

3. **Pages** → `autoblog-editor` → "Analytics" 탭
   - Functions 요청 수 확인

### 알림 설정

1. Cloudflare Dashboard → "Notifications"
2. **"Add notification"** 클릭
3. R2 Storage > 8GB 시 이메일 알림 추가

---

## 다음 단계

1. ✅ 웹 에디터 배포 완료
2. ✅ GitHub Token 설정
3. ✅ Draft 작성 테스트
4. 📖 [MCP_SETUP_EDITOR.md](MCP_SETUP_EDITOR.md) - Claude Desktop MCP 설정
5. 🚀 완전 자동화 워크플로우 사용!

---

**완료!** 이제 모바일/PC에서 어디서든 블로그를 작성할 수 있습니다. 🎉
