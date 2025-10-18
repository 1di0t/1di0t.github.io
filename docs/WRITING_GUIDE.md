# 📝 블로그 작성 가이드

> 간단하고 빠른 블로그 포스트 작성법

---

## 🚀 빠른 시작

### 3단계 워크플로우

```
1️⃣ _drafts/에 러프하게 작성
2️⃣ Claude Desktop "블로그 정리: 파일명"
3️⃣ 10분 후 자동 배포
```

**자동화율: 95%**

---

## 📁 폴더 구조

```
AutoBlog/
├── _drafts/           # 초안 작성
│   └── my-idea.md
├── _posts/            # 완성된 포스트
│   └── 2025-10/
│       └── 2025-10-18-title.md
└── assets/images/     # 이미지 저장
    └── 2025-10-18-image.png
```

---

## ✍️ 글 작성 방법

### 1단계: 러프하게 작성

`_drafts/my-idea.md`:
```markdown
# 오늘 배운 것

- Python 데코레이터
- @property, @staticmethod
- 예제 추가 필요
```

**특징**:
- ✅ 대충 써도 됨
- ✅ 불릿 포인트만 OK
- ✅ 맞춤법 신경 안 써도 됨

---

### 2단계: Claude Desktop으로 정리

**명령어 (1줄)**:
```
"블로그 정리: _drafts/my-idea.md"
```

**Claude가 자동으로**:
- ✅ 카테고리 추천 (17개 중 선택)
- ✅ 태그 생성 (3-5개)
- ✅ Front matter 작성
- ✅ 코드 예시 추가
- ✅ 내용 정리 및 구조화
- ✅ `_posts/YYYY-MM/`에 저장

**결과**:
```markdown
---
layout: post
title: "Python 데코레이터 완벽 가이드"
date: 2025-10-18
category: programming
tags: [python, decorator, oop, advanced]
excerpt: "Python 데코레이터의 개념과 실전 활용법"
---

# Python 데코레이터 완벽 가이드

데코레이터는 함수를 수정하지 않고 기능을 추가할 수 있는...

## @property: Getter/Setter

```python
class User:
    @property
    def name(self):
        return self._name
```

## 결론
...
```

---

## 📋 Front Matter 규칙

### 필수 항목

```yaml
---
layout: post                    # 항상 "post"
title: "포스트 제목"             # 큰따옴표 필수
date: YYYY-MM-DD                # 날짜 형식 엄수
category: programming           # 단수형 (17개 중 1개)
tags: [python, web, tutorial]   # 3-5개 추천
excerpt: "1-2문장 요약"          # 선택
---
```

### 카테고리 (17개)

```
ai, programming, web, database, data-science, data-analysis,
Machine-Learning, MLOps, Development, Git, Mobile,
network, cpp, Project, study, Terms, troubleshooting
```

**자동 추천**: Claude가 내용 분석하여 자동 선택

### 태그 규칙

- 영문 소문자 사용
- 여러 단어는 하이픈: `machine-learning`
- 3-5개 추천
- 예: `[python, django, web, tutorial]`

---

## 🖼️ 이미지 추가

### 1단계: 이미지 저장

```
assets/images/2025-10-18-image-name.png
```

### 2단계: 마크다운에서 참조

```markdown
![설명](/assets/images/2025-10-18-image-name.png)
```

**주의**: 슬래시(`/`)로 시작!

---

## 💻 코드 블록

### 문법 강조

````markdown
```python
def hello():
    print("Hello, World!")
```

```javascript
const hello = () => console.log("Hello");
```

```bash
git add .
git commit -m "Update"
```
````

### 지원 언어

Python, JavaScript, Java, C++, HTML, CSS, Bash, YAML, JSON, SQL 등

---

## 📱 OS별 워크플로우

| OS | 글 작성 | Claude 정리 | 자동 배포 |
|----|---------|-------------|----------|
| **Windows** | ✅ Obsidian | ✅ Claude Desktop | ✅ 자동 |
| **macOS** | ✅ Obsidian | ✅ Claude Desktop | ✅ 자동 |
| **Linux** | ✅ Obsidian | ✅ Claude Desktop | ✅ 자동 |
| **iOS/Android** | ✅ Mobile | ⚠️ PC 필요 | ✅ 자동 |

**모바일**: 러프 작성만, 정리는 PC에서

---

## 🔧 트러블슈팅

### Q1: Front matter 오류

```yaml
# ❌ 잘못된 예시
---
layout: post
title: 제목  # 따옴표 없음
date: 25-10-18  # 형식 틀림
category: unknown  # 존재하지 않는 카테고리
---

# ✅ 올바른 예시
---
layout: post
title: "제목"
date: 2025-10-18
category: programming
tags: [python]
---
```

### Q2: 포스트가 안 보임

**해결**:
1. 날짜 확인 (미래 날짜는 표시 안 됨)
2. 파일 위치: `_posts/YYYY-MM/YYYY-MM-DD-title.md`
3. Front matter에 `layout: post` 있는지 확인
4. 캐시 새로고침: `Ctrl+F5`

### Q3: 이미지가 안 보임

```markdown
# ✅ 올바른 경로
![설명](/assets/images/image.png)

# ❌ 잘못된 경로
![설명](assets/images/image.png)  # 슬래시 없음
```

---

## 💡 작성 팁

### Tip 1: 효율적인 루틴

```
1. 아이디어 메모 (모바일/PC)
   └─> _drafts/

2. PC에서 정리
   └─> Claude Desktop "블로그 정리: 파일명"

3. 자동 배포
   └─> 10분 후 확인
```

### Tip 2: 카테고리 선택 가이드

| 카테고리 | 사용 예시 |
|---------|----------|
| **ai** | 딥러닝, 머신러닝 이론 |
| **programming** | 프로그래밍 언어, 알고리즘 |
| **web** | 웹 개발, API |
| **database** | SQL, NoSQL |
| **troubleshooting** | 에러 해결, 디버깅 |
| **Project** | 프로젝트 소개 |

### Tip 3: 태그 선택 가이드

- **구체적으로**: `python` > `programming`
- **관련성**: 포스트 내용과 직접 관련
- **검색성**: 다른 사람이 검색할 만한 키워드
- **일관성**: 기존 태그 재사용

---

## 🎓 실전 예시

### 시나리오: 모바일 → PC

**1. 아침 (지하철, iPhone)**
```markdown
# _drafts/docker-tips.md

Docker Compose 팁
1. 환경변수 .env 분리
2. depends_on 순서
3. volumes 경로
```

**2. 저녁 (집, PC)**
```
Claude Desktop:
"블로그 정리: _drafts/docker-tips.md"
```

**3. 10분 후**
- ✅ 자동 커밋
- ✅ 자동 빌드
- ✅ https://1di0t.github.io 에서 확인!

---

## ✅ 체크리스트

### 글 작성 시
- [ ] `_drafts/`에 러프하게 작성
- [ ] Claude Desktop "블로그 정리: 파일명"
- [ ] 카테고리/태그 자동 추천 확인
- [ ] `_posts/YYYY-MM/` 저장 확인

### 배포 확인
- [ ] 10분 후 Obsidian Git 커밋
- [ ] GitHub Actions 빌드 성공
- [ ] 블로그에서 포스트 확인
- [ ] 카테고리/태그 페이지 확인

---

## 📚 상세 가이드

| 문서 | 내용 |
|------|------|
| **[QUICKSTART.md](QUICKSTART.md)** | 5분 시작 가이드 |
| **[CATEGORY_AUTO.md](CATEGORY_AUTO.md)** | 카테고리 자동화 |
| **[DEPLOYMENT_SIMPLE.md](DEPLOYMENT_SIMPLE.md)** | 배포 가이드 |

---

**"The best blog is the one you actually write."** 💪
