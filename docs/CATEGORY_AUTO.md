# 🤖 카테고리 자동화 가이드

> Claude가 내용을 분석하여 자동으로 카테고리와 태그를 추천합니다

---

## 🎯 핵심 기능

### 기존 방식 (수동)
```
1. 글 작성
2. 카테고리 17개 중 어떤 걸 선택할지 고민
3. 태그 5개를 어떻게 만들지 고민
4. Front matter에 수동 입력
5. Claude에게 긴 프롬프트 작성
   "_drafts/xxx.md를 블로그 포스트로 정리해줘.
   요구사항:
   - 제목 명확하게
   - Front matter 포함 (layout, title, date, categories, tags)
   - 카테고리: programming  ← 수동
   - 태그: python, decorator, oop  ← 수동
   - 코드 예시 추가
   - 초보자도 이해할 수 있게"
```

**문제점**:
- ❌ 매번 카테고리 고민
- ❌ 태그 생성 고민
- ❌ 긴 프롬프트 작성
- ❌ 시간 낭비

---

### 개선 방식 (자동) ⭐

```
1. 글 작성 (러프하게)
2. Claude에게 한 줄 명령
   "블로그 정리: _drafts/xxx.md"
3. 끝!
```

**장점**:
- ✅ 카테고리 자동 추천 (17개 중 최적 선택)
- ✅ 태그 자동 생성 (3-5개)
- ✅ Front matter 자동 작성
- ✅ 프롬프트 작성 시간 90% 감소

---

## 🔍 작동 원리

### 1단계: 카테고리 데이터 파일 (`_data/categories.yml`)

각 카테고리별로 **대표 키워드**가 정의되어 있습니다:

```yaml
categories:
  - id: ai
    name: "AI"
    keywords:
      - ai
      - machine learning
      - deep learning
      - neural network
      - tensorflow
      - pytorch
      - nlp

  - id: programming
    name: "Programming"
    keywords:
      - python
      - javascript
      - algorithm
      - function
      - class
      - coding

  # ... 17개 카테고리
```

### 2단계: Claude 자동 분석

사용자가 "블로그 정리: 파일명"을 입력하면:

1. **파일 읽기**: `_drafts/` 폴더에서 파일 내용 읽기
2. **키워드 추출**: 포스트 내용에서 핵심 키워드 추출
3. **카테고리 매칭**:
   - `_data/categories.yml`의 키워드와 비교
   - 가장 많이 매칭되는 카테고리 선택
4. **태그 생성**: 포스트 핵심 키워드 3-5개 추출
5. **Front Matter 작성**: 자동으로 완성
6. **저장**: `_posts/YYYY-MM/` 폴더에 저장

### 3단계: 결과 출력

```markdown
✅ 카테고리 추천: programming (키워드 매칭: python, function, class)
✅ 태그 생성: [python, decorator, oop, advanced]
✅ 파일 저장: _posts/2025-10/2025-10-18-python-decorator.md
```

---

## 📊 사용 가능한 카테고리 (17개)

| 카테고리 | 대표 키워드 | 사용 예시 |
|---------|-----------|----------|
| **ai** | machine learning, deep learning, nlp | 딥러닝 모델, AI 알고리즘 |
| **programming** | python, javascript, algorithm | 프로그래밍 언어, 코딩 팁 |
| **web** | html, css, react, django, api | 웹 개발, 프론트/백엔드 |
| **database** | sql, mysql, mongodb | 데이터베이스 설계, 쿼리 |
| **data-science** | pandas, numpy, visualization | 데이터 분석, 시각화 |
| **data-analysis** | eda, preprocessing, analytics | 데이터 분석 실무 |
| **Machine-Learning** | classification, regression, model | 머신러닝 알고리즘 |
| **MLOps** | deployment, pipeline, docker | ML 배포, 운영 |
| **Development** | software, architecture, testing | 소프트웨어 개발 |
| **Git** | github, commit, branch | Git 버전 관리 |
| **Mobile** | android, ios, flutter | 모바일 앱 개발 |
| **network** | tcp, http, socket | 네트워크, 통신 |
| **cpp** | c++, pointer, memory | C++ 프로그래밍 |
| **Project** | portfolio, case study | 프로젝트 소개 |
| **study** | learning, tutorial, concept | 학습 내용 정리 |
| **Terms** | definition, glossary | 개발 용어 정리 |
| **troubleshooting** | error, bug, fix, debug | 에러 해결, 디버깅 |

---

## 💡 실전 예시

### 예시 1: Python 포스트

**사용자 작성** (`_drafts/python-tips.md`):
```markdown
# Python 팁

- 리스트 컴프리헨션
- 람다 함수
- 데코레이터
```

**Claude 명령**:
```
"블로그 정리: _drafts/python-tips.md"
```

**Claude 분석**:
- 키워드: `python`, `list`, `lambda`, `function`, `decorator`
- 매칭: `programming` (5개), `ai` (0개), `web` (0개)
- **선택**: `programming`

**결과**:
```yaml
---
category: programming
tags: [python, list-comprehension, lambda, decorator]
---
```

---

### 예시 2: 머신러닝 포스트

**사용자 작성** (`_drafts/ml-model.md`):
```markdown
# 모델 학습

- 데이터 전처리
- 모델 훈련
- 평가 지표
```

**Claude 명령**:
```
"블로그 정리: _drafts/ml-model.md"
```

**Claude 분석**:
- 키워드: `model`, `training`, `preprocessing`, `evaluation`
- 매칭: `Machine-Learning` (4개), `ai` (3개), `data-science` (2개)
- **선택**: `Machine-Learning`

**결과**:
```yaml
---
category: Machine-Learning
tags: [machine-learning, model-training, preprocessing, evaluation]
---
```

---

### 예시 3: 에러 해결 포스트

**사용자 작성** (`_drafts/fix-error.md`):
```markdown
# 에러 해결

- ModuleNotFoundError
- pip install 문제
- 해결 방법
```

**Claude 명령**:
```
"블로그 정리: _drafts/fix-error.md"
```

**Claude 분석**:
- 키워드: `error`, `fix`, `problem`, `solution`
- 매칭: `troubleshooting` (4개), `programming` (1개)
- **선택**: `troubleshooting`

**결과**:
```yaml
---
category: troubleshooting
tags: [error, python, module-not-found, fix]
---
```

---

## 🔧 커스터마이징

### 새 카테고리 추가

`_data/categories.yml`에 추가:

```yaml
categories:
  - id: blockchain
    name: "Blockchain"
    description: "블록체인, 암호화폐"
    keywords:
      - blockchain
      - cryptocurrency
      - bitcoin
      - ethereum
      - smart contract
      - web3
```

### 키워드 수정

기존 카테고리의 키워드를 추가/수정:

```yaml
  - id: ai
    name: "AI"
    keywords:
      - ai
      - machine learning
      - deep learning
      - chatgpt  # 추가
      - llm  # 추가
```

---

## 📝 사용 팁

### Tip 1: 명확한 키워드 사용

글 작성 시 카테고리를 잘 매칭하려면 명확한 키워드를 포함:

```markdown
# ❌ 애매한 작성
오늘 배운 거 정리
- 어떤 기술
- 어떤 방법

# ✅ 명확한 작성
Python 데코레이터 정리
- @property 사용법
- @staticmethod 예시
```

### Tip 2: 카테고리 힌트 제공

특정 카테고리를 원하면 힌트를 줄 수 있습니다:

```
"블로그 정리: _drafts/my-post.md, 카테고리는 web으로"
```

### Tip 3: 여러 카테고리 후보

Claude가 여러 카테고리를 제안할 때:
- 가장 구체적인 카테고리 선택
- 예: `Machine-Learning` > `ai` > `programming`

---

## ❓ FAQ

### Q1: 카테고리 매칭이 잘못됐을 때?

**A**: 수동으로 수정 가능합니다.
```yaml
# Claude가 선택한 카테고리
category: programming

# 수동으로 변경
category: web
```

또는 `_data/categories.yml`의 키워드를 조정하세요.

---

### Q2: 새 카테고리를 추천받으려면?

**A**: 매칭률이 30% 미만이면 Claude가 자동으로 새 카테고리를 제안합니다.

```
⚠️ 기존 카테고리 매칭률이 낮습니다 (15%)
💡 새 카테고리 제안: "blockchain"
   키워드: bitcoin, ethereum, smart-contract
```

---

### Q3: 태그는 어떻게 생성되나?

**A**: 포스트 내용에서 자동으로 핵심 키워드를 추출합니다.
- 빈도가 높은 단어
- 기술 관련 용어
- 영문 소문자 변환
- 3-5개 선택

---

## 🎯 효과

### Before (수동)
- 카테고리 선택: 30초
- 태그 생성: 1분
- 프롬프트 작성: 1분
- **총 2분 30초**

### After (자동)
- "블로그 정리: 파일명" 입력: 5초
- **총 5초**

**시간 절감: 95%** 🚀

---

## 📚 관련 가이드

| 문서 | 내용 |
|------|------|
| **[QUICKSTART.md](QUICKSTART.md)** | 5분 시작 가이드 |
| **[DEPLOYMENT_SIMPLE.md](DEPLOYMENT_SIMPLE.md)** | 배포 가이드 |
| **[WRITING_GUIDE.md](WRITING_GUIDE.md)** | 작성 가이드 (상세) |

---

**"카테고리는 Claude에게 맡기세요!"** 🤖
