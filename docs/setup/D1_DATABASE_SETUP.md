# D1 데이터베이스 설정 가이드

## 🐛 에러 증상

```
인증 실패: Cannot read properties of undefined (reading 'prepare')
```

이는 **D1 데이터베이스가 바인딩되지 않음**을 의미합니다.

---

## ✅ 완전한 해결 방법

### 📌 필요한 Cloudflare 리소스

에디터가 작동하려면 다음 3가지 리소스가 **모두** 필요합니다:

1. **D1 Database** - 사용자 정보 및 통계 저장
2. **R2 Bucket** - 이미지 저장
3. **KV Namespace** - Rate limiting (요청 제한)

---

## 1️⃣ D1 데이터베이스 생성

### Step 1: D1 데이터베이스 생성

```bash
# Wrangler CLI로 D1 생성
npx wrangler d1 create autoblog-db
```

**출력 예시:**
```
✅ Successfully created DB 'autoblog-db'!

[[d1_databases]]
binding = "DB"
database_name = "autoblog-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**database_id를 복사**하세요!

---

### Step 2: 스키마 적용

```bash
# schema.sql 적용
npx wrangler d1 execute autoblog-db --file=./schema.sql
```

**확인:**
```bash
# 테이블 확인
npx wrangler d1 execute autoblog-db --command="SELECT name FROM sqlite_master WHERE type='table';"
```

출력:
```
users
user_tokens
usage_stats
```

---

### Step 3: Cloudflare Pages에 D1 바인딩

**Cloudflare Dashboard 방법:**

1. **Cloudflare Dashboard 접속**
   - https://dash.cloudflare.com/
   - Pages → 프로젝트 선택

2. **Settings → Functions**
   - 아래로 스크롤하여 "D1 database bindings" 섹션 찾기

3. **바인딩 추가**
   ```
   Variable name: DB
   D1 database: autoblog-db
   Environment: Production
   ```

4. **Save** 클릭

---

## 2️⃣ R2 버킷 생성

### Step 1: R2 버킷 생성

```bash
# R2 버킷 생성
npx wrangler r2 bucket create autoblog-images
```

---

### Step 2: Cloudflare Pages에 R2 바인딩

1. **Cloudflare Dashboard**
   - Pages → 프로젝트 → Settings → Functions

2. **R2 bucket bindings**
   ```
   Variable name: R2_BUCKET
   R2 bucket: autoblog-images
   Environment: Production
   ```

3. **Save** 클릭

---

## 3️⃣ KV Namespace 생성

### Step 1: KV 생성

```bash
# KV namespace 생성
npx wrangler kv:namespace create "autoblog-kv"
```

**출력 예시:**
```
🌀 Creating namespace with title "autoblog-kv"
✨ Success!
Add the following to your wrangler.toml:
[[kv_namespaces]]
binding = "KV"
id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

**KV ID를 복사**하세요!

---

### Step 2: Cloudflare Pages에 KV 바인딩

1. **Cloudflare Dashboard**
   - Pages → 프로젝트 → Settings → Functions

2. **KV namespace bindings**
   ```
   Variable name: KV
   KV namespace: autoblog-kv
   Environment: Production
   ```

3. **Save** 클릭

---

## 4️⃣ 환경변수 설정 (복습)

**Settings → Environment variables**에서:

| Variable name | Value | 설명 |
|---------------|-------|------|
| `GITHUB_CLIENT_ID` | `Iv1.xxxxxxxxxxxx` | GitHub OAuth Client ID |
| `GITHUB_CLIENT_SECRET` | `ghp_xxxxxxxxxxxx` | GitHub OAuth Client Secret |
| `JWT_SECRET` | 랜덤 32자 이상 | JWT 서명용 시크릿 |
| `ENCRYPTION_KEY` | 랜덤 32자 | Token 암호화 키 (base64) |

**ENCRYPTION_KEY 생성:**
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Python
python -c "import secrets; import base64; print(base64.b64encode(secrets.token_bytes(32)).decode())"
```

---

## 5️⃣ 재배포 (필수!)

모든 바인딩 설정 후 **반드시 재배포**:

```bash
git pull
git commit --allow-empty -m "chore: apply D1/R2/KV bindings"
git push
```

또는 Cloudflare Dashboard:
- Deployments → 최신 배포 → "..." → "Retry deployment"

---

## 🔍 설정 확인

### 1. Cloudflare Dashboard에서 확인

**Pages → 프로젝트 → Settings → Functions**

다음이 모두 있어야 함:

**D1 database bindings:**
- Variable name: `DB`
- D1 database: `autoblog-db`

**R2 bucket bindings:**
- Variable name: `R2_BUCKET`
- R2 bucket: `autoblog-images`

**KV namespace bindings:**
- Variable name: `KV`
- KV namespace: `autoblog-kv`

**Environment variables:**
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `JWT_SECRET`
- `ENCRYPTION_KEY`

---

### 2. 배포 후 테스트

1. **에디터 접속**
   ```
   https://YOUR_PROJECT.pages.dev/editor
   ```

2. **GitHub 로그인**
   - 404 대신 GitHub OAuth 페이지로 리다이렉트
   - 인증 후 에디터 화면 표시

3. **에러 확인**
   - Cloudflare Dashboard → Pages → 프로젝트 → Logs
   - 실시간 로그 확인

---

## 🐛 문제 해결

### 에러: "Cannot read properties of undefined (reading 'prepare')"

**원인:** D1 바인딩 없음

**해결:**
1. Cloudflare Dashboard에서 D1 바인딩 확인
2. Variable name이 정확히 `DB`인지 확인 (대소문자 구분!)
3. 재배포

---

### 에러: "R2_BUCKET is undefined"

**원인:** R2 바인딩 없음

**해결:**
1. R2 버킷 생성: `npx wrangler r2 bucket create autoblog-images`
2. Cloudflare Dashboard에서 R2 바인딩 추가
3. 재배포

---

### 에러: "KV is undefined"

**원인:** KV 바인딩 없음

**해결:**
1. KV 생성: `npx wrangler kv:namespace create "autoblog-kv"`
2. Cloudflare Dashboard에서 KV 바인딩 추가
3. 재배포

---

## 📋 전체 체크리스트

배포 전 확인:

**리소스 생성:**
- [ ] D1 데이터베이스 `autoblog-db` 생성
- [ ] schema.sql 적용 완료
- [ ] R2 버킷 `autoblog-images` 생성
- [ ] KV namespace `autoblog-kv` 생성

**Cloudflare Pages 바인딩:**
- [ ] D1 바인딩: `DB` → `autoblog-db`
- [ ] R2 바인딩: `R2_BUCKET` → `autoblog-images`
- [ ] KV 바인딩: `KV` → `autoblog-kv`

**환경변수:**
- [ ] `GITHUB_CLIENT_ID` 설정
- [ ] `GITHUB_CLIENT_SECRET` 설정
- [ ] `JWT_SECRET` 설정 (랜덤 32자)
- [ ] `ENCRYPTION_KEY` 설정 (랜덤 32자 base64)

**재배포:**
- [ ] Git push로 재배포 완료
- [ ] 배포 Success 확인

**테스트:**
- [ ] `/editor` 접속
- [ ] GitHub 로그인
- [ ] 에디터 화면 표시
- [ ] 에러 없음

---

## 💰 비용 확인

**모두 무료 범위 내:**

| 리소스 | 무료 한도 | 예상 사용량 |
|--------|-----------|-------------|
| D1 Database | 5GB storage, 5M reads/day | < 1MB, 100 reads/day |
| R2 Storage | 10GB | < 1GB (이미지) |
| KV | 100,000 reads/day | < 1,000 reads/day |

**총 비용: 0원** (영구 무료)

---

## 🔗 관련 문서

- [Cloudflare D1 문서](https://developers.cloudflare.com/d1/)
- [Cloudflare R2 문서](https://developers.cloudflare.com/r2/)
- [Cloudflare KV 문서](https://developers.cloudflare.com/kv/)
- [Wrangler CLI 문서](https://developers.cloudflare.com/workers/wrangler/)

---

## 📞 추가 도움

문제가 지속되면:

1. **Cloudflare Logs 확인**
   - Dashboard → Pages → 프로젝트 → Logs
   - 에러 메시지 전체 복사

2. **바인딩 스크린샷**
   - Settings → Functions 페이지 스크린샷

3. **GitHub Issues에 보고**
   - https://github.com/1di0t/1di0t.github.io/issues
