# AutoBlog 글 작성 가이드

이 가이드는 AutoBlog에 새 글을 작성할 때 참고할 수 있는 지침입니다.

## 카테고리 선택

### 기존 카테고리 목록

현재 사용 가능한 카테고리는 `_data/categories.yml` 파일에 정의되어 있습니다.

**주요 카테고리:**

#### Study (공부)
- **ai** (인공지능): AI, 머신러닝, 딥러닝, NLP, 컴퓨터 비전
- **programming** (프로그래밍): Python, JavaScript, Java, 알고리즘, 자료구조
- **web** (웹개발): HTML, CSS, React, Vue, Django, FastAPI, Node.js
- **database** (데이터베이스): SQL, MySQL, PostgreSQL, MongoDB
- **data-science** (데이터사이언스): Pandas, NumPy, Matplotlib, 데이터 분석
- **data-analysis** (데이터분석): EDA, 전처리, 특성 공학
- **Machine-Learning** (머신러닝): 지도/비지도 학습, 분류, 회귀, 군집화
- **MLOps**: ML 배포, 파이프라인, Docker, Kubernetes
- **Development** (개발): 소프트웨어 개발, 아키텍처, 디자인 패턴
- **Git**: 버전 관리, GitHub, GitLab
- **Mobile** (모바일): Android, iOS, React Native, Flutter
- **network** (네트워크): TCP/UDP, HTTP/HTTPS, 프로토콜
- **cpp** (C++): C++ 프로그래밍, 포인터, 메모리 관리

#### Project (프로젝트)
- **Project** (프로젝트): 프로젝트 소개, 개발 일지, 포트폴리오

#### Documentation (정리)
- **study** (학습): 학습 내용 정리, 강의 노트
- **Terms** (용어정리): 개발 용어, 개념 정의

#### Troubleshooting (트러블슈팅)
- **troubleshooting** (트러블슈팅): 에러 해결, 디버깅, 문제 해결

#### Hobby (취미)
- **coffee** (커피): 커피 추출, 원두, 바리스타

### 카테고리 선택 방법

1. **기존 카테고리 사용 (권장)**
   - 위 목록에서 가장 적합한 카테고리를 선택하세요
   - frontmatter의 `category` 필드에 다음 형식 중 하나를 사용:
     - ID: `category: ai`
     - 한글명: `category: "인공지능 (AI)"`
     - 영문명: `category: AI`

2. **새 카테고리 추가**
   - 기존 카테고리가 적합하지 않은 경우에만 새 카테고리 추가
   - frontmatter에 원하는 카테고리명 작성
   - 빌드 시 자동으로 감지되어 `_data/categories.yml`에 추가됨
   - 또는 수동으로 `_data/categories.yml`에 추가 (가이드 참고)

## Front Matter 구조

모든 블로그 포스트는 다음과 같은 front matter를 포함해야 합니다:

```yaml
---
layout: post
title: "글 제목"
category: 카테고리명 또는 ID
tags:
  - tag1
  - tag2
  - tag3
excerpt: 글 요약 (선택 사항)
parent_category: study  # 자동 설정됨
learning_framework:
  stage: digestion
  pacer_type: conceptual  # 자동 설정됨
---
```

### 필수 필드

- **layout**: 항상 `post`
- **title**: 글 제목 (명확하고 간결하게)
- **category**: 카테고리 (위 목록 참고)
- **tags**: 태그 목록 (관련 키워드, 2-5개 권장)

### 선택 필드

- **excerpt**: 글 요약 (150자 이내 권장)
- **parent_category**: 상위 카테고리 (자동 설정됨, 수동 설정 가능)
- **learning_framework**: PACER 학습 프레임워크 (자동 설정됨)

## PACER 학습 프레임워크

글의 성격에 따라 자동으로 PACER 타입이 분류됩니다:

- **Procedural**: 단계별 가이드, 튜토리얼, 코드 중심
- **Conceptual**: 개념 설명, 이론, "무엇인가?" 중심
- **Evidence**: 프로젝트, 사례 연구, 문제 해결, 경험 공유
- **Reference**: 참고 자료, 치트시트, 명령어 모음
- **Analogous**: 비교, 비유, A vs B

원하는 경우 수동으로 설정할 수 있습니다.

## 파일명 규칙

블로그 포스트 파일은 다음 규칙을 따라야 합니다:

```
_posts/YYYY-MM/YYYY-MM-DD-title-in-kebab-case.md
```

예시:
- `_posts/2025-01/2025-01-15-python-data-analysis-tutorial.md`
- `_posts/2025-01/2025-01-20-react-hooks-guide.md`

## 작성 예시

### 예시 1: 프로그래밍 튜토리얼

```markdown
---
layout: post
title: Python Pandas 데이터 분석 기초
category: data-science
tags:
  - python
  - pandas
  - data-analysis
excerpt: Pandas 라이브러리를 활용한 데이터 분석 기초를 알아봅니다.
---

## 소개

이 글에서는 Python의 Pandas 라이브러리를 사용하여...

## 설치

\```bash
pip install pandas
\```

...
```

### 예시 2: 개념 설명

```markdown
---
layout: post
title: REST API란 무엇인가?
category: web
tags:
  - api
  - rest
  - web
excerpt: REST API의 개념과 설계 원칙을 알아봅니다.
---

## REST API의 정의

REST(Representational State Transfer)는...

...
```

### 예시 3: 문제 해결

```markdown
---
layout: post
title: Docker 컨테이너 네트워크 연결 오류 해결
category: troubleshooting
tags:
  - docker
  - network
  - debugging
excerpt: Docker 컨테이너 간 네트워크 연결 문제를 해결한 경험을 공유합니다.
---

## 문제 상황

Docker Compose로 여러 컨테이너를 실행할 때...

## 해결 방법

...
```

## 글 작성 시 체크리스트

- [ ] 적절한 카테고리 선택 (기존 카테고리 우선)
- [ ] 명확한 제목 작성
- [ ] 관련 태그 2-5개 추가
- [ ] 파일명이 규칙에 맞는지 확인 (YYYY-MM-DD-title.md)
- [ ] Front matter가 올바른지 확인
- [ ] 코드 블록에 언어 지정 (syntax highlighting)
- [ ] 이미지는 `/assets/images/` 디렉토리에 저장
- [ ] 글 작성 후 로컬에서 미리보기 (`npm run dev`)

## 빌드 및 배포

글을 작성한 후:

1. **로컬 개발 서버 실행**
   ```bash
   npm run dev
   ```

2. **카테고리 동기화 (필요시)**
   ```bash
   npm run sync:categories
   ```

3. **빌드**
   ```bash
   npm run build
   ```

4. **검증**
   ```bash
   npm run validate:categories
   ```

## 도움말

- 카테고리 목록: `_data/categories.yml`
- 카테고리 페이지: `category/*.html`
- 레이아웃 템플릿: `_layouts/post.html`
- 스타일: `assets/css/main.css`

궁금한 점이 있으면 `_data/categories.yml` 파일의 주석을 참고하거나, 기존 포스트를 참고하세요.
