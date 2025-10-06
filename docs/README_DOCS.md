# 📚 문서 가이드

> 이 폴더(`docs/`)에는 블로그 운영에 필요한 모든 가이드 문서가 있습니다.

---

## 🚀 빠른 시작

### 처음 시작하는 경우

1. **[AI_WORKFLOW.md](AI_WORKFLOW.md)** 읽기 - Claude Code로 쉽게 글쓰기
2. **[drafts/TEMPLATE.md](drafts/TEMPLATE.md)** 복사하여 첫 초안 작성
3. **Claude Code에게 초안 전달** - 자동으로 완성된 포스트 생성

### 직접 작성하고 싶은 경우

1. **[POST_GUIDE.md](POST_GUIDE.md)** 읽기 - Jekyll 포스트 작성법
2. `_posts/YYYY-MM-DD-title.md` 파일 생성
3. Front Matter + Markdown 본문 작성

---

## 📖 문서 구조

### 1. 워크플로우 가이드

#### [AI_WORKFLOW.md](AI_WORKFLOW.md)
- **목적**: Claude Code를 활용한 효율적인 글 작성 프로세스
- **대상**: 빠르게 블로그 포스트를 작성하고 싶은 사람
- **내용**:
  - 5단계 자동화 워크플로우 (초안 → Claude Code → 완성글 자동 저장 → Git 업로드)
  - Claude Code가 자동으로 처리하는 작업들
  - FAQ 및 팁

#### [POST_GUIDE.md](POST_GUIDE.md)
- **목적**: Jekyll 블로그 포스트 작성 완벽 가이드
- **대상**: 블로그를 처음 시작하는 사람, Jekyll 사용법을 배우고 싶은 사람
- **내용**:
  - Front Matter 작성법
  - Markdown 문법
  - 이미지 추가 방법
  - Git 업로드 및 배포
  - 양질의 포스트 작성 팁
  - FAQ

---

### 2. 템플릿 및 도구

#### [drafts/TEMPLATE.md](drafts/TEMPLATE.md)
- **목적**: 초안 작성 템플릿
- **사용법**: 이 파일을 복사하여 새 초안 작성
- **포함 내용**:
  - 주제, 독자, 카테고리 정의
  - 핵심 내용 구조화
  - 코드 예제 메모
  - 스타일 요구사항

#### [AI_PROMPT.md](AI_PROMPT.md)
- **목적**: Claude Code가 글 작성 시 참고하는 가이드라인
- **사용법**: Claude Code가 자동으로 이 가이드라인 적용
- **특징**:
  - Jekyll Front Matter 형식 지정
  - Guide.txt 기반 품질 가이드라인
  - 제목 작성 가이드
  - 체크리스트 포함
- **참고**: 사용자가 직접 볼 필요는 없지만, 커스터마이징 가능

---

### 3. 품질 가이드

#### [Guide.txt](Guide.txt)
- **목적**: 양질의 기술 블로그 글쓰기 가이드라인
- **대상**: 좋은 글을 쓰고 싶은 모든 사람
- **내용**:
  - 3단계 글쓰기 프레임워크
  - 독자 정의 및 주제 선정
  - 쉬운 설명 방법 (비유, 예제)
  - 가독성 높이기
  - 매력적인 제목 작성법

---

### 4. 기술 문서

#### [Flow.md](Flow.md)
- **목적**: 블로그 시스템 작동 원리 상세 설명
- **대상**: 시스템 구조를 이해하고 싶은 사람
- **내용**:
  - Jekyll + Tailwind CSS 아키텍처
  - 빌드 프로세스
  - 배포 자동화 (GitHub Actions)
  - 주요 기능 동작 원리
  - 디렉토리 구조

#### [BLOG_REQUIREMENTS.md](BLOG_REQUIREMENTS.md)
- **목적**: 블로그 요구사항 및 명세
- **내용**: 블로그 기능 요구사항, 디자인 명세

---

## 🗺 문서 간 관계도

```
시작
 │
 ├─ 빠르게 글쓰기? → AI_WORKFLOW.md
 │                      ↓
 │                  drafts/TEMPLATE.md (초안 작성)
 │                      ↓
 │                  Claude Code에게 전달
 │                      ↓
 │                  (Claude Code가 AI_PROMPT.md 자동 적용)
 │                      ↓
 │                  _posts/에 완성된 포스트 자동 저장
 │                      ↓
 │                  Git 커밋 & 푸시
 │
 └─ 직접 작성? → POST_GUIDE.md
                     ↓
                 _posts/에 파일 생성
                     ↓
                 Git 업로드

공통:
  - Guide.txt: 품질 향상 팁
  - Flow.md: 시스템 이해
```

---

## 📝 사용 시나리오

### 시나리오 1: "빠르게 첫 포스트 올리고 싶어요"

1. [AI_WORKFLOW.md](AI_WORKFLOW.md) 1-2단계까지 읽기
2. [drafts/TEMPLATE.md](drafts/TEMPLATE.md) 복사
3. 아이디어를 간단히 메모 (5분)
4. Claude Code에게 초안 전달: "이 초안으로 블로그 포스트 작성해줘"
5. 자동 생성된 파일 확인
6. Claude Code에게 요청: "커밋하고 푸시해줘"

**소요 시간**: 약 10-15분

### 시나리오 2: "Jekyll을 제대로 배우고 싶어요"

1. [POST_GUIDE.md](POST_GUIDE.md) 전체 읽기
2. [Flow.md](Flow.md)에서 시스템 원리 이해
3. 직접 포스트 작성 실습
4. [Guide.txt](Guide.txt)로 글쓰기 품질 향상

### 시나리오 3: "글을 더 잘 쓰고 싶어요"

1. [Guide.txt](Guide.txt) 읽기
2. [POST_GUIDE.md](POST_GUIDE.md)의 "양질의 포스트 작성하기" 섹션 참고
3. [AI_PROMPT.md](AI_PROMPT.md)의 가이드라인 활용

---

## 🔄 문서 업데이트 시

모든 문서는 상호 연결되어 있습니다. 하나를 수정할 때 다음 문서들도 확인하세요:

- **AI_WORKFLOW.md** 수정 시 → AI_PROMPT.md, POST_GUIDE.md 확인
- **POST_GUIDE.md** 수정 시 → AI_WORKFLOW.md, README.md 확인
- **Guide.txt** 수정 시 → AI_PROMPT.md, POST_GUIDE.md 확인
- **Flow.md** 수정 시 → README.md 확인

---

## 📂 폴더 구조

```
docs/
├── README_DOCS.md          # 이 파일 (문서 안내)
├── AI_WORKFLOW.md          # AI 글 작성 워크플로우
├── POST_GUIDE.md           # 포스트 작성 완벽 가이드
├── AI_PROMPT.md            # AI 프롬프트 템플릿
├── Guide.txt               # 글쓰기 품질 가이드라인
├── Flow.md                 # 시스템 작동 원리
├── BLOG_REQUIREMENTS.md    # 블로그 요구사항
└── drafts/                 # 초안 폴더 (Git 제외)
    └── TEMPLATE.md         # 초안 템플릿
```

---

## ⚠️ 주의사항

### Git 제외 항목

다음 파일/폴더는 `.gitignore`에 포함되어 원격 저장소에 올라가지 않습니다:

- `docs/` 폴더 전체 (모든 가이드 문서)
- `docs/drafts/` (초안 작업 파일)

**이유**: 개인 작업 문서이므로 블로그 배포에 불필요

### 발행되는 파일

- `_posts/YYYY-MM-DD-title.md` - 완성된 포스트만 Git에 추가하고 배포됩니다

---

## 🆘 도움이 필요하면

1. **문서 읽기**: 해당 섹션의 문서를 먼저 읽어보세요
2. **FAQ 확인**: 각 가이드의 FAQ 섹션 참고
3. **예시 보기**: POST_GUIDE.md의 템플릿 섹션 참고

---

**Happy Blogging! 🎉**

문서에 대한 피드백이나 개선 제안은 언제든 환영합니다!
