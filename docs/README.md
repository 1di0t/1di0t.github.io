# 📚 AutoBlog 가이드 문서

> 간단하고 빠른 블로그 작성을 위한 모든 가이드

---

## 🎯 시작하기

### 처음 사용하는 경우

1. **[QUICKSTART.md](QUICKSTART.md)** (5분) ⭐
   - 3단계 워크플로우
   - 설치 가이드 (Obsidian + Claude Desktop)
   - 첫 포스트 작성

---

## 📖 주요 가이드

### 🤖 카테고리 자동화
**[CATEGORY_AUTO.md](CATEGORY_AUTO.md)**
- Claude가 자동으로 카테고리 추천
- 17개 카테고리 + 키워드 매핑
- 태그 자동 생성
- **프롬프트 작성 시간 90% 감소**

**핵심 명령어**:
```
"블로그 정리: _drafts/파일명.md"
```

---

### 📦 배포하기
**[DEPLOYMENT_SIMPLE.md](DEPLOYMENT_SIMPLE.md)**
- 최초 배포 방법 (git push)
- 자동 배포 확인 (GitHub Actions)
- 트러블슈팅 3가지

**자동화율**: 95% (10분마다 자동 커밋)

---

### ✍️ 글 작성하기
**[WRITING_GUIDE.md](WRITING_GUIDE.md)**
- 러프하게 작성하는 법
- Front Matter 규칙
- 이미지/코드 블록 추가
- OS별 워크플로우

**핵심**: 대충 써도 Claude가 정리!

---

## 🗂️ 파일 구조

```
AutoBlog/
├── _data/
│   └── categories.yml          # 카테고리 정의 (17개)
├── .claude/
│   └── prompts/
│       └── blog-format.md      # 자동 정리 프롬프트
├── _drafts/                    # 초안 작성
├── _posts/                     # 완성된 포스트
│   └── YYYY-MM/
│       └── YYYY-MM-DD-title.md
└── docs/
    ├── README.md               # 이 파일
    ├── QUICKSTART.md           # 5분 시작 가이드
    ├── CATEGORY_AUTO.md        # 카테고리 자동화
    ├── DEPLOYMENT_SIMPLE.md    # 배포 가이드
    └── WRITING_GUIDE.md        # 작성 가이드
```

---

## 🚀 3단계 워크플로우

```
1️⃣ _drafts/에 러프하게 작성
    ↓
2️⃣ Claude Desktop "블로그 정리: 파일명"
    ↓ (카테고리/태그 자동 추천)
3️⃣ 10분 후 자동 배포
    ↓
✅ https://1di0t.github.io
```

**자동화율: 95%**

---

## 📊 카테고리 (17개)

| 카테고리 | 설명 |
|---------|------|
| **ai** | 인공지능, 머신러닝, 딥러닝 |
| **programming** | 프로그래밍 언어, 알고리즘 |
| **web** | 웹 개발, API |
| **database** | 데이터베이스 |
| **data-science** | 데이터 사이언스 |
| **data-analysis** | 데이터 분석 |
| **Machine-Learning** | 머신러닝 모델 |
| **MLOps** | ML 운영 |
| **Development** | 소프트웨어 개발 |
| **Git** | Git 버전 관리 |
| **Mobile** | 모바일 앱 |
| **network** | 네트워크 |
| **cpp** | C++ |
| **Project** | 프로젝트 소개 |
| **study** | 학습 내용 |
| **Terms** | 개발 용어 |
| **troubleshooting** | 에러 해결 |

**자동 추천**: Claude가 내용 분석하여 선택

---

## ⚡ 빠른 참고

### 주요 명령어

```bash
# 블로그 정리 (카테고리 자동 추천)
"블로그 정리: _drafts/파일명.md"

# 로컬 서버 실행
npm run dev

# 수동 배포
git add . && git commit -m "Add: 포스트" && git push
```

### 주요 URL

| 항목 | URL |
|------|-----|
| **블로그** | https://1di0t.github.io |
| **GitHub Actions** | https://github.com/1di0t/1di0t.github.io/actions |
| **저장소** | https://github.com/1di0t/1di0t.github.io |

---

## 🔧 트러블슈팅

| 문제 | 해결 방법 |
|------|----------|
| **Obsidian Git 안 됨** | Settings → Interval: 10 확인 |
| **빌드 실패** | Front matter 문법 확인 |
| **포스트 안 보임** | 날짜/파일 위치 확인 |
| **이미지 안 보임** | 경로 `/assets/images/` 확인 |

자세한 내용은 각 가이드 문서 참고

---

## 📝 문서 버전

| 문서 | 줄 수 | 난이도 |
|------|------|--------|
| **QUICKSTART.md** | ~200줄 | ⭐ 초급 |
| **CATEGORY_AUTO.md** | ~250줄 | ⭐⭐ 중급 |
| **DEPLOYMENT_SIMPLE.md** | ~200줄 | ⭐ 초급 |
| **WRITING_GUIDE.md** | ~320줄 | ⭐⭐ 중급 |

**모든 가이드가 간단하고 핵심만!**

---

## 💡 Pro Tips

1. **모바일에서 초안 작성** → PC에서 정리
2. **"블로그 정리: 파일명"** 명령어 기억
3. **카테고리는 Claude에게 맡기기**
4. **10분 대기 = 자동 배포**

---

## 🎉 완료!

이제 **5초**면 블로그 포스트 정리 완료!

**"The best blog is the one you actually write."** 💪

---

**작성일**: 2025-10-18
**상태**: ✅ 완료 (카테고리 자동화 + 간단한 가이드)
