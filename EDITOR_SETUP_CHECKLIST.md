# AutoBlog Editor 설정 체크리스트

배포 전에 이 체크리스트를 확인하세요.

## ✅ 1. GitHub OAuth App

- [ ] GitHub OAuth App 생성
- [ ] Client ID 복사
- [ ] Client Secret 복사
- [ ] Authorization callback URL 설정
  - `https://your-project.pages.dev/auth/callback`

## ✅ 2. Cloudflare Pages

- [ ] Pages 프로젝트 생성
- [ ] Git 저장소 연결
- [ ] 배포 완료 (URL 확인)
- [ ] GitHub OAuth App callback URL 업데이트

## ✅ 3. Cloudflare D1 Database

- [ ] D1 Database 생성 (`autoblog-db`)
- [ ] 스키마 생성 (schema.sql 실행)
- [ ] Database ID 복사
- [ ] Pages 바인딩 추가 (`DB`)

## ✅ 4. Cloudflare R2 Bucket

- [ ] R2 Bucket 생성 (`autoblog-images`)
- [ ] Public Access 활성화
- [ ] Public URL 복사
- [ ] Pages 바인딩 추가 (`R2_BUCKET`)

## ✅ 5. Cloudflare KV Namespace

- [ ] KV Namespace 생성 (`autoblog-kv`)
- [ ] Namespace ID 복사
- [ ] Pages 바인딩 추가 (`KV`)

## ✅ 6. 환경변수 설정

- [ ] `GITHUB_CLIENT_ID`
- [ ] `GITHUB_CLIENT_SECRET`
- [ ] `GITHUB_OWNER` (예: `1di0t`)
- [ ] `GITHUB_REPO` (예: `1di0t.github.io`)
- [ ] `JWT_SECRET` (랜덤 32자 이상)
- [ ] `ENCRYPTION_KEY` (랜덤 32자 이상)
- [ ] `R2_PUBLIC_URL` (예: `https://pub-xxxxx.r2.dev`)

## ✅ 7. 웹 에디터 테스트

- [ ] 웹 에디터 접속 (`/editor`)
- [ ] GitHub 로그인 성공
- [ ] GitHub Token 저장
- [ ] Draft 저장 테스트
- [ ] GitHub `_drafts/` 폴더에 파일 생성 확인
- [ ] 이미지 업로드 테스트
- [ ] R2에 이미지 업로드 확인
- [ ] 사용량 통계 확인

## ✅ 8. Claude MCP 설정

- [ ] GitHub Personal Access Token 생성 (repo 권한)
- [ ] Claude Desktop 설정 (`claude_desktop_config.json`)
- [ ] Claude Desktop 재시작
- [ ] MCP GitHub 연결 확인
- [ ] `_drafts/` 폴더 읽기 테스트
- [ ] AI 정리 테스트
- [ ] `_posts/` 폴더에 파일 생성 확인

## ✅ 9. End-to-End 테스트

- [ ] 웹 에디터에서 Draft 작성
- [ ] GitHub `_drafts/`에 파일 확인
- [ ] Claude Desktop에서 정리 요청
- [ ] `_posts/`에 정리된 파일 확인
- [ ] Cloudflare Pages 자동 배포 확인
- [ ] 블로그에서 포스트 확인

## ✅ 10. 비용 모니터링 설정

- [ ] R2 Storage > 8GB 알림 설정
- [ ] Cloudflare 이메일 알림 설정
- [ ] 사용량 대시보드 확인

---

## 🚨 트러블슈팅

문제 발생 시:

1. **로그인 실패** → GitHub OAuth App callback URL 확인
2. **Draft 저장 실패** → GitHub Token 권한 확인
3. **이미지 업로드 실패** → R2 바인딩 확인
4. **MCP 연결 실패** → Token 권한 재확인

자세한 내용:
- [docs/setup/DEPLOYMENT_EDITOR.md](docs/setup/DEPLOYMENT_EDITOR.md)
- [docs/setup/MCP_SETUP_EDITOR.md](docs/setup/MCP_SETUP_EDITOR.md)

---

**모두 완료하셨나요? 축하합니다! 🎉**
