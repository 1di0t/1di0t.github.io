# GitHub OAuth 설정 가이드

AutoBlog Editor에서 GitHub 로그인을 사용하려면 GitHub OAuth App을 생성하고 Cloudflare Pages에 환경 변수를 설정해야 합니다.

## 1단계: GitHub OAuth App 생성

1. GitHub 설정 페이지로 이동: https://github.com/settings/developers
2. "OAuth Apps" 클릭
3. "New OAuth App" 버튼 클릭
4. 다음 정보 입력:
   - **Application name**: `AutoBlog Editor` (원하는 이름)
   - **Homepage URL**: `https://1di0t.github.io` (배포된 사이트 URL)
   - **Authorization callback URL**: `https://1di0t.github.io/auth/callback`
5. "Register application" 클릭
6. 생성된 페이지에서:
   - **Client ID** 복사
   - "Generate a new client secret" 클릭
   - **Client Secret** 복사 (한 번만 표시되므로 안전한 곳에 저장)

## 2단계: Cloudflare Pages 환경 변수 설정

1. Cloudflare Dashboard 로그인: https://dash.cloudflare.com/
2. "Workers & Pages" 메뉴 선택
3. AutoBlog 프로젝트 선택
4. "Settings" 탭 클릭
5. "Environment variables" 섹션으로 스크롤
6. 다음 환경 변수 추가:

### Production 환경 변수

| 변수 이름 | 값 | 설명 | 필수 여부 |
|----------|-----|------|----------|
| `GITHUB_CLIENT_ID` | (1단계에서 복사한 Client ID) | GitHub OAuth App의 Client ID | ✅ 필수 |
| `GITHUB_CLIENT_SECRET` | (1단계에서 복사한 Client Secret) | GitHub OAuth App의 Client Secret | ✅ 필수 |
| `JWT_SECRET` | (랜덤 문자열, 최소 32자) | 세션 암호화에 사용 | ✅ 필수 |
| `ALLOWED_USERS` | `1di0t` | 로그인 허용할 GitHub 사용자명 (쉼표로 구분) | ⚠️ 선택 (기본값: `1di0t`) |

> **참고**: `ALLOWED_USERS`는 선택 사항입니다. 설정하지 않으면 `1di0t` 사용자만 허용됩니다.

### JWT_SECRET 생성 방법

안전한 랜덤 문자열 생성:

```bash
# Node.js 사용
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# 또는 온라인 도구 사용
# https://www.random.org/strings/
```

### 환경 변수 추가 예시

**최소 설정 (필수 변수만)**:
```
GITHUB_CLIENT_ID=Iv1.abc123def456
GITHUB_CLIENT_SECRET=ghp_abc123def456...
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

**전체 설정 (추가 사용자 허용)**:
```
GITHUB_CLIENT_ID=Iv1.abc123def456
GITHUB_CLIENT_SECRET=ghp_abc123def456...
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
ALLOWED_USERS=1di0t,user2,user3
```

## 3단계: 재배포

환경 변수를 추가한 후 **반드시 재배포**해야 합니다:

1. Cloudflare Pages 프로젝트 페이지에서 "Deployments" 탭 클릭
2. 최신 배포에서 "Retry deployment" 클릭
3. 또는 GitHub에 새 커밋 푸시하여 자동 배포 트리거

## 4단계: 로그인 테스트

1. 배포 완료 후 `https://1di0t.github.io/editor/` 접속
2. "GitHub로 로그인" 버튼 클릭
3. GitHub 인증 페이지로 리다이렉트되면 성공
4. 권한 승인 후 에디터로 돌아옴

## 문제 해결

### "아무 일도 일어나지 않음"

**원인**: 환경 변수가 설정되지 않았거나 재배포하지 않음

**해결**:
1. Cloudflare Pages > Settings > Environment variables에서 모든 변수가 설정되어 있는지 확인
2. 변수 추가/수정 후 반드시 재배포
3. 브라우저 개발자 도구(F12) > Console에서 에러 확인

### "OAuth 설정 오류" 메시지

**원인**: GITHUB_CLIENT_ID가 설정되지 않음

**해결**:
1. Cloudflare Pages 환경 변수에 GITHUB_CLIENT_ID 추가
2. 재배포

### 로그인 후 "Unauthorized" 또는 "접근 거부" 오류

**원인**: ALLOWED_USERS에 사용자명이 없음

**해결**:
1. 다른 GitHub 계정으로 로그인하려면 ALLOWED_USERS 환경 변수 추가
   - 예: `ALLOWED_USERS=yourname` 또는 `ALLOWED_USERS=yourname,friend1,friend2`
2. `1di0t` 계정은 기본적으로 허용되므로 추가 설정 불필요
3. 환경 변수 추가 후 재배포

### 콜백 URL 오류

**원인**: GitHub OAuth App의 callback URL이 잘못됨

**해결**:
1. GitHub OAuth App 설정에서 callback URL 확인
2. 정확한 URL: `https://1di0t.github.io/auth/callback`
3. 프로토콜(https) 및 경로(/auth/callback) 정확히 입력

## 보안 주의사항

1. **Client Secret 노출 금지**: GitHub에 커밋하지 마세요
2. **JWT_SECRET 보안**: 충분히 긴 랜덤 문자열 사용
3. **ALLOWED_USERS 관리**: 신뢰할 수 있는 사용자만 추가
4. **정기적인 Secret 변경**: 보안을 위해 주기적으로 재생성

## 참고 자료

- [GitHub OAuth Apps 문서](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
- [Cloudflare Pages 환경 변수](https://developers.cloudflare.com/pages/configuration/build-configuration/#environment-variables)
