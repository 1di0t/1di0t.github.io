# Cloudflare Pages 환경변수 설정 가이드

## ⚠️ 문제 증상

웹 에디터 접속 시 다음 에러가 발생:
```json
{
  "error": "GitHub OAuth 설정 오류",
  "message": "GITHUB_CLIENT_ID 환경변수가 설정되지 않았습니다."
}
```

---

## ✅ 해결 방법

### 1단계: GitHub OAuth App 생성

1. **GitHub 설정 페이지 접속**
   - https://github.com/settings/developers
   - "OAuth Apps" → "New OAuth App" 클릭

2. **OAuth App 정보 입력**
   ```
   Application name: AutoBlog Editor
   Homepage URL: https://your-project.pages.dev
   Authorization callback URL: https://your-project.pages.dev/auth/callback
   ```

3. **생성 후 정보 복사**
   - ✅ **Client ID** (예: `Iv1.xxxxxxxxxxxx`)
   - ✅ **Client Secret** 생성 후 복사 (예: `ghp_xxxxxxxxxxxx`)

---

### 2단계: Cloudflare Pages 환경변수 설정

#### 방법 1: Cloudflare Dashboard (추천)

1. **Cloudflare Pages 대시보드 접속**
   - https://dash.cloudflare.com/
   - Pages → 프로젝트 선택

2. **Settings > Environment variables**
   - "Add variable" 클릭

3. **환경변수 추가** (정확한 이름 필수!)

   **Production 환경:**
   ```
   Variable name: GITHUB_CLIENT_ID
   Value: Iv1.xxxxxxxxxxxx (GitHub에서 복사한 Client ID)
   Environment: Production ✓
   ```

   ```
   Variable name: GITHUB_CLIENT_SECRET
   Value: ghp_xxxxxxxxxxxx (GitHub에서 복사한 Client Secret)
   Environment: Production ✓
   ```

   **Preview 환경 (선택):**
   - 동일한 변수를 "Preview" 환경에도 추가

4. **Save 클릭**

#### 방법 2: wrangler.toml (개발용)

로컬 개발 시에는 `wrangler.toml`에 추가:

```toml
[vars]
GITHUB_CLIENT_ID = "Iv1.xxxxxxxxxxxx"
# GITHUB_CLIENT_SECRET는 보안상 .dev.vars 파일에 저장
```

`.dev.vars` 파일 생성 (Git에 커밋하지 말 것!):
```
GITHUB_CLIENT_SECRET=ghp_xxxxxxxxxxxx
```

---

### 3단계: 재배포 (중요!)

환경변수 설정 후 **반드시 재배포**해야 적용됩니다.

#### 옵션 1: Git Push로 자동 재배포
```bash
git commit --allow-empty -m "chore: 환경변수 적용을 위한 재배포"
git push
```

#### 옵션 2: Cloudflare Dashboard에서 수동 재배포
1. Cloudflare Pages → 프로젝트
2. "Deployments" 탭
3. 최신 배포의 "..." → "Retry deployment"

---

## 🔍 문제 해결

### 문제 1: 환경변수 설정했는데 여전히 에러

**원인**: 재배포 안 함

**해결**:
```bash
git commit --allow-empty -m "chore: trigger redeploy"
git push
```

---

### 문제 2: Production에서는 되는데 Preview에서 안 됨

**원인**: Preview 환경에 환경변수 미설정

**해결**:
1. Cloudflare Dashboard → Settings → Environment variables
2. 각 변수의 "Preview" 체크박스 선택
3. Save 후 재배포

---

### 문제 3: debug.availableEnvKeys가 비어있음

**원인**: Cloudflare Pages Functions에서 환경변수 바인딩 실패

**해결**:
1. 환경변수 이름 확인 (대소문자 구분!)
   - ✅ `GITHUB_CLIENT_ID` (정확)
   - ❌ `github_client_id` (잘못됨)
   - ❌ `GithubClientId` (잘못됨)

2. wrangler.toml 확인
   ```toml
   name = "autoblog-editor"
   compatibility_date = "2024-01-01"

   [vars]
   # 개발용 환경변수 (Production에서는 Dashboard 사용)
   ```

3. Cloudflare Pages 프로젝트 재생성 (최후 수단)

---

### 문제 4: 여전히 안 됨 - 디버깅

**1. 에러 응답 확인**
```bash
curl https://your-project.pages.dev/auth/login
```

응답에 `debug.availableEnvKeys` 확인:
```json
{
  "debug": {
    "availableEnvKeys": ["GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET", ...]
  }
}
```

**2. Cloudflare Logs 확인**
- Cloudflare Dashboard → Pages → 프로젝트
- "Logs" 탭에서 실시간 로그 확인
- `console.log` 출력 확인

**3. 환경변수 삭제 후 재추가**
- 기존 환경변수 삭제
- 새로 추가 (오타 방지)
- 재배포

---

## 📋 체크리스트

배포 전 확인사항:

- [ ] GitHub OAuth App 생성 완료
- [ ] Client ID 복사
- [ ] Client Secret 생성 및 복사
- [ ] Cloudflare Pages에 `GITHUB_CLIENT_ID` 추가
- [ ] Cloudflare Pages에 `GITHUB_CLIENT_SECRET` 추가
- [ ] Production 환경 선택 확인
- [ ] 환경변수 Save 완료
- [ ] Git Push로 재배포 또는 수동 재배포
- [ ] 배포 완료 후 `/auth/login` 테스트
- [ ] 에러 시 응답의 `debug.availableEnvKeys` 확인

---

## 🔗 참고 링크

- [GitHub OAuth Apps 설정](https://github.com/settings/developers)
- [Cloudflare Pages 환경변수 문서](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [Cloudflare Pages Functions 문서](https://developers.cloudflare.com/pages/functions/)

---

## 💡 팁

### 환경변수 이름 규칙
- 대문자 + 언더스코어 사용
- 예: `GITHUB_CLIENT_ID`, `API_KEY`, `DATABASE_URL`

### 보안 주의사항
- **절대** Client Secret을 Git에 커밋하지 말 것
- `.dev.vars` 파일은 `.gitignore`에 추가
- Production 환경변수는 Cloudflare Dashboard에서만 설정

### 로컬 개발
```bash
# wrangler 로컬 개발 서버
npx wrangler pages dev editor --binding GITHUB_CLIENT_ID=your_id
```

---

**문제가 지속되면 GitHub Issues에 보고해주세요:**
https://github.com/1di0t/1di0t.github.io/issues
