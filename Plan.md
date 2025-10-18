# AutoBlog 구현 계획

## 프로젝트 개요

공부 내용을 정리하는 개인 블로그를 GitHub Pages에서 Cloudflare Pages로 업그레이드하는 프로젝트입니다.

### 핵심 요구사항
- 모바일/PC 어디서나 작성 가능
- 월 5천원 이하 운영비 (무료 우선)
- 러프한 텍스트 → AI 자동 정리 → 퍼블리시
- 기존 Jekyll 스타일 유지

### 기존 사이트
- GitHub 저장소: https://github.com/1di0t/1di0t.github.io
- 배포 URL: https://1di0t.github.io/
- 현재 사용 중인 도구: Jekyll + GitHub Pages

### 사용 환경
- **모바일**: iOS
- **데스크톱**: Windows, Mac, Ubuntu

---

## 최종 추천 구성

### 전체 아키텍처

```
┌────────────────────────────────────────────┐
│        작성 (모든 기기)                     │
├────────────────────────────────────────────┤
│ iOS 옵시디언                                │
│ Windows 옵시디언                            │
│ Mac 옵시디언                                │
│ Ubuntu 옵시디언                             │
│         ↓                                  │
│ Remotely Save 플러그인                      │
│         ↓                                  │
│ Dropbox (무료 2GB)                         │
└───────────┬────────────────────────────────┘
            ↓
    자동 동기화 (5분마다)
            ↓
┌────────────────────────────────────────────┐
│    정리 및 발행 (PC)                        │
├────────────────────────────────────────────┤
│ PC 옵시디언에서 확인                        │
│         ↓                                  │
│ Claude Desktop "/정리" 명령 (1회만)        │
│         ↓                                  │
│ 자동 정리 및 저장                           │
│         ↓                                  │
│ Obsidian Git 플러그인                      │
│ - 10분마다 자동 커밋                        │
│ - GitHub에 자동 push                       │
└───────────┬────────────────────────────────┘
            ↓
    ┌──────────────┐
    │ GitHub 저장소 │
    │ (기존 유지)   │
    └──────┬───────┘
           ↓
    ┌─────────────────────┐
    │ Cloudflare Pages    │
    │ - 자동 Jekyll 빌드  │
    │ - 전세계 CDN 배포   │
    │ - 1-2분 후 배포완료 │
    └─────────────────────┘
```

### 특징
- **자동화 수준**: 95%
- **유일한 수동 작업**: Claude Desktop에서 "/정리" 명령 입력
- **나머지 전부 자동**: 동기화, 커밋, 배포
- **비용**: 0원

---

## 월간 운영 비용

| 항목 | 서비스 | 월 비용 | 비고 |
|------|--------|---------|------|
| 작성 | Obsidian | 0원 | 무료 앱 |
| 동기화 | Dropbox Free | 0원 | 2GB 무료 |
| 정리 | Claude Desktop (MCP) | 0원 | 구독 활용 |
| 저장소 | GitHub | 0원 | Private 가능 |
| 호스팅 | Cloudflare Pages | 0원 | 무제한 bandwidth |
| **총계** | | **0원** | 완전 무료 |

---

## GitHub Pages vs Cloudflare Pages

### 발행 아키텍처 비교

#### 현재 (GitHub Pages)
```
로컬 작성 → git push → GitHub Pages
                        - Jekyll 자동 빌드
                        - username.github.io
                        - 월 100GB 제한
```

#### 변경 후 (Cloudflare Pages)
```
로컬 작성 → git push → GitHub 저장소 (기존 유지)
                             ↓
                       Cloudflare Pages
                        - Jekyll 자동 빌드
                        - 무제한 bandwidth
                        - 300+ CDN (더 빠름)
                        - 무료 Analytics
```

### 주요 차이점

| 항목 | GitHub Pages | Cloudflare Pages |
|------|--------------|------------------|
| **Jekyll 빌드** | 자동 (플러그인 제한) | 자동 (모든 플러그인) |
| **속도** | 보통 | 빠름 (300+ CDN) |
| **Bandwidth** | 월 100GB | 무제한 |
| **빌드 시간** | ~30초 | ~30초-2분 |
| **Preview** | 제한적 | PR마다 preview URL |
| **분석** | 없음 | 무료 Web Analytics |
| **비용** | 무료 | 무료 |

### 마이그레이션 영향
- **GitHub 저장소**: 그대로 유지 (변경 없음)
- **커밋 방법**: 동일 (git push)
- **도메인**: Cloudflare 설정에서 변경
- **기존 GitHub Pages**: 끄거나 유지 (선택)

---

## 상세 구현 가이드

### Phase 1: 옵시디언 멀티 기기 동기화 (30분)

#### 1-1. Remotely Save 플러그인 설치

**모든 기기에서 동일하게 설정**:

1. **Obsidian 설정** → **Community plugins** → **Browse**
2. "Remotely Save" 검색 및 설치
3. 플러그인 활성화

#### 1-2. Dropbox 연동

1. Dropbox 계정 생성 (무료 2GB)
2. Remotely Save 설정:
   ```
   Remote Service: Dropbox
   Auto Sync Every: 5 (분마다 자동 동기화)
   ```
3. "Auth" 버튼 클릭 → Dropbox 인증
4. "Check" 버튼으로 연결 확인

#### 1-3. 모든 기기에서 동일 설정 반복

- iOS 옵시디언
- Windows 옵시디언
- Mac 옵시디언
- Ubuntu 옵시디언

**테스트**:
- iOS에서 노트 작성
- 5분 후 PC에서 확인
- 양방향 동기화 확인

#### 대안: Git 기반 동기화 (개발자용)

**데스크톱 (Windows/Mac/Ubuntu)**:
- Obsidian Git 플러그인 사용

**iOS**:
- Working Copy 앱 ($20 일회성)

**단점**: iOS 유료 앱 필요

---

### Phase 2: Claude Desktop + MCP 연동 (1시간)

#### 2-1. Claude Desktop 설치

1. https://claude.ai/download 에서 다운로드 (Windows/Mac/Ubuntu)
2. Claude 계정 로그인

#### 2-2. MCP-Obsidian 서버 설치

**터미널/PowerShell에서 실행**:
```bash
npx -y @smithery/cli install mcp-obsidian --client claude
```

**옵시디언 볼트 경로 입력 시**:
- Windows: `E:\Obsidian\MyVault`
- Mac: `/Users/username/Obsidian/MyVault`
- Ubuntu: `/home/username/Obsidian/MyVault`

#### 2-3. Obsidian Local REST API 플러그인 설치

1. Obsidian → Settings → Community Plugins
2. "Local REST API" 검색 및 설치
3. 플러그인 설정에서 활성화
4. 기본 포트: 27124 (그대로 사용)

#### 2-4. 테스트

**Claude Desktop 열기**:
```
입력: "내 옵시디언에서 최근 노트 3개 요약해줘"
```

- MCP 권한 허용 팝업 → "Allow" 클릭
- Claude가 옵시디언 파일 읽고 요약 제공 확인

#### 2-5. 정리 프롬프트 예시

**러프한 노트 정리**:
```
"최근 노트 'React 공부' 찾아서 블로그 포스트로 정리해줘.

형식:
- 제목 (H1)
- 간단한 요약
- 본문 (적절한 헤딩 구조)
- 코드 예시는 코드 블록으로
- 마지막에 #react #javascript 태그 추가"
```

**자동 저장 명령**:
```
"/save 정리된 내용을 'React Hooks 완벽 가이드.md'로 저장해줘"
```

---

### Phase 3: Git 자동 배포 설정 (30분)

#### 3-1. Obsidian Git 플러그인 설치 (PC만)

**주 작업용 PC (Windows/Mac/Ubuntu 중 하나)에만 설치**:

1. Settings → Community Plugins → "Obsidian Git" 설치
2. 플러그인 설정:
   ```
   Vault backup interval: 10 (10분마다 자동 커밋)
   Commit message: "vault backup: {{date}}"
   Auto pull interval: 10 (10분마다 자동 pull)
   Auto pull on boot: ON
   Auto push: ON
   ```

#### 3-2. GitHub 저장소 연결

**옵시디언 볼트를 Git 저장소로 초기화**:

```bash
cd /path/to/obsidian/vault
git init
git remote add origin https://github.com/1di0t/1di0t.github.io.git
git pull origin main
```

**또는 기존 저장소 클론**:
```bash
git clone https://github.com/1di0t/1di0t.github.io.git
# 옵시디언에서 이 폴더를 볼트로 열기
```

#### 3-3. Jekyll 구조 정리

**옵시디언 노트 → Jekyll 포스트 연결**:

```
Obsidian Vault/
├── _posts/          ← Jekyll 포스트 (발행됨)
├── _drafts/         ← 초안 (미발행)
├── assets/          ← 이미지 등
└── daily-notes/     ← 개인 메모 (발행 안됨)
```

**.gitignore 설정**:
```
# 개인 메모는 발행 안함
daily-notes/
.obsidian/workspace*

# 발행할 파일만
!_posts/
!_drafts/
!assets/
!_config.yml
```

#### 3-4. 워크플로우 테스트

1. 옵시디언에서 `_drafts/test.md` 작성
2. Claude Desktop "/정리" 명령
3. 정리된 내용을 `_posts/2025-10-18-test.md`로 저장
4. 10분 후 자동 커밋 확인
5. GitHub에 push 확인

---

### Phase 4: Cloudflare Pages 설정 (15분)

#### 4-1. Cloudflare 계정 생성

1. https://dash.cloudflare.com/sign-up 접속
2. 무료 계정 생성

#### 4-2. Pages 프로젝트 생성

1. **Workers & Pages** → **Create application** → **Pages**
2. **Connect to Git** 클릭
3. GitHub 계정 연결
4. 저장소 선택: `1di0t/1di0t.github.io`

#### 4-3. 빌드 설정

```yaml
Framework preset: Jekyll
Build command: jekyll build
Build output directory: _site
Root directory: /

환경 변수 (선택):
JEKYLL_ENV: production
```

#### 4-4. 배포 시작

- **Save and Deploy** 클릭
- 첫 배포 시작 (1-2분 소요)
- 배포 완료 후 URL 확인: `https://autoblog-xxx.pages.dev`

#### 4-5. 커스텀 도메인 설정 (선택)

**기존 도메인 사용 시**:
1. **Custom domains** → **Set up a custom domain**
2. `1di0t.github.io` 입력
3. DNS 설정 안내에 따라 변경

**새 도메인 구매 시**:
- Cloudflare Registrar에서 구매 가능 (~15,000원/년)

---

### Phase 5: GitHub Pages 처리 (5분)

#### 옵션 A: GitHub Pages 비활성화 (추천)

1. GitHub 저장소 → **Settings** → **Pages**
2. **Source**: None 선택
3. Cloudflare Pages만 사용

#### 옵션 B: 병행 운영

- GitHub Pages 유지 (1di0t.github.io)
- Cloudflare Pages 추가 (autoblog-xxx.pages.dev)
- 나중에 선택

---

## 전체 워크플로우 예시

### 시나리오 1: 출근길 메모 → 퇴근 후 발행

**오전 (지하철, iOS)**:
```
1. iOS 옵시디언 열기
2. 새 노트 "리액트 useEffect 정리.md" 생성
3. 러프하게 작성:

   useEffect 훅
   - 사이드이펙트 처리
   - 의존성 배열 중요
   - cleanup 함수

4. 저장 → Remotely Save가 5분 후 자동 동기화
```

**저녁 (집, Windows PC)**:
```
1. PC 옵시디언 열기 (자동으로 iOS 메모 동기화됨)
2. Claude Desktop 열기 (Alt+Space)
3. 입력: "최근 노트 'useEffect' 찾아서 블로그 포스트로 정리해줘"
4. Claude가 정리한 내용 확인
5. 입력: "/save _posts/2025-10-18-react-useeffect.md로 저장"
6. 10분 후 Obsidian Git이 자동 커밋
7. GitHub에 자동 push
8. Cloudflare Pages 자동 빌드
9. 1-2분 후 블로그 배포 완료!
```

**수동 작업**: Claude Desktop 명령 2번만 (3단계, 5단계)

### 시나리오 2: 주말 집중 작성 (Mac)

```
1. Mac 옵시디언에서 장문 작성
2. Claude Desktop "/정리" 명령
3. 정리된 내용 _posts 폴더에 저장
4. 나머지 자동: Git 커밋 → GitHub → 배포
```

### 시나리오 3: 긴급 수정 (Ubuntu)

```
1. Ubuntu 옵시디언에서 오타 수정
2. 저장만 하면 끝
3. 10분 후 자동 배포
```

---

## 핵심 자동화 포인트

### 자동으로 되는 것
- ✅ 모든 기기 옵시디언 동기화 (5분마다)
- ✅ Git 커밋 (10분마다)
- ✅ GitHub push (자동)
- ✅ Jekyll 빌드 (자동)
- ✅ Cloudflare 배포 (자동)

### 수동으로 하는 것
- ⚠️ Claude Desktop "/정리" 명령 (1회)
- ⚠️ 정리된 내용 확인 및 저장

**자동화 비율: 95%**

---

## 고급 최적화 (선택)

### 1. Claude MCP 커스텀 명령어

**옵시디언 Templater 플러그인으로 단축키 설정**:

```javascript
// .obsidian/scripts/format-for-blog.js
module.exports = async (tp) => {
  const content = tp.file.content;
  // 클립보드에 프롬프트 복사
  await navigator.clipboard.writeText(
    `다음 내용을 블로그 포스트로 정리:\n\n${content}`
  );
  // Claude Desktop 자동 열기
  // (OS별 단축키 사용)
}
```

### 2. GitHub Actions로 완전 자동화 (API 비용 발생)

```yaml
# .github/workflows/auto-format.yml
name: Auto Format with Claude

on:
  push:
    paths:
      - '_drafts/**.md'

jobs:
  format:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Format with Claude API
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: python scripts/format_post.py
      - name: Commit
        run: |
          git add _posts/
          git commit -m "Auto-format post"
          git push
```

**비용**: 월 300원 (Haiku 4.5, 20포스트 기준)

### 3. 모바일 전용 간소화 프롬프트

**iOS에서 빠른 발행용**:
1. 메모 작성
2. 맨 위에 `#publish` 태그 추가
3. GitHub Actions가 감지하여 자동 정리/발행

---

## 트러블슈팅

### Remotely Save 동기화 안됨
- 플러그인 설정에서 "Check" 버튼 클릭
- Dropbox 인증 재실행
- 옵시디언 재시작

### Obsidian Git 커밋 실패
```bash
# 터미널에서 수동 확인
cd /path/to/vault
git status
git pull
git push
```

### Cloudflare Pages 빌드 실패
- Cloudflare 대시보드에서 빌드 로그 확인
- Ruby 버전 문제 시 환경 변수 추가: `RUBY_VERSION=3.1.0`

### Claude MCP 연결 안됨
- Local REST API 플러그인 활성화 확인
- Claude Desktop 재시작
- MCP 서버 재설치: `npx -y @smithery/cli install mcp-obsidian --client claude`

---

## 다음 단계 체크리스트

### 필수 (오늘 바로 시작)
- [ ] Remotely Save 플러그인 설치 (모든 기기)
- [ ] Dropbox 연동
- [ ] Claude Desktop + MCP 설정
- [ ] Obsidian Git 플러그인 설치 (주 PC)
- [ ] Cloudflare Pages 연결

### 선택 (나중에)
- [ ] 커스텀 도메인 구매
- [ ] GitHub Actions 자동화 (API 비용 고려)
- [ ] Web Analytics 설정
- [ ] 댓글 시스템 (utterances)

---

## 참고 자료

### 공식 문서
- [Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Claude Desktop MCP](https://docs.anthropic.com/claude/docs/model-context-protocol)
- [Obsidian Remotely Save](https://github.com/remotely-save/remotely-save)
- [Jekyll 문서](https://jekyllrb.com/docs/)

### 플러그인
- [MCP-Obsidian GitHub](https://github.com/smithery-ai/mcp-obsidian)
- [Obsidian Git](https://github.com/Vinzent03/obsidian-git)
- [Obsidian Local REST API](https://github.com/coddingtonbear/obsidian-local-rest-api)

### 커뮤니티
- [Obsidian Forum](https://forum.obsidian.md/)
- [Cloudflare Community](https://community.cloudflare.com/)

---

## 예상 일정

### 1일차 (2-3시간)
- ✅ Remotely Save 설정
- ✅ 모든 기기 동기화 테스트
- ✅ Claude Desktop + MCP 연동
- ✅ 정리 기능 테스트

### 2일차 (1-2시간)
- ✅ Obsidian Git 설정
- ✅ Cloudflare Pages 연결
- ✅ 첫 포스트 자동 배포 테스트

### 3일차 (30분)
- ✅ 실제 사용 워크플로우 확립
- ✅ 최적화 및 미세 조정

**총 소요 시간**: 약 4-6시간

---

## 최종 비교: 현재 vs 변경 후

| 항목 | 현재 (GitHub Pages) | 변경 후 (Cloudflare) |
|------|---------------------|----------------------|
| **작성** | PC 로컬만 | 모든 기기 (iOS/Win/Mac/Ubuntu) |
| **동기화** | 수동 git push | 자동 (5분마다) |
| **정리** | 수동 | Claude MCP (명령 1회) |
| **커밋** | 수동 git commit/push | 자동 (10분마다) |
| **배포** | 자동 (GitHub) | 자동 (Cloudflare, 더 빠름) |
| **속도** | 보통 | 빠름 (CDN) |
| **Bandwidth** | 100GB/월 | 무제한 |
| **비용** | 0원 | 0원 |
| **자동화** | 30% | 95% |

---

**작성일**: 2025-10-18
**최종 수정**: 2025-10-18
**구성**: iOS + Windows + Mac + Ubuntu 멀티 플랫폼
**예산**: 월 0원 (완전 무료)
