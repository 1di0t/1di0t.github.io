# GitHub 404 에러 해결 가이드 (에디터 접근 시)

## 🐛 문제 증상

에디터(`/editor`)에 접근하거나 GitHub 로그인 시 **404 에러** 발생

---

## 🔍 원인 분석

### 1. GitHub OAuth App 미생성 또는 잘못된 설정

**확인 방법:**
1. https://github.com/settings/developers 접속
2. "OAuth Apps" 탭 확인
3. "AutoBlog Editor" (또는 유사한 이름) 앱이 있는지 확인

**404가 발생하는 경우:**
- OAuth App이 없거나
- Authorization callback URL이 잘못됨

---

### 2. Authorization Callback URL 불일치

**올바른 설정:**
```
Application name: AutoBlog Editor
Homepage URL: https://your-project.pages.dev
Authorization callback URL: https://your-project.pages.dev/auth/callback
```

**잘못된 예:**
- ❌ `http://localhost:8788/auth/callback` (로컬 URL)
- ❌ `https://your-project.pages.dev/callback` (경로 누락)
- ❌ `https://github.com/...` (GitHub URL)
- ✅ `https://your-project.pages.dev/auth/callback` (정확)

---

## ✅ 해결 방법

### Step 1: GitHub OAuth App 생성/수정

1. **GitHub OAuth Apps 페이지 접속**
   - https://github.com/settings/developers
   - "OAuth Apps" → "New OAuth App" (또는 기존 앱 수정)

2. **정확한 정보 입력**
   ```
   Application name: AutoBlog Editor
   Homepage URL: https://YOUR_PROJECT_NAME.pages.dev
   Authorization callback URL: https://YOUR_PROJECT_NAME.pages.dev/auth/callback
   ```

   **중요:** `YOUR_PROJECT_NAME`을 실제 Cloudflare Pages 프로젝트 이름으로 변경!

3. **Register application** 클릭

4. **Client credentials 복사**
   - ✅ Client ID (예: `Iv1.xxxxxxxxxxxx`)
   - ✅ "Generate a new client secret" 클릭 후 복사 (예: `ghp_xxxxxxxxxxxx`)

---

### Step 2: Cloudflare Pages 환경변수 설정

1. **Cloudflare Dashboard 접속**
   - https://dash.cloudflare.com/
   - Pages → 프로젝트 선택 → Settings → Environment variables

2. **환경변수 추가**

   **Production 환경:**

   | Variable name | Value | Environment |
   |---------------|-------|-------------|
   | `GITHUB_CLIENT_ID` | `Iv1.xxxxxxxxxxxx` | ✓ Production |
   | `GITHUB_CLIENT_SECRET` | `ghp_xxxxxxxxxxxx` | ✓ Production |

   **추가 필수 환경변수:**

   | Variable name | Value | 설명 |
   |---------------|-------|------|
   | `JWT_SECRET` | 랜덤 문자열 (32자 이상) | JWT 토큰 서명용 |

   JWT_SECRET 생성 예시:
   ```bash
   # Node.js
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

   # Python
   python -c "import secrets; print(secrets.token_hex(32))"

   # 또는 온라인: https://generate-secret.vercel.app/32
   ```

3. **Save** 클릭

---

### Step 3: 재배포 (중요!)

환경변수 설정 후 **반드시 재배포** 필요:

```bash
git pull
git commit --allow-empty -m "chore: apply GitHub OAuth env vars"
git push
```

또는 Cloudflare Dashboard에서:
- Deployments → 최신 배포 → "..." → "Retry deployment"

---

### Step 4: 배포 완료 후 테스트

1. **배포 상태 확인**
   - Cloudflare Dashboard → Pages → Deployments
   - "Success" 상태 확인

2. **에디터 접속 테스트**
   ```
   https://YOUR_PROJECT_NAME.pages.dev/editor
   ```

3. **GitHub 로그인 버튼 클릭**
   - GitHub 인증 페이지로 리다이렉트되어야 함
   - 404 대신 GitHub OAuth 페이지가 표시되어야 함

---

## 🔧 추가 문제 해결

### 문제 1: 여전히 404 발생

**디버깅 단계:**

1. **환경변수 확인**
   ```bash
   curl https://YOUR_PROJECT_NAME.pages.dev/auth/login
   ```

   응답에서 `debug.availableEnvKeys` 확인:
   ```json
   {
     "debug": {
       "availableEnvKeys": ["GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET", "JWT_SECRET"]
     }
   }
   ```

2. **Cloudflare Logs 확인**
   - Dashboard → Pages → 프로젝트 → "Logs"
   - 실시간 로그에서 에러 확인

3. **GitHub OAuth App URL 재확인**
   - Authorization callback URL이 정확히 `https://YOUR_PROJECT.pages.dev/auth/callback`인지 확인
   - 끝에 `/`가 있으면 안 됨

---

### 문제 2: "Redirect URI mismatch" 에러

**원인:** GitHub OAuth App의 callback URL과 실제 요청 URL 불일치

**해결:**
1. GitHub OAuth App 설정에서 Authorization callback URL 확인
2. 정확히 `https://YOUR_PROJECT_NAME.pages.dev/auth/callback` 입력
3. 저장 후 다시 시도

---

### 문제 3: "Application suspended" 에러

**원인:** GitHub OAuth App이 정지됨

**해결:**
1. https://github.com/settings/developers
2. 해당 OAuth App 선택
3. "Revoke all user tokens" 클릭
4. 앱 재활성화

---

## 📋 체크리스트

배포 전 확인사항:

- [ ] GitHub OAuth App 생성 완료
- [ ] Authorization callback URL이 `https://PROJECT.pages.dev/auth/callback`로 설정
- [ ] Client ID 복사
- [ ] Client Secret 생성 및 복사
- [ ] Cloudflare Pages에 `GITHUB_CLIENT_ID` 추가
- [ ] Cloudflare Pages에 `GITHUB_CLIENT_SECRET` 추가
- [ ] Cloudflare Pages에 `JWT_SECRET` 추가 (랜덤 32자 이상)
- [ ] Production 환경 선택 확인
- [ ] Save 후 재배포 완료
- [ ] 배포 Success 확인
- [ ] `/editor` 접속 테스트
- [ ] GitHub 로그인 테스트

---

## 🔐 보안 주의사항

1. **Client Secret 절대 노출 금지**
   - Git에 커밋하지 말 것
   - 공개 저장소에 올리지 말 것
   - Cloudflare Dashboard에서만 설정

2. **JWT_SECRET 강력하게 설정**
   - 최소 32자 이상 랜덤 문자열
   - 영문 대소문자, 숫자, 특수문자 혼합

3. **정기적으로 Secret 갱신**
   - 6개월마다 Client Secret 재생성 권장
   - JWT_SECRET도 주기적 갱신

---

## 📞 추가 도움

위 방법으로도 해결되지 않으면:

1. **에러 응답 전체 복사**
   ```bash
   curl -v https://YOUR_PROJECT.pages.dev/auth/login
   ```

2. **Cloudflare Logs 스크린샷**

3. **GitHub OAuth App 설정 스크린샷** (Secret 제외)

이 정보와 함께 GitHub Issues에 보고:
https://github.com/1di0t/1di0t.github.io/issues

---

## 🔗 관련 문서

- [CLOUDFLARE_ENV_SETUP.md](./CLOUDFLARE_ENV_SETUP.md) - 환경변수 상세 설정
- [GitHub OAuth 문서](https://docs.github.com/en/apps/oauth-apps)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
