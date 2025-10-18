# Contributing to AutoBlog

AutoBlog에 기여해주셔서 감사합니다! 🎉

## 기여 방법

### 버그 리포트

버그를 발견하셨나요? 다음 정보와 함께 [이슈](https://github.com/1di0t/autoblog/issues)를 열어주세요:

- **버그 설명**: 무엇이 잘못되었나요?
- **재현 방법**: 어떻게 버그를 재현할 수 있나요?
- **예상 동작**: 어떻게 작동해야 하나요?
- **환경**: OS, Node.js 버전, Ruby 버전 등
- **스크린샷**: 가능하다면 스크린샷 첨부

### 기능 제안

새로운 기능을 제안하고 싶으신가요?

1. [이슈](https://github.com/1di0t/autoblog/issues)를 열어주세요
2. 제목에 `[Feature Request]`를 붙여주세요
3. 다음 내용을 포함해주세요:
   - 기능 설명
   - 사용 사례
   - 예상되는 이점

### 코드 기여

1. **Fork** 저장소를 포크하세요
2. **Branch** 새 브랜치를 만드세요
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** 변경사항을 커밋하세요
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push** 브랜치에 푸시하세요
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Pull Request** PR을 열어주세요

## 개발 가이드

### 환경 설정

```bash
# 저장소 클론
git clone https://github.com/1di0t/autoblog.git
cd autoblog

# 의존성 설치
npm install
bundle install

# 로컬 서버 실행
bundle exec jekyll serve
```

### 프로젝트 구조

```
autoblog/
├── _posts/          # 발행된 포스트
├── _drafts/         # 초안
├── _layouts/        # Jekyll 레이아웃
├── scripts/         # 자동화 스크립트
│   ├── setup.js           # 초기 설정
│   └── format-post.js     # Claude API 포매터
├── .github/
│   └── workflows/   # GitHub Actions
├── assets/          # 이미지 등
├── .obsidian/       # Obsidian 설정
└── daily-notes/     # 개인 메모 (발행 안됨)
```

### 코딩 스타일

- **JavaScript**: ESM 스타일, async/await 사용
- **Markdown**: CommonMark 스펙 준수
- **YAML**: 2칸 들여쓰기
- **커밋 메시지**:
  - `feat:` - 새 기능
  - `fix:` - 버그 수정
  - `docs:` - 문서 수정
  - `style:` - 코드 스타일 (기능 변경 없음)
  - `refactor:` - 리팩토링
  - `test:` - 테스트 추가
  - `chore:` - 빌드/설정 변경

### 테스트

```bash
# Jekyll 빌드 테스트
bundle exec jekyll build

# 스크립트 테스트
node scripts/setup.js
node scripts/format-post.js _drafts/test.md
```

## 기여 가이드라인

### DO ✅

- 명확하고 설명적인 커밋 메시지 사용
- 문서 업데이트 (코드 변경 시)
- 하나의 PR에는 하나의 기능/수정
- 기존 코드 스타일 유지
- 테스트 추가 (가능한 경우)

### DON'T ❌

- 여러 기능을 하나의 PR에 포함
- 관련 없는 파일 변경
- 테스트 없는 주요 기능 추가
- 문서화 없는 복잡한 코드

## 우선순위 영역

도움이 필요한 영역:

### 높음 🔴
- [ ] Windows에서 Obsidian Git 플러그인 테스트
- [ ] iOS에서 Remotely Save 동기화 테스트
- [ ] Cloudflare Pages 배포 가이드 검증

### 중간 🟡
- [ ] 이미지 최적화 스크립트
- [ ] 태그 기반 자동 분류
- [ ] Web Analytics 통합
- [ ] 다크 모드 지원

### 낮음 🟢
- [ ] 커스텀 테마 지원
- [ ] 다국어 지원
- [ ] 플러그인 시스템
- [ ] CLI 도구

## 커뮤니티

- **GitHub Issues**: 버그 리포트, 기능 제안
- **GitHub Discussions**: 질문, 아이디어 공유
- **Pull Requests**: 코드 기여

## 라이선스

기여하신 코드는 [MIT License](LICENSE)에 따라 라이선스됩니다.

---

**감사합니다!** 🙏

AutoBlog를 더 나은 프로젝트로 만드는데 도움을 주셔서 감사합니다.
