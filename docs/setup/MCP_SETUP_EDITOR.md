# MCP GitHub 연동 설정 가이드

Claude Desktop의 MCP (Model Context Protocol)를 사용하여 GitHub 저장소에 직접 접근하고 수정할 수 있습니다.

## 목차
- [GitHub Personal Access Token 생성](#1-github-personal-access-token-생성)
- [Claude Desktop MCP 설정](#2-claude-desktop-mcp-설정)
- [테스트](#3-테스트)
- [사용 방법](#4-사용-방법)
- [트러블슈팅](#트러블슈팅)

---

## 1. GitHub Personal Access Token 생성

### 1.1. GitHub 설정 페이지 이동

1. GitHub 로그인
2. [https://github.com/settings/tokens](https://github.com/settings/tokens) 접속
3. **"Personal access tokens"** → **"Tokens (classic)"** 클릭
4. **"Generate new token (classic)"** 클릭

### 1.2. Token 권한 설정

**Note (설명)**: `AutoBlog MCP` (식별용)

**Expiration (만료)**: `No expiration` (만료 없음)

**권한 (Scopes)** - 다음 항목 **모두 체크**:

```
✅ repo (전체 체크)
  ✅ repo:status
  ✅ repo_deployment
  ✅ public_repo
  ✅ repo:invite
  ✅ security_events

✅ workflow
```

### 1.3. Token 생성 및 복사

1. 페이지 하단 **"Generate token"** 클릭
2. **`ghp_`로 시작하는 Token 복사** (한 번만 표시됨!)
3. 안전한 곳에 임시 저장 (다음 단계에서 사용)

---

## 2. Claude Desktop MCP 설정

### 2.1. 설정 파일 위치

**Windows**:
```
%APPDATA%\Claude\claude_desktop_config.json
```

**Mac**:
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Linux**:
```
~/.config/Claude/claude_desktop_config.json
```

### 2.2. 설정 파일 편집

파일을 열고 다음 내용을 추가하세요:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_여기에_복사한_토큰_붙여넣기"
      }
    }
  }
}
```

**⚠️ 주의사항**:
- `ghp_여기에_복사한_토큰_붙여넣기` 부분을 실제 Token으로 교체하세요
- JSON 형식을 정확히 지켜야 합니다 (쉼표, 중괄호 주의)

### 2.3. Claude Desktop 재시작

1. Claude Desktop 완전 종료
2. 다시 시작
3. MCP 연결 확인 (좌측 하단 🔌 아이콘)

---

## 3. 테스트

Claude Desktop에서 다음 명령어로 테스트:

```
1di0t/1di0t.github.io 저장소의 _drafts 폴더에 어떤 파일이 있는지 보여줘
```

**정상 작동 시**:
- Claude가 GitHub API를 통해 파일 목록을 보여줍니다
- 파일 내용을 읽을 수 있습니다

**오류 발생 시**:
- [트러블슈팅](#트러블슈팅) 섹션 참고

---

## 4. 사용 방법

### 4.1. 웹 에디터에서 Draft 작성

```
1. https://your-site.pages.dev/editor 접속
2. GitHub 로그인
3. 러프하게 작성 후 "저장"
4. → GitHub _drafts/ 폴더에 자동 커밋
```

### 4.2. Claude Desktop에서 정리

```
Claude에게:
"1di0t/1di0t.github.io 저장소의 _drafts 폴더에 있는 모든 파일을
읽고, AI로 정리한 후 _posts/2025-10/ 폴더에 커밋해줘"
```

**Claude가 자동으로**:
1. GitHub API로 `_drafts/` 파일 읽기
2. 카테고리, 태그 자동 추천
3. 내용 정리 및 구조화
4. `_posts/YYYY-MM/YYYY-MM-DD-제목.md` 생성
5. Git 커밋 + 푸시

### 4.3. 자동 배포

```
GitHub main 브랜치 업데이트
→ Cloudflare Pages 자동 빌드
→ 1-2분 후 배포 완료
```

---

## 트러블슈팅

### 문제 1: "GitHub MCP 연결 실패"

**원인**: Token 권한 부족 또는 만료

**해결**:
1. Token 권한 재확인 (repo 전체 체크)
2. Token 만료 확인 (재생성 필요 시)
3. `claude_desktop_config.json` 파일 형식 확인

### 문제 2: "파일을 찾을 수 없습니다"

**원인**: 저장소 이름 또는 경로 오류

**해결**:
```
올바른 형식:
✅ "1di0t/1di0t.github.io 저장소의 _drafts 폴더"

잘못된 형식:
❌ "AutoBlog/_drafts"
❌ "_drafts 폴더"
```

### 문제 3: "권한이 없습니다"

**원인**: Private 저장소에 대한 접근 권한 부족

**해결**:
1. Token에 `repo` 권한이 체크되었는지 확인
2. 저장소가 본인 소유인지 확인
3. Token을 재생성하여 다시 설정

### 문제 4: npx 명령을 찾을 수 없음

**원인**: Node.js가 설치되지 않음

**해결**:
1. [https://nodejs.org](https://nodejs.org) 에서 Node.js 설치
2. Claude Desktop 재시작

---

## 보안 권장사항

1. **Token 보관**:
   - Token은 절대 공개하지 마세요
   - Git에 커밋하지 마세요
   - 스크린샷 찍을 때 주의하세요

2. **Token 만료 설정**:
   - 개인 용도: No expiration OK
   - 팀 프로젝트: 90일 권장

3. **Token 삭제** (필요 시):
   - [https://github.com/settings/tokens](https://github.com/settings/tokens)
   - 해당 Token 옆 "Delete" 클릭

---

## 참고

- **MCP 공식 문서**: [https://modelcontextprotocol.io](https://modelcontextprotocol.io)
- **GitHub MCP Server**: [https://github.com/modelcontextprotocol/servers/tree/main/src/github](https://github.com/modelcontextprotocol/servers/tree/main/src/github)
- **Claude Desktop 다운로드**: [https://claude.ai/download](https://claude.ai/download)

---

**완료!** 이제 웹에서 러프하게 작성 → Claude가 자동 정리 → 배포 워크플로우를 사용할 수 있습니다. 🎉
