# 🔌 MCP 설정 가이드

> Claude Desktop에서 Obsidian vault 접근하기

---

## 📖 MCP란?

**Model Context Protocol (MCP)**는 Claude Desktop이 로컬 파일 시스템에 안전하게 접근할 수 있도록 하는 프로토콜입니다.

MCP를 설정하면:
- ✅ Claude Desktop에서 `_drafts/` 폴더의 파일 직접 읽기
- ✅ `_posts/` 폴더에 정리된 파일 직접 저장
- ✅ `/blog`, `/blog-batch` 명령어 사용 가능
- ✅ 긴 프롬프트 입력 불필요

---

## 🚀 빠른 설정 (3단계)

### 1단계: Node.js 확인 (최초 1회)

터미널/CMD에서:
```bash
npx --version
```

**출력 예시**: `10.2.3` (버전 번호)

**없으면**: [Node.js 설치](https://nodejs.org/) → LTS 버전 권장

---

### 2단계: 설정 파일 생성

#### Windows

1. **Windows 탐색기 주소창**에 입력:
   ```
   %APPDATA%\Claude
   ```

2. **`claude_desktop_config.json` 파일 생성** (없으면)

3. **내용 입력**:
   ```json
   {
     "mcpServers": {
       "filesystem": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-filesystem", "E:\\self\\AutoBlog"]
       }
     }
   }
   ```

4. **경로 수정**:
   - `E:\\self\\AutoBlog`를 실제 프로젝트 경로로 변경
   - **중요**: 백슬래시 두 번(`\\`) 사용
   - 예시:
     - `C:\Users\myuser\Blog` → `C:\\Users\\myuser\\Blog`
     - `D:\Projects\AutoBlog` → `D:\\Projects\\AutoBlog`

---

#### macOS

1. **터미널**에서:
   ```bash
   nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

2. **내용 입력**:
   ```json
   {
     "mcpServers": {
       "filesystem": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/사용자명/Projects/AutoBlog"]
       }
     }
   }
   ```

3. **경로 수정**:
   - `/Users/사용자명/Projects/AutoBlog`를 실제 경로로 변경
   - 슬래시 하나(`/`) 사용

4. **저장**:
   - `Ctrl + O` → `Enter` → `Ctrl + X`

---

#### Linux

1. **터미널**에서:
   ```bash
   mkdir -p ~/.config/Claude
   nano ~/.config/Claude/claude_desktop_config.json
   ```

2. **내용 입력**:
   ```json
   {
     "mcpServers": {
       "filesystem": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/사용자명/AutoBlog"]
       }
     }
   }
   ```

3. **경로 수정** → 실제 프로젝트 경로

4. **저장**: `Ctrl + O` → `Enter` → `Ctrl + X`

---

### 3단계: Claude Desktop 재시작

**완전 종료 후 재실행**:
- Windows: 시스템 트레이에서 종료
- macOS: `Cmd + Q`
- Linux: `killall claude` 후 재실행

---

## ✅ 설정 확인

### 테스트 명령어

Claude Desktop에서 입력:

```
"_drafts 폴더의 파일 목록 보여줘"
```

**성공 시**:
```
✅ example-draft.md
✅ (다른 파일들...)
```

**실패 시**:
```
❌ "Permission denied" 또는 "File not found"
→ 아래 "문제 해결" 참고
```

---

## 🎯 이제 사용 가능한 명령어

### `/blog` - 단일 파일 정리
```
/blog docker-tips.md
```

Claude가 자동으로:
1. `_drafts/docker-tips.md` 읽기
2. 카테고리 자동 추천
3. 태그 생성 (3-5개)
4. Front Matter 작성
5. 내용 정리
6. `_posts/2025-10/` 저장

---

### `/blog-batch` - 배치 처리
```
/blog-batch
```

Claude가 자동으로:
1. `_drafts/` 폴더 스캔
2. 모든 `.md` 파일 발견 (최대 3개)
3. 각 파일 일괄 처리
4. 진행 상황 리포트 생성

---

## 🔧 문제 해결

### Q1: "npx: command not found"

**원인**: Node.js 미설치

**해결**:
1. [Node.js 설치](https://nodejs.org/)
2. 설치 후 확인:
   ```bash
   npx --version
   ```
3. Claude Desktop 재시작

---

### Q2: "Permission denied"

**원인**: 경로 오류 또는 권한 부족

**해결**:
1. **경로 확인**:
   - Windows: 백슬래시 두 번 (`\\`)
   - macOS/Linux: 슬래시 하나 (`/`)
2. **절대 경로 사용**:
   - ✅ `C:\\Users\\myuser\\Blog`
   - ❌ `..\\Blog` (상대 경로 안 됨)
3. **폴더 권한 확인**:
   - 폴더에 읽기/쓰기 권한 있는지 확인

---

### Q3: JSON 문법 오류

**증상**: Claude Desktop 실행 안 됨

**해결**:
1. JSON 문법 검증: https://jsonlint.com/
2. 확인 사항:
   - `{` `}` 괄호 짝 맞는지
   - 쉼표(`,`) 위치 확인
   - 마지막 항목 뒤 쉼표 없어야 함

**올바른 예시**:
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "경로"]
    }
  }
}
```

---

### Q4: 재시작 후에도 안 됨

**해결 순서**:
1. Claude Desktop **완전 종료**:
   - Windows: 작업 관리자에서 "Claude" 프로세스 종료
   - macOS: Activity Monitor에서 Claude 강제 종료
   - Linux: `killall -9 claude`

2. 설정 파일 경로 재확인:
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Linux: `~/.config/Claude/claude_desktop_config.json`

3. **로그 확인** (고급):
   - Windows: `%APPDATA%\Claude\logs`
   - macOS: `~/Library/Logs/Claude`
   - Linux: `~/.config/Claude/logs`

---

## 📚 다음 단계

MCP 설정이 완료되었으면:

1. **[QUICKSTART.md](QUICKSTART.md)** - 블로그 빠른 시작 가이드
2. **[WRITING_GUIDE.md](WRITING_GUIDE.md)** - 글 작성 방법

Claude Desktop에서:
```
/blog-batch
```

한 번의 명령으로 모든 초안 정리 완료! 🎉

---

## 🔐 보안

MCP는 **로컬에서만** 작동합니다:
- ✅ 파일이 인터넷으로 전송되지 않음
- ✅ Claude MAX 구독으로 무료 사용
- ✅ 지정한 폴더만 접근 가능
- ✅ 다른 폴더는 접근 불가

---

**설정 완료 시간: 5분 이내** ⏱️
**자동화율: 95% → 99%** 🚀
