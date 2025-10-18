# AutoBlog 설치 가이드

이 가이드는 AutoBlog를 처음부터 설정하는 방법을 단계별로 안내합니다.

## 사전 요구사항

다음 프로그램들이 설치되어 있어야 합니다:

- **Obsidian**: https://obsidian.md/download
- **Claude Desktop**: https://claude.ai/download
- **Git**: https://git-scm.com/downloads
- **Ruby** (Jekyll 실행용):
  - Windows: https://rubyinstaller.org/ (Ruby+Devkit 3.1.x)
  - Mac: `brew install ruby`
  - Ubuntu: `sudo apt-get install ruby-full build-essential`
- **Node.js**: https://nodejs.org/ (LTS 버전)

---

## Phase 1: 로컬 프로젝트 설정 (15분)

### 1-1. 저장소 클론 및 초기화

```bash
# 저장소 클론
git clone https://github.com/1di0t/autoblog.git
cd autoblog

# 의존성 설치
npm install
bundle install

# 초기 설정 실행
node scripts/setup.js
```

### 1-2. Jekyll 로컬 테스트

```bash
# 로컬 서버 실행
bundle exec jekyll serve

# 브라우저에서 확인
# http://localhost:4000
```

---

## Phase 2: Obsidian 설정 (30분)

### 2-1. Obsidian Vault 설정

1. **Obsidian 실행**
2. **Open folder as vault** 클릭
3. AutoBlog 프로젝트 폴더 선택 (`e:\self\AutoBlog` 등)

### 2-2. 필수 플러그인 설치

**Settings (⚙️) → Community plugins → Turn on community plugins**

#### 플러그인 1: Remotely Save (모든 기기)

```
1. Browse → "Remotely Save" 검색 → Install
2. 플러그인 활성화
3. 설정:
   - Remote Type: Dropbox
   - Auto Sync: 5 (5분마다)
4. Auth 버튼 클릭 → Dropbox 로그인
5. Check 버튼으로 연결 확인
```

#### 플러그인 2: Local REST API (주 PC만)

```
1. Browse → "Local REST API" 검색 → Install
2. 플러그인 활성화
3. 기본 설정 그대로 사용 (포트: 27124)
```

#### 플러그인 3: Obsidian Git (주 PC만)

```
1. Browse → "Obsidian Git" 검색 → Install
2. 플러그인 활성화
3. 설정:
   - Vault backup interval: 10 (10분마다)
   - Auto pull interval: 10
   - Auto push: ON
   - Commit message: "vault backup: {{date}}"
```

### 2-3. 모든 기기에서 반복

- iOS: App Store에서 Obsidian 설치 → Remotely Save 설정
- Windows: 동일한 방법으로 설정
- Mac: 동일한 방법으로 설정
- Ubuntu: 동일한 방법으로 설정

---

## Phase 3: Claude Desktop + MCP 연동 (30분)

### 3-1. Claude Desktop 설치

1. https://claude.ai/download 접속
2. 운영체제에 맞는 버전 다운로드
3. 설치 및 로그인

### 3-2. MCP-Obsidian 서버 설치

**터미널/PowerShell에서 실행**:

```bash
npx -y @smithery/cli install mcp-obsidian --client claude
```

**프롬프트가 나오면 Vault 경로 입력**:
- Windows: `E:\self\AutoBlog`
- Mac: `/Users/username/AutoBlog`
- Ubuntu: `/home/username/AutoBlog`

### 3-3. 연결 테스트

1. **Claude Desktop 실행**
2. 채팅창에 입력: `"내 옵시디언 볼트의 파일 목록을 보여줘"`
3. MCP 권한 요청 팝업 → **Allow** 클릭
4. Claude가 파일 목록을 보여주면 성공!

### 3-4. 블로그 포스트 정리 테스트

```
사용자: "_drafts 폴더에서 최근 파일을 찾아서 블로그 포스트로 정리해줘"

Claude: [파일을 읽고 정리된 내용 제공]

사용자: "정리된 내용을 _posts/2025-10-18-제목.md로 저장해줘"

Claude: [파일 저장 완료]
```

---

## Phase 4: GitHub 연동 (15분)

### 4-1. GitHub 저장소 설정

```bash
# Git 초기화 (아직 안했다면)
git init

# 원격 저장소 연결
git remote add origin https://github.com/1di0t/1di0t.github.io.git

# 첫 커밋
git add .
git commit -m "Initial commit: AutoBlog setup"
git push -u origin main
```

### 4-2. GitHub Secrets 설정 (선택 - 자동화용)

**저장소 → Settings → Secrets and variables → Actions → New repository secret**

필요한 Secrets:
- `ANTHROPIC_API_KEY`: Claude API 키 (https://console.anthropic.com/)
- `CLOUDFLARE_API_TOKEN`: Cloudflare API 토큰
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare 계정 ID

---

## Phase 5: Cloudflare Pages 설정 (15분)

### 5-1. Cloudflare 계정 생성

1. https://dash.cloudflare.com/sign-up 접속
2. 무료 계정 생성

### 5-2. Pages 프로젝트 생성

1. **Workers & Pages** → **Create application** → **Pages**
2. **Connect to Git** 클릭
3. GitHub 계정 연결
4. 저장소 선택: `1di0t/autoblog`

### 5-3. 빌드 설정

```yaml
Framework preset: Jekyll
Build command: bundle exec jekyll build
Build output directory: _site
Root directory: /
Branch: main

환경 변수:
JEKYLL_ENV=production
RUBY_VERSION=3.1.0
```

### 5-4. 배포 시작

- **Save and Deploy** 클릭
- 첫 배포 대기 (1-2분)
- 완료 후 URL 확인: `https://autoblog-xxx.pages.dev`

### 5-5. 커스텀 도메인 설정 (선택)

1. **Custom domains** → **Set up a custom domain**
2. 도메인 입력 (예: `blog.example.com`)
3. DNS 설정 안내에 따라 CNAME 레코드 추가

---

## Phase 6: 통합 테스트 (30분)

### 6-1. 엔드-투-엔드 워크플로우 테스트

#### 모바일에서 작성 (iOS)
```
1. iOS Obsidian 열기
2. _drafts 폴더에 "test.md" 생성
3. 간단한 내용 작성:

   React Hooks
   - useState: 상태 관리
   - useEffect: 사이드이펙트
   - 예제 코드 추가 예정

4. 저장 → Remotely Save가 자동 동기화
```

#### PC에서 정리 및 발행
```
1. PC Obsidian 열기 (자동으로 동기화됨)
2. Claude Desktop 열기
3. 입력:
   "_drafts/test.md 파일을 블로그 포스트로 정리해줘.
    제목은 'React Hooks 완벽 가이드'로 하고,
    코드 예시와 설명을 추가해서
    _posts/2025-10-18-react-hooks-guide.md로 저장해줘"

4. Claude가 자동으로:
   - 파일 읽기
   - 내용 정리
   - 포스트 저장

5. 10분 후 Obsidian Git이 자동 커밋
6. GitHub에 자동 push
7. Cloudflare Pages 자동 배포
8. 1-2분 후 블로그에서 확인!
```

### 6-2. GitHub Actions 테스트 (선택)

```bash
# _drafts에 파일 생성 후 커밋
git add _drafts/another-test.md
git commit -m "Add draft"
git push

# GitHub Actions 탭에서 워크플로우 실행 확인
# auto-format.yml이 자동으로 실행되어 _posts로 이동
```

---

## 트러블슈팅

### Remotely Save 동기화 안됨

```
1. Obsidian → Settings → Remotely Save
2. "Check" 버튼 클릭
3. 에러 메시지 확인
4. Dropbox 재인증 (Auth 버튼)
5. Obsidian 재시작
```

### MCP 연결 안됨

```bash
# MCP 서버 재설치
npx -y @smithery/cli install mcp-obsidian --client claude

# Obsidian에서 Local REST API 플러그인 활성화 확인
# Claude Desktop 재시작
```

### Obsidian Git 커밋 실패

```bash
cd /path/to/autoblog

# 상태 확인
git status

# 원격 저장소 확인
git remote -v

# 수동으로 pull/push 테스트
git pull
git push

# SSH 키 설정이 안되어 있다면:
# HTTPS 사용 또는 SSH 키 등록
```

### Jekyll 빌드 실패

```bash
# Ruby 버전 확인
ruby --version  # 3.x 이상 필요

# Bundler 재설치
gem install bundler

# 의존성 재설치
bundle install

# 로컬 빌드 테스트
bundle exec jekyll build
```

### Cloudflare Pages 빌드 실패

```
1. Cloudflare 대시보드 → Pages → 프로젝트 선택
2. "View build log" 클릭
3. 에러 메시지 확인
4. 환경 변수 확인:
   - JEKYLL_ENV=production
   - RUBY_VERSION=3.1.0
```

---

## 운영 팁

### 일상적인 사용

1. **모바일에서 메모**: 언제 어디서나 Obsidian으로 작성
2. **자동 동기화**: 5분마다 모든 기기에 동기화됨
3. **PC에서 정리**: Claude Desktop으로 한 번에 정리
4. **자동 배포**: 10분 후 자동으로 블로그에 발행

### 비용 절감 팁

- GitHub Actions 자동화는 선택 사항 (월 300원)
- 수동으로 Claude Desktop 사용하면 완전 무료
- Dropbox 2GB 무료 플랜으로 충분

### 백업

```bash
# 전체 백업 (옵시디언 볼트)
cd /path/to/autoblog
git push origin main

# Dropbox에도 자동 백업됨 (Remotely Save)
```

---

## 다음 단계

설정이 완료되었다면:

1. ✅ 샘플 포스트 작성 및 발행 테스트
2. ✅ 모든 기기에서 동기화 테스트
3. ✅ Claude Desktop으로 포스트 정리 테스트
4. ✅ 자동 배포 확인

이제 AutoBlog를 본격적으로 사용할 준비가 되었습니다! 🎉

---

**도움이 필요하면**:
- 이슈: https://github.com/1di0t/autoblog/issues
- 전체 계획서: [Plan.md](Plan.md)
- README: [README.md](README.md)
