# 📚 AutoBlog 문서

> 간단하고 빠른 블로그 작성 시스템

---

## 🚀 빠른 시작

1. **[setup/QUICKSTART.md](setup/QUICKSTART.md)** - 5분 안에 시작하기
2. **[setup/MCP_SETUP.md](setup/MCP_SETUP.md)** - Claude Desktop 설정
3. **[setup/WRITING_GUIDE.md](setup/WRITING_GUIDE.md)** - 글 작성 방법

---

## ⚡ 초간단 사용법

```
1. _drafts/에 글 작성
2. Claude Desktop에서:
   "example-draft.md 형식으로 모든 초안 정리해줘"
3. 10분 후 자동 배포
```

**자동화율: 99%** | **입력: 1줄**

---

## 📁 폴더 구조

```
AutoBlog/
├── _drafts/           # 초안 작성
├── _posts/            # 완성된 포스트
├── .claude/
│   └── commands/      # /blog, /blog-batch 명령어
└── docs/
    ├── README.md      # 이 파일
    └── setup/         # 설정 가이드
        ├── QUICKSTART.md
        ├── MCP_SETUP.md
        └── WRITING_GUIDE.md
```

---

## 💡 주요 명령어

### Claude Desktop에서:

```bash
# MCP 설정 도우미
/mcp-setup

# 참조 기반 배치 처리 (NEW!)
"example-draft.md 형식으로 모든 초안 정리해줘"

# 전체 배치 처리
/blog-batch
```

---

## 🎯 특징

- **99% 자동화** - 거의 자동으로 처리
- **한글 카테고리** - 17개 한글 카테고리 자동 추천
- **중복 체크** - 이미 발행된 글은 자동 제외
- **참조 기반** - 원하는 형식으로 일괄 정리

---

## 📝 상세 가이드

모든 상세 내용은 **[setup/](setup/)** 폴더를 참고하세요.

| 문서 | 설명 |
|------|------|
| **QUICKSTART.md** | 설치부터 첫 포스트까지 |
| **MCP_SETUP.md** | Claude Desktop MCP 설정 |
| **WRITING_GUIDE.md** | 글 작성 및 명령어 가이드 |

---

**"The best blog is the one you actually write."** 💪
