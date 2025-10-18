# MCP 설정 도우미

이 명령어는 Claude Desktop에서 Model Context Protocol (MCP)를 설정하여 Obsidian vault에 접근할 수 있도록 도와줍니다.

## 🎯 목적

MCP를 설정하면 Claude Desktop이 다음 작업을 할 수 있습니다:
- `_drafts/` 폴더의 초안 파일 읽기
- `_data/categories.yml` 파일 읽기 (카테고리 자동 추천)
- `_posts/YYYY-MM/` 폴더에 정리된 파일 저장하기
- 파일 시스템 전체 탐색 (프로젝트 범위 내)

## 📋 설정 단계

### Windows 사용자

1. **설정 파일 위치 확인**
   ```
   %APPDATA%\Claude\claude_desktop_config.json
   ```
   전체 경로 예시:
   ```
   C:\Users\{사용자명}\AppData\Roaming\Claude\claude_desktop_config.json
   ```

2. **폴더 열기**
   - Windows 탐색기 주소창에 `%APPDATA%\Claude` 입력
   - 폴더가 없으면 생성

3. **설정 파일 생성 또는 편집**

   **새로 생성하는 경우**:
   `claude_desktop_config.json` 파일을 만들고 다음 내용 입력:
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

   **이미 있는 경우**:
   기존 파일을 열고 `mcpServers` 섹션에 `filesystem` 추가:
   ```json
   {
     "mcpServers": {
       "existing-server": { ... },
       "filesystem": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-filesystem", "E:\\self\\AutoBlog"]
       }
     }
   }
   ```

4. **경로 수정**
   - `E:\\self\\AutoBlog`를 실제 프로젝트 경로로 변경
   - **중요**: 백슬래시를 두 번(`\\`) 입력해야 함
   - 예시:
     - `C:\Users\myuser\Projects\AutoBlog` → `C:\\Users\\myuser\\Projects\\AutoBlog`
     - `D:\Blog\AutoBlog` → `D:\\Blog\\AutoBlog`

5. **Claude Desktop 재시작**
   - Claude Desktop 완전히 종료 (시스템 트레이에서도 종료)
   - 다시 실행

---

### macOS 사용자

1. **설정 파일 위치 확인**
   ```
   ~/Library/Application Support/Claude/claude_desktop_config.json
   ```

2. **터미널에서 폴더 열기**
   ```bash
   open ~/Library/Application\ Support/Claude
   ```

3. **설정 파일 생성 또는 편집**

   터미널에서:
   ```bash
   nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

   다음 내용 입력:
   ```json
   {
     "mcpServers": {
       "filesystem": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/{사용자명}/Projects/AutoBlog"]
       }
     }
   }
   ```

4. **경로 수정**
   - `/Users/{사용자명}/Projects/AutoBlog`를 실제 경로로 변경
   - macOS는 백슬래시 하나(`/`)만 사용

5. **저장 및 종료**
   - `Ctrl + O` (저장)
   - `Enter` (확인)
   - `Ctrl + X` (종료)

6. **Claude Desktop 재시작**

---

### Linux 사용자

1. **설정 파일 위치 확인**
   ```
   ~/.config/Claude/claude_desktop_config.json
   ```

2. **설정 파일 생성 또는 편집**
   ```bash
   mkdir -p ~/.config/Claude
   nano ~/.config/Claude/claude_desktop_config.json
   ```

   다음 내용 입력:
   ```json
   {
     "mcpServers": {
       "filesystem": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/{사용자명}/Projects/AutoBlog"]
       }
     }
   }
   ```

3. **경로 수정**
   - `/home/{사용자명}/Projects/AutoBlog`를 실제 경로로 변경

4. **Claude Desktop 재시작**

---

## ✅ 설정 확인

Claude Desktop에서 다음 명령어로 테스트:

```
"E:\self\AutoBlog\_drafts 폴더를 읽어줘"
```

또는:

```
"List files in the _drafts directory"
```

**성공하면**:
```
✅ _drafts/ 폴더의 파일 목록이 표시됩니다.
```

**실패하면**:
```
❌ "Permission denied" 또는 "File not found" 에러
→ 경로 확인 및 Claude Desktop 재시작
```

---

## 🔧 문제 해결

### Q1: "npx: command not found"
**원인**: Node.js가 설치되지 않음

**해결**:
1. Node.js 설치: https://nodejs.org/
2. 설치 후 터미널/CMD에서 확인:
   ```bash
   npx --version
   ```
3. Claude Desktop 재시작

---

### Q2: 파일을 읽을 수 없음
**원인**: 경로 오류 또는 권한 문제

**해결**:
1. 경로 확인:
   - Windows: 백슬래시 두 번(`\\`) 사용
   - macOS/Linux: 슬래시 하나(`/`) 사용
2. 절대 경로 사용 (상대 경로 안 됨)
3. 폴더 권한 확인

---

### Q3: Claude Desktop 재시작 후에도 안 됨
**해결**:
1. Claude Desktop 완전 종료:
   - Windows: 시스템 트레이에서 종료
   - macOS: Cmd+Q
   - Linux: killall claude
2. 설정 파일 JSON 문법 확인:
   - https://jsonlint.com/ 에서 검증
3. 로그 확인 (고급):
   - Windows: `%APPDATA%\Claude\logs`
   - macOS: `~/Library/Logs/Claude`

---

## 📚 추가 정보

설정이 완료되면 다음 명령어를 사용할 수 있습니다:

- `/blog 파일명.md` - 단일 파일 정리
- `/blog-batch` - 모든 초안 일괄 정리

자세한 사용법은:
- [docs/QUICKSTART.md](../../../docs/QUICKSTART.md)
- [docs/WRITING_GUIDE.md](../../../docs/WRITING_GUIDE.md)

---

**MCP 설정이 완료되면 블로그 작성이 훨씬 편해집니다!** 🚀
