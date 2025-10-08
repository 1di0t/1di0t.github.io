# 📝 블로그 포스트 작성 가이드

> Jekyll 기반 기술 블로그에 포스트를 작성하고 배포하는 완전한 가이드입니다.

**⚠️ 중요 업데이트**:
- **카테고리는 반드시 소문자로 작성** (예: `python`, `ai`, `project`)
- 대문자 사용 시 404 에러 발생!
- 월별 폴더 구조 권장 (예: `_posts/2025-10/`)
- 타임존 포함 날짜 형식 지원 (예: `2025-10-15 14:00:00 +0900`)

---

## 📖 이 가이드는 누구를 위한 것인가요?

이 가이드는 **기술 블로그를 처음 시작하는 분**, 또는 **Jekyll 블로그 사용법을 빠르게 익히고 싶은 분**을 위해 만들어졌습니다.

복잡한 설정은 모두 완료되어 있으니, **글을 쓰고 업로드하는 것**에만 집중하면 됩니다. 이 가이드를 따라 하면 10분 안에 첫 포스트를 배포할 수 있습니다.

---

## 🚀 빠른 시작 (3단계)

```bash
# 1. 포스트 파일 생성
# 2. 내용 작성
# 3. Git으로 업로드
```

---

## 📋 상세 가이드

### 1단계: 포스트 파일 생성

`_posts/` 폴더에 새 마크다운 파일을 생성합니다.

**파일명 규칙**: `YYYY-MM-DD-제목.md`

**폴더 구조**: 월별로 정리하면 관리가 편리합니다
```
_posts/
  2025-10/
    2025-10-07-prompt-engineering-basics.md
    2025-10-06-my-first-project.md
  2025-09/
    2025-09-24-pandas-tutorial.md
```

**예시**:
```
_posts/2025-10/2025-10-15-python-tutorial.md
_posts/2025-10/2025-10-20-deep-learning-basics.md
_posts/2025-11/2025-11-01-my-first-project.md
```

⚠️ **주의사항**:
- 날짜는 반드시 `YYYY-MM-DD` 형식
- 제목은 영문 소문자와 하이픈(`-`)만 사용
- 확장자는 반드시 `.md`
- 월별 폴더는 선택사항이지만 권장 (예: `_posts/2025-10/`)

---

### 2단계: Front Matter 작성

파일 **맨 위**에 포스트의 메타데이터를 작성합니다. 이 정보는 Jekyll이 포스트를 올바르게 처리하고 표시하는 데 사용됩니다.

#### 기본 템플릿

```yaml
---
layout: post
title: "포스트 제목"
date: 2025-10-15
category: python
tags: [python, tutorial, 기초]
excerpt: "포스트 미리보기 요약 (선택사항)"
---
```

#### 타임존 포함 템플릿 (권장)

```yaml
---
layout: post
title: "포스트 제목"
date: 2025-10-15 14:30:00 +0900
category: python
tags: [python, tutorial, 기초]
excerpt: "포스트 미리보기 요약"
---
```

#### 필수 항목

| 항목 | 설명 | 예시 |
|------|------|------|
| `layout` | 항상 `post` | `post` |
| `title` | 포스트 제목 | `"Python 기초 강좌"` |
| `date` | 작성 날짜 (타임존 선택) | `2025-10-15` 또는 `2025-10-15 14:30:00 +0900` |
| `category` | 카테고리 (1개만, 소문자) | `python` |
| `tags` | 태그 (여러 개 가능) | `[python, 기초]` |

#### 선택 항목

| 항목 | 설명 | 기본값 |
|------|------|--------|
| `excerpt` | 미리보기 텍스트 | 자동 생성 |
| `math` | 수식 지원 여부 | `false` |
| `toc` | 목차 표시 여부 | `true` |
| `comments` | 댓글 표시 여부 | `true` |

#### 카테고리 목록

⚠️ **중요**: 카테고리는 **반드시 소문자**로 작성해야 합니다!

**기술 카테고리**:
- `python` - Python 프로그래밍
- `ai` - AI/머신러닝/딥러닝
- `development` - 일반 개발 (웹, 앱 등)
- `data` - 데이터 분석/과학
- `network` - 네트워크/통신
- `database` - 데이터베이스

**프로젝트 카테고리**:
- `project` - 개인/팀 프로젝트
- `mobile` - 모바일 앱 개발
- `web` - 웹 개발

**학습/기타**:
- `study` - 학습 노트
- `troubleshooting` - 문제 해결 기록
- `git` - Git/GitHub

**카테고리 추가 방법**:
새로운 카테고리가 필요하면 `category/` 폴더에 해당 카테고리의 `.md` 파일을 생성하세요.
예: `category/algorithm.md`

---

### 3단계: 본문 작성

Front Matter 아래에 Markdown 문법으로 본문을 작성합니다. Markdown은 읽기 쉬운 평문으로 작성하면 자동으로 HTML로 변환되는 마크업 언어입니다.

#### 기본 Markdown 문법

##### 제목
```markdown
## 대제목
### 중제목
#### 소제목
```

##### 텍스트 스타일
```markdown
**굵게**
*기울임*
~~취소선~~
`인라인 코드`
```

##### 리스트
```markdown
- 순서 없는 리스트
- 항목 2
  - 하위 항목

1. 순서 있는 리스트
2. 항목 2
```

##### 링크와 이미지
```markdown
[링크 텍스트](https://example.com)
![이미지 설명](/assets/images/example.jpg)
```

##### 인용구
```markdown
> 인용문입니다.
> 여러 줄도 가능합니다.
```

##### 코드 블록

**단일 언어:**
````markdown
```python
def hello():
    print("Hello, World!")
```
````

**여러 언어 지원:**
- `python`, `javascript`, `java`, `c`, `cpp`, `ruby`, `go`
- `html`, `css`, `sql`, `bash`, `json`, `yaml`
- 기타 모든 주요 프로그래밍 언어

##### 표
```markdown
| 헤더1 | 헤더2 | 헤더3 |
|-------|-------|-------|
| 데이터1 | 데이터2 | 데이터3 |
| 데이터4 | 데이터5 | 데이터6 |
```

---

### 4단계: Git으로 업로드

작성한 포스트를 GitHub에 업로드하면 자동으로 블로그에 배포됩니다.

#### Windows (Git Bash)

```bash
# 1. _posts 폴더로 이동
cd e:/self/githubPage

# 2. 변경사항 확인
git status

# 3. 새 포스트 추가
git add _posts/2024-01-15-your-post.md

# 이미지가 있다면 함께 추가
git add assets/images/

# 4. 커밋
git commit -m "포스트 추가: 포스트 제목"

# 5. GitHub에 푸시
git push origin main
```

#### macOS / Linux

```bash
# 1. 저장소 폴더로 이동
cd ~/githubPage

# 2. 변경사항 확인
git status

# 3. 새 포스트 추가
git add _posts/2024-01-15-your-post.md

# 4. 커밋
git commit -m "포스트 추가: 포스트 제목"

# 5. GitHub에 푸시
git push origin main
```

#### 배포 확인

GitHub에 푸시하면 **GitHub Actions**가 자동으로 블로그를 빌드하고 배포합니다. 약 **2~5분** 정도 소요됩니다.

**배포 상태 확인하기**:
1. GitHub 저장소 페이지 접속: `https://github.com/1di0t/1di0t.github.io`
2. **Actions** 탭 클릭
3. ✅ 녹색 체크 표시가 뜨면 배포 완료
4. 블로그 주소로 접속하여 확인: `https://1di0t.github.io`

❌ 빨간 X 표시가 뜨면 빌드 실패입니다. 해당 항목을 클릭하여 에러 로그를 확인하세요.

**자주 발생하는 빌드 에러**:
- Front Matter 문법 오류 (YAML 형식 확인)
- 카테고리를 대문자로 작성 (반드시 소문자 사용)
- 존재하지 않는 카테고리 사용

---

## 📸 이미지 추가하기

포스트에 이미지를 추가하면 내용을 더욱 효과적으로 전달할 수 있습니다.

### 1. 이미지 파일 저장

이미지는 `assets/images/` 폴더에 저장합니다. 포스트별로 하위 폴더를 만들어 정리하면 관리가 편합니다.

**폴더 구조**:
```
assets/images/포스트명/이미지.jpg
```

**예시**:
```
assets/images/python-tutorial/screenshot1.png
assets/images/python-tutorial/diagram.jpg
assets/images/ml-project/model-architecture.png
```

### 2. 포스트에서 이미지 참조

Markdown 이미지 문법을 사용하여 이미지를 삽입합니다:

```markdown
![이미지 설명](/assets/images/python-tutorial/screenshot1.png)
```

⚠️ **주의**: 경로 맨 앞에 `/` (슬래시)를 반드시 붙여야 합니다.

### 3. Git에 추가

이미지 파일도 포스트와 함께 커밋하고 푸시합니다:

```bash
git add assets/images/
git commit -m "이미지 추가"
git push origin main
```

---

## ✨ 유용한 기능

블로그에는 독자 경험을 향상시키는 다양한 기능이 자동으로 적용됩니다.

### 1. 목차 자동 생성

`h2(##)`, `h3(###)`, `h4(####)` 제목을 사용하면 포스트 우측에 **목차가 자동 생성**됩니다.

```markdown
## 첫 번째 섹션
### 하위 섹션 1
### 하위 섹션 2

## 두 번째 섹션
```

**목차를 숨기고 싶다면?** Front Matter에 `toc: false`를 추가하세요.

### 2. 코드 복사 버튼

모든 코드 블록에 **복사 버튼**이 자동으로 생성됩니다. 독자가 클릭 한 번으로 코드를 복사할 수 있습니다.

### 3. 읽기 시간 표시

포스트 상단에 **예상 읽기 시간**이 자동으로 계산되어 표시됩니다. 글의 길이에 따라 동적으로 계산됩니다.

### 4. 다크모드 지원

독자가 좌측 사이드바에서 **라이트/다크 모드를 전환**할 수 있습니다. 시스템 설정에 따라 자동으로 적용됩니다.

---

## ✍️ 양질의 포스트 작성하기

기술적인 설정만큼 중요한 것이 **글의 내용과 구성**입니다. 독자에게 가치를 전달하는 포스트를 작성하기 위한 핵심 팁을 소개합니다.

### 1. 글쓰기 전 준비

#### 독자를 정의하세요

글을 쓰기 전에 **"이 글은 누구를 위한 것인가?"**를 명확히 하세요.

- **추천 방법**: "이 기술을 몰랐던 과거의 나"를 독자로 설정하기
- 과거의 내가 무엇을 궁금해했고, 어떤 부분에서 막혔는지 떠올리세요
- 그 눈높이에 맞춰 설명하면 자연스럽게 독자에게 필요한 글이 됩니다

#### 주제는 경험에서 찾으세요

가장 좋은 글감은 **나만의 경험**입니다:
- 최근 해결한 까다로운 버그
- 새로 사용해 본 라이브러리 후기
- 프로젝트에서 배운 교훈
- 공부하며 정리한 개념

#### 간단한 구조를 잡으세요

글이 산으로 가지 않도록 뼈대를 세워두세요:
- **문제 제기** → 해결 과정 → 결론
- **서론** → 본론 → 요약
- **배경** → 구현 → 회고

### 2. 글 작성 중 팁

#### 쉽게 설명하기

**복잡한 개념은 비유로 설명하세요**:

```markdown
❌ 나쁜 예:
"CNN은 컨볼루션 레이어를 통해 feature extraction을 수행합니다."

✅ 좋은 예:
"CNN은 마치 사진에서 중요한 패턴(모서리, 곡선 등)을 자동으로 찾아내는
필터처럼 작동합니다."
```

**점진적으로 설명하세요** (간단 → 복잡):
1. 먼저 가장 단순한 개념 소개
2. 간단한 예제로 직관 제공
3. 점차 복잡성 추가
4. 실전 응용 사례 제시

#### 코드 작성 가이드라인

**짧고 명확한 코드를 작성하세요**:

```python
# ✅ 좋은 예: 핵심만 담은 간결한 코드 + 주석
def calculate_accuracy(predictions, labels):
    """예측값과 실제값을 비교하여 정확도를 계산"""
    correct = sum(p == l for p, l in zip(predictions, labels))
    return correct / len(labels)
```

```python
# ❌ 나쁜 예: 너무 길거나 설명하려는 개념과 무관한 부분이 많은 코드
def calculate_accuracy_with_logging_and_validation(predictions, labels, logger=None, validate=True):
    if validate:
        if not predictions or not labels:
            raise ValueError("Empty input")
        if len(predictions) != len(labels):
            raise ValueError("Length mismatch")
    # ... 50줄의 추가 검증 코드
```

**코드 주석 원칙**:
- 코드가 **무엇(What)**을 하는지는 코드로 표현
- 주석은 **왜(Why)** 이렇게 했는지 설명

#### 신뢰성 확보하기

**공식 문서 링크를 활용하세요**:

```markdown
이 기능은 Python 3.10부터 도입된
[Structural Pattern Matching](https://peps.python.org/pep-0634/)입니다.

더 자세한 내용은 [TensorFlow 공식 문서](https://www.tensorflow.org/api_docs/)를 참고하세요.
```

#### 가독성 높이기

**짧은 문단으로 나누세요**:
- 온라인에서는 긴 글이 피로감을 줍니다
- 3~4문장 단위로 문단을 나누세요
- 소제목과 글머리 기호를 적극 활용하세요

**핵심 용어만 강조하세요**:
- 중요한 개념이나 용어는 **굵게** 표시
- 과도한 강조는 오히려 역효과 (한 문단에 1~2개만)

### 3. 매력적인 제목 작성하기

제목은 **독자의 첫인상**을 결정합니다. 클릭하고 싶은 제목의 특징:

#### ✅ 좋은 제목의 요소

1. **구체적인 숫자**: "5가지 방법", "3단계로 배우는"
2. **대상 독자 명시**: "초보자를 위한", "실무자를 위한"
3. **핵심 키워드를 앞에**: "Python 동시성 프로그래밍" (O) vs "동시성을 Python으로" (X)
4. **가치 제안**: "빠르게 배우는", "실전 가이드", "완벽 정리"

#### 제목 예시

```markdown
❌ 평범한 제목:
"PyTorch 사용법"
"REST API 만들기"

✅ 매력적인 제목:
"초보자를 위한 PyTorch 이미지 분류기 만들기: 5단계 실전 가이드"
"FastAPI로 10분 만에 REST API 개발하기 (코드 포함)"
```

---

## 📋 포스트 템플릿 (복사해서 사용)

### 기본 템플릿

```markdown
---
layout: post
title: "포스트 제목을 여기에 입력"
date: 2025-10-15 14:00:00 +0900
category: python
tags: [python, tutorial]
excerpt: "포스트 미리보기 내용"
---

## 서론

포스트 내용을 시작합니다...

## 본문

### 소제목 1

내용...

### 소제목 2

내용...

## 결론

마무리 내용...
```

### 코드 중심 포스트 템플릿

```markdown
---
layout: post
title: "Python 함수 완벽 가이드"
date: 2025-10-15 14:00:00 +0900
category: python
tags: [python, 함수, 기초]
---

## 함수란?

함수는...

## 기본 문법

```python
def greet(name):
    return f"Hello, {name}!"
```

## 실습 예제

```python
# 예제 코드
def calculate_sum(a, b):
    return a + b

result = calculate_sum(10, 20)
print(result)  # 30
```

## 정리

- 포인트 1
- 포인트 2
```

### 프로젝트 포스트 템플릿

```markdown
---
layout: post
title: "머신러닝 프로젝트: 이미지 분류기"
date: 2025-10-15 14:00:00 +0900
category: project
tags: [머신러닝, cnn, ai]
---

## 프로젝트 개요

- **목표**: ...
- **사용 기술**: TensorFlow, Keras
- **기간**: 2주

## 데이터셋

...

## 모델 구조

...

## 결과

![결과 이미지](/assets/images/project1/result.png)

## 회고

배운 점:
- ...
- ...
```

---

## 💡 실전 팁

### 1. 효율적인 글쓰기 워크플로우

**추천 작업 순서**:
1. **제목과 개요 먼저 작성**: Front Matter와 목차(헤딩) 먼저 정리
2. **코드 예제 준비**: 실제 동작하는 코드를 먼저 작성하고 테스트
3. **본문 작성**: 코드를 설명하는 내용 추가
4. **스크린샷 추가**: 필요한 이미지를 `assets/images/`에 저장
5. **로컬에서 미리보기**: (선택) Jekyll 로컬 서버로 확인
6. **Git 커밋 & 푸시**

### 2. 카테고리 vs 태그 전략

**카테고리** (1개만):
- 글의 주제를 대분류로 표현
- 예: `python`, `project`, `ai`

**태그** (여러 개):
- 구체적인 기술이나 키워드
- 예: `[flask, api, rest, backend]`

### 3. 제목 작성 팁

**좋은 제목의 특징**:
- 구체적 숫자 사용: "5가지 방법", "3단계로 배우는"
- 대상 독자 명시: "초보자를 위한", "실무자를 위한"
- 핵심 키워드를 앞에 배치

**예시**:
```
❌ "PyTorch 사용법"
✅ "초보자를 위한 PyTorch 이미지 분류기 만들기: 5단계 실전 가이드"

❌ "REST API 만들기"
✅ "FastAPI로 10분 만에 REST API 개발하기 (코드 포함)"
```

### 4. 코드 블록 작성 팁

**언어 지정 필수**:
````markdown
```python  # 언어 지정
def hello():
    print("Hello, World!")
```
````

**주석 활용**:
```python
# ✅ 좋은 예: 핵심만 담은 간결한 코드 + 주석
def calculate_accuracy(predictions, labels):
    """예측값과 실제값을 비교하여 정확도를 계산"""
    correct = sum(p == l for p, l in zip(predictions, labels))
    return correct / len(labels)
```

### 5. 시리즈 글 작성 방법

관련된 여러 글을 작성할 때:
- 태그를 동일하게 사용: `[python-series, part-1]`
- 제목에 시리즈 번호 명시: "Python 완벽 가이드 #1"
- 각 글에 다른 글로의 링크 추가

---

## 🔍 자주 묻는 질문 (FAQ)

### Q1. 포스트가 블로그에 안 보여요!

다음 항목을 순서대로 확인하세요:

**체크리스트**:
1. [ ] 파일명이 `YYYY-MM-DD-title.md` 형식인가?
2. [ ] `_posts/` 폴더에 저장했나?
3. [ ] Front Matter가 올바르게 작성되었나?
4. [ ] **카테고리를 소문자로 작성했나?** (대문자 사용 시 404 에러)
5. [ ] `git push`를 성공적으로 실행했나?
6. [ ] GitHub Actions 빌드가 성공했나? (저장소의 Actions 탭 확인)

만약 날짜를 미래로 설정했다면, Jekyll은 해당 포스트를 자동으로 숨깁니다 (예약 발행 기능).

**가장 흔한 실수**: 카테고리를 대문자로 작성 (예: `Python` 대신 `python` 사용)

### Q2. 코드 하이라이팅이 안 돼요!

코드 블록에 **언어를 명시**했는지 확인하세요:

```markdown
❌ 잘못된 예:
```
def hello():
    pass
```

✅ 올바른 예:
```python
def hello():
    pass
```
```

언어를 지정하지 않으면 구문 강조가 적용되지 않습니다.

### Q3. 이미지가 안 보여요!

**해결 방법**:
- **경로 확인**: `/assets/images/...` (맨 앞에 `/` 필수)
- **대소문자 확인**: Linux 서버는 대소문자를 구분합니다 (예: `Image.jpg` ≠ `image.jpg`)
- **Git 추가 확인**: 이미지 파일도 `git add`로 추가하고 푸시했는지 확인

### Q4. 포스트를 수정하려면?

1. `_posts/` 폴더에서 해당 파일을 수정
2. Git으로 커밋 & 푸시:
   ```bash
   git add _posts/파일명.md
   git commit -m "포스트 수정"
   git push origin main
   ```
3. 2~5분 후 자동으로 재배포됩니다

### Q5. 포스트를 삭제하려면?

1. `_posts/` 폴더에서 파일 삭제
2. Git으로 삭제 커밋:
   ```bash
   git rm _posts/파일명.md
   git commit -m "포스트 삭제: 제목"
   git push origin main
   ```
3. 자동으로 블로그에서도 제거됩니다

### Q6. 예약 발행 기능을 사용하려면?

Front Matter의 `date`를 **미래 날짜**로 설정하면 됩니다:

```yaml
---
date: 2025-12-31  # 이 날짜가 되면 자동으로 공개됨
---
```

해당 날짜가 되면 자동으로 블로그에 표시됩니다.

### Q7. 카테고리 페이지가 404 에러를 출력해요!

**원인**: 카테고리를 대문자로 작성했거나, 해당 카테고리 페이지가 `category/` 폴더에 없을 때 발생합니다.

**해결 방법**:
1. Front Matter의 category를 **반드시 소문자**로 변경
2. `category/` 폴더에 해당 카테고리의 `.md` 파일이 있는지 확인
3. 파일명과 permalink가 일치하는지 확인

**예시**:
```yaml
# ❌ 잘못된 예
category: Python

# ✅ 올바른 예
category: python
```

### Q8. 여러 카테고리를 사용하고 싶어요!

**답변**: 현재 블로그 시스템은 **카테고리 1개만 지원**합니다.

**대안**:
- **태그를 활용하세요**: `tags: [python, flask, api, backend]`
- 태그는 여러 개 사용 가능하며, 태그별 필터링도 지원됩니다

### Q9. Git 커밋 메시지는 어떻게 작성하나요?

**권장 형식**:
```bash
git commit -m "포스트 추가: Python 기초 강좌"
git commit -m "포스트 수정: 오타 수정 및 코드 예제 추가"
git commit -m "이미지 추가: Python 튜토리얼 스크린샷"
```

---

## ✅ 발행 전 최종 체크리스트

포스트를 발행하기 전에 다음 항목을 확인하세요:

### 기술적 검증

- [ ] 파일명이 `YYYY-MM-DD-title.md` 형식인가?
- [ ] 파일이 `_posts/` 또는 `_posts/YYYY-MM/` 폴더에 있는가?
- [ ] Front Matter의 모든 필수 항목이 채워져 있는가?
- [ ] **카테고리를 소문자로 작성했는가?** (매우 중요!)
- [ ] 카테고리 페이지가 `category/` 폴더에 존재하는가?
- [ ] 모든 이미지 경로가 올바른가? (`/assets/images/...`)
- [ ] 코드 블록에 언어 지정이 되어 있는가? (구문 강조)
- [ ] 모든 링크가 정상 작동하는가? (내부/외부 링크)

### 내용 품질

- [ ] **소리 내어 읽어보기**: 어색한 문장이나 오타가 없는가?
- [ ] **결론 요약**: 핵심 내용을 마지막에 요약했는가?
- [ ] **다음 행동 제안**: 독자를 위한 추가 학습 자료나 관련 링크를 제공했는가?

```markdown
## 마무리

이 글에서는 FastAPI의 기본 사용법을 살펴보았습니다:
- REST API 엔드포인트 생성
- 데이터 검증 및 직렬화
- 비동기 처리 패턴

**다음 단계**:
- [FastAPI 공식 문서](https://fastapi.tiangolo.com/)에서 고급 기능 살펴보기
- 데이터베이스 연동 실습해보기
- 관련 포스트: [Python 비동기 프로그래밍 입문](링크)
```

### 선택적 검증

- [ ] **AI 리뷰**: ChatGPT 등에 글을 넣어 문장 흐름, 중복 표현 점검 받기
- [ ] **동료 피드백**: 가능하다면 다른 사람에게 읽어보고 피드백 받기

---

## 🎯 워크플로우 요약

```
1. 월별 폴더에 포스트 작성
   _posts/2025-10/2025-10-15-title.md

   Front Matter 작성 (카테고리는 반드시 소문자!)
   ---
   layout: post
   title: "제목"
   date: 2025-10-15 14:00:00 +0900
   category: python  # 소문자!
   tags: [python, tutorial]
   ---

2. Git 커밋 & 푸시
   git add .
   git commit -m "포스트 추가: 제목"
   git push origin main

3. GitHub Actions 자동 빌드
   https://github.com/1di0t/1di0t.github.io/actions
   (2~5분 소요)

4. 블로그에 자동 배포
   https://1di0t.github.io

5. 완료! ✅
```

**꿀팁**:
- 월별 폴더 사용으로 포스트 관리가 쉬워집니다
- 카테고리는 **반드시 소문자**로 작성하세요 (가장 흔한 실수!)
- `future: true` 설정으로 미래 날짜 포스트도 즉시 게시됩니다

---

## 🤖 AI로 더 쉽게 글쓰기

**간단한 아이디어만 있다면 AI가 완성된 포스트를 만들어줍니다!**

### AI 기반 글 작성 워크플로우

```
1. 초안 작성 (5분) → 2. AI에게 전달 → 3. 완성된 글 받기 → 4. 업로드
```

자세한 방법은 [AI_WORKFLOW.md](AI_WORKFLOW.md)를 참고하세요.

**필요한 파일**:
- [drafts/TEMPLATE.md](drafts/TEMPLATE.md) - 초안 작성 템플릿
- [AI_PROMPT.md](AI_PROMPT.md) - AI에게 전달할 프롬프트

---

## 📚 더 알아보기

### 📖 가이드 문서

**글쓰기 가이드**:
- [WRITING_GUIDE.md](WRITING_GUIDE.md) - 기술 블로그 글쓰기 완벽 가이드 (3단계 프레임워크)
- [AI_WORKFLOW.md](AI_WORKFLOW.md) - AI 기반 글 작성 전체 워크플로우

**기술 문서**:
- [README.md](../README.md) - 프로젝트 전체 설명 및 설정 방법
- [Flow.md](Flow.md) - 블로그 시스템 작동 원리 및 아키텍처

### 🌐 외부 자료

- [Markdown 전체 문법 가이드](https://www.markdownguide.org/) - Markdown 문법 상세 설명
- [Jekyll 공식 문서](https://jekyllrb.com/docs/) - Jekyll 고급 기능 및 설정
- [Tailwind CSS 문서](https://tailwindcss.com/docs) - 커스터마이징 참고

---

**Happy Blogging! 🎉**

기술 블로그는 나의 성장 과정을 기록하고 공유하는 소중한 공간입니다.
부담 없이 작은 것부터 하나씩 작성해보세요. 꾸준함이 가장 중요합니다.

**팁**: AI를 활용하면 글쓰기가 훨씬 쉬워집니다. [AI_WORKFLOW.md](AI_WORKFLOW.md)로 시작해보세요!
