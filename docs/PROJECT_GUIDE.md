# 프로젝트 작성 가이드

## 📋 목차
1. [개요](#개요)
2. [파일 위치 및 네이밍](#파일-위치-및-네이밍)
3. [Front Matter 작성](#front-matter-작성)
4. [본문 구조](#본문-구조)
5. [작성 예시](#작성-예시)
6. [체크리스트](#체크리스트)

---

## 개요

`_projects/` 폴더에 프로젝트를 Markdown 파일로 작성하여 포트폴리오 페이지에 표시할 수 있습니다. 이 가이드는 일관된 품질의 프로젝트 문서를 작성하는 방법을 안내합니다.

---

## 파일 위치 및 네이밍

### 파일 위치
```
_projects/프로젝트명.md
```

### 파일명 규칙
- **소문자 + 하이픈** 사용: `github-pages-blog.md`, `spam-detection.md`
- **간결하게**: 프로젝트를 대표하는 키워드 2-4개
- **영문 권장**: URL에 사용되므로 영문 권장

### 예시
```
✅ _projects/github-pages-blog.md
✅ _projects/dccd-spam-detection.md
✅ _projects/todo-app.md

❌ _projects/GitHub 페이지 블로그.md (한글, 공백)
❌ _projects/MyAwesomeProject.md (대문자)
```

---

## Front Matter 작성

### 필수 항목

```yaml
---
title: "프로젝트 제목"
category: 카테고리
tech_stack: [기술1, 기술2, 기술3]
github: GitHub 저장소 URL
demo: 데모/배포 URL
period: "YYYY.MM - YYYY.MM"
thumbnail: /assets/images/projects/프로젝트명.jpg
excerpt: "프로젝트 한 줄 요약 (150자 이내)"
---
```

### 항목별 상세 설명

#### 1. title (필수)
- 프로젝트의 정확한 제목
- 따옴표로 감싸기
- 예: `"Jekyll + Tailwind CSS 기술 블로그"`

#### 2. category (필수)
프로젝트 카테고리는 다음 중 하나를 선택:

**허용된 카테고리:**
- `AI-ML` - 인공지능/머신러닝 프로젝트
- `Web-Development` - 웹 개발 프로젝트
- `Data-Analysis` - 데이터 분석 프로젝트
- `Toy-Project` - 토이 프로젝트

**주의사항:**
- 정확히 위의 카테고리 중 하나만 사용
- 대소문자 구분 (하이픈 포함)

#### 3. tech_stack (필수)
- 사용한 주요 기술 스택을 배열로 나열
- 대문자로 시작, 하이픈으로 연결
- 5-10개 권장

**예시:**
```yaml
tech_stack: [Python, TensorFlow, Scikit-learn, Pandas]
tech_stack: [React, TypeScript, Next.js, Tailwind-CSS]
tech_stack: [Jekyll, Tailwind-CSS, GitHub-Pages, GitHub-Actions]
```

#### 4. github (선택)
- GitHub 저장소 전체 URL
- 비공개 프로젝트는 비워두기

**예시:**
```yaml
github: https://github.com/username/repository
github:  # 비공개 시 비워두기
```

#### 5. demo (선택)
- 배포된 데모 사이트 URL
- 없으면 비워두기

**예시:**
```yaml
demo: https://myproject.com
demo: https://username.github.io/project
demo:  # 없으면 비워두기
```

#### 6. period (필수)
- **중요: 항상 현재 날짜를 기준으로 작성**
- 형식: `"YYYY.MM - YYYY.MM"`
- 진행 중인 프로젝트는 종료 날짜를 현재 월로 작성

**예시:**
```yaml
# 2024년 10월 시작, 2025년 1월 현재 작업 중
period: "2024.10 - 2025.01"

# 2024년 11월 단일 월
period: "2024.11"

# 2023년 3월 ~ 2024년 6월 완료
period: "2023.03 - 2024.06"
```

#### 7. thumbnail (선택)
- 프로젝트 대표 이미지 경로
- 없으면 비워두기

**예시:**
```yaml
thumbnail: /assets/images/projects/blog-thumbnail.jpg
thumbnail:  # 없으면 비워두기
```

#### 8. excerpt (필수)
- 프로젝트를 한 줄로 요약
- 150자 이내
- 따옴표로 감싸기

**예시:**
```yaml
excerpt: "Jekyll과 Tailwind CSS를 결합한 JAMstack 기반 개인 기술 블로그. GitHub Actions CI/CD 자동화 및 다양한 개발자 친화적 기능을 구현했습니다."
```

---

## 본문 구조

### 권장 섹션 구조

```markdown
## 프로젝트 개요
- 프로젝트 배경 및 목적
- 전체적인 설명 (3-5문장)

## 주요 기능
### 1. 기능 카테고리 1
- 세부 기능 설명
- 핵심 포인트

### 2. 기능 카테고리 2
- 세부 기능 설명

## 기술적 도전과 해결
### 문제 1: 문제 제목
**도전**: 어떤 문제가 있었는지 설명

**해결**:
- 해결 방법 1
- 해결 방법 2
- (선택) 코드 예시

### 문제 2: 문제 제목
...

## 성과
- 정량적 성과 (성능 개선 70%, 빌드 시간 50% 단축 등)
- 정성적 성과

## 향후 계획
1. 추가 기능 1
2. 추가 기능 2
3. 개선 사항

## 배운 점
- 프로젝트를 통해 배운 내용
- 인사이트 및 개인적 성장

---

## (선택) 구현 상세
### 아키텍처
- 시스템 구조도
- 데이터 흐름

### 핵심 기능 구현
```코드
// 중요한 코드 스니펫
```

### 성능 최적화
- 최적화 기법
- 측정 결과
```

### 섹션별 작성 팁

#### 1. 프로젝트 개요
- **왜 이 프로젝트를 했는지** 명확히 설명
- 기술적 배경 간단히 언급
- 3-5문장으로 요약

#### 2. 주요 기능
- 기능을 **카테고리로 그룹화** (UI/UX, 백엔드, 데이터 처리 등)
- 각 기능은 **불릿 포인트**로 간결하게
- 너무 세부적이지 않게 (핵심만)

#### 3. 기술적 도전과 해결 ⭐ **가장 중요**
- **실제로 겪은 문제**만 작성 (가상의 문제 X)
- 각 문제는 `문제 → 도전 → 해결` 구조
- **코드 예시**를 포함하면 더 좋음
- 3-5개 문제 권장

**템플릿:**
```markdown
### 문제 1: [간결한 제목]
**도전**: [무엇이 어려웠는지 2-3문장]

**해결**:
- [해결 방법 1]
- [해결 방법 2]
- (선택) 코드나 설정 예시

```python
# 해결 코드
```
```

#### 4. 성과
- **정량적 수치** 포함 권장 (70% 개선, 3배 빠름 등)
- 비즈니스 임팩트나 개인 성장 언급

#### 5. 배운 점
- **개인적 성장**에 초점
- 기술적 학습과 소프트 스킬 모두 언급
- 2-4문장

---

## 작성 예시

### 최소 예시 (간단한 토이 프로젝트)

```markdown
---
title: "할일 관리 웹앱"
category: Toy-Project
tech_stack: [React, TypeScript, LocalStorage]
github: https://github.com/username/todo-app
demo: https://username.github.io/todo-app
period: "2025.01"
thumbnail:
excerpt: "React와 TypeScript로 만든 심플한 할일 관리 앱. 로컬스토리지를 활용한 데이터 영속성을 구현했습니다."
---

## 프로젝트 개요

React와 TypeScript를 학습하기 위해 제작한 할일 관리 웹 애플리케이션입니다. 로컬스토리지를 활용하여 새로고침 후에도 데이터가 유지되도록 구현했습니다.

## 주요 기능

- 할일 추가/수정/삭제
- 완료 상태 토글
- 로컬스토리지 자동 저장
- 반응형 디자인

## 기술적 도전과 해결

### 문제 1: TypeScript 타입 정의
**도전**: React 컴포넌트에 TypeScript를 적용하면서 타입 정의에 어려움을 겪었습니다.

**해결**:
- `interface`를 사용하여 Todo 타입 정의
- Props와 State에 제네릭 타입 적용

## 배운 점

React Hooks(useState, useEffect)의 동작 원리를 이해했고, TypeScript로 타입 안정성을 확보하는 방법을 배웠습니다.
```

### 상세 예시 (복잡한 프로젝트)

실제 작성된 [github-pages-blog.md](e:\self\githubPage\_projects\github-pages-blog.md) 파일 참고

---

## 코드 작성 가이드

### 코드 블록 작성

````markdown
```언어
코드 내용
```
````

### 지원 언어
- `python`, `javascript`, `typescript`
- `bash`, `yaml`, `json`
- `html`, `css`, `markdown`
- 기타 모든 주요 언어

### 코드 예시
````markdown
```python
def hello(name: str) -> str:
    """인사말을 반환합니다."""
    return f"Hello, {name}!"
```

```javascript
// TODO 추가 함수
function addTodo(text) {
  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false
  };
  todos.push(newTodo);
}
```
````

---

## 이미지 및 다이어그램

### 이미지 삽입

```markdown
![대체 텍스트](/assets/images/projects/프로젝트명/이미지.jpg)
```

### 아키텍처 다이어그램 (ASCII)

```markdown
```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Frontend  │────▶│    Backend   │────▶│  Database   │
└─────────────┘     └──────────────┘     └─────────────┘
```
```

---

## 체크리스트

프로젝트 문서 작성 완료 전 다음 항목을 확인하세요:

### Front Matter
- [ ] `title` - 프로젝트 제목 작성 (따옴표 포함)
- [ ] `category` - 허용된 카테고리 중 선택
- [ ] `tech_stack` - 기술 스택 배열 (5-10개)
- [ ] `github` - GitHub URL (비공개 시 비워두기)
- [ ] `demo` - 데모 URL (없으면 비워두기)
- [ ] `period` - **현재 날짜 기준** 기간 작성 ⭐
- [ ] `thumbnail` - 썸네일 경로 (없으면 비워두기)
- [ ] `excerpt` - 한 줄 요약 (150자 이내, 따옴표 포함)

### 본문 구조
- [ ] **프로젝트 개요** - 배경과 목적 설명
- [ ] **주요 기능** - 카테고리별 기능 정리
- [ ] **기술적 도전과 해결** - 3-5개 문제와 해결 방법
- [ ] **성과** - 정량적/정성적 성과
- [ ] **향후 계획** - 추가 기능 및 개선 사항
- [ ] **배운 점** - 개인적 성장 및 인사이트

### 코드 품질
- [ ] 코드 블록에 언어 지정
- [ ] 중요한 코드만 포함 (전체 코드 X)
- [ ] 주석 추가로 가독성 향상

### 전체 검토
- [ ] 맞춤법 및 띄어쓰기 확인
- [ ] 링크가 올바르게 작동하는지 확인
- [ ] 이미지가 제대로 표시되는지 확인
- [ ] 로컬 빌드 테스트 (`bundle exec jekyll serve`)

---

## Git 커밋 및 배포

### 1. 로컬 확인

```bash
# Jekyll 서버 실행
bundle exec jekyll serve

# 브라우저에서 확인
http://localhost:4000/projects/프로젝트명/
```

### 2. Git 커밋

```bash
# 파일 추가
git add _projects/프로젝트명.md

# 커밋
git commit -m "프로젝트 추가: 프로젝트 제목"

# 푸시
git push origin feature  # 또는 content 브랜치
```

### 3. 자동 배포
- `main` 브랜치에 머지되면 GitHub Actions가 자동 빌드 및 배포
- 몇 분 후 https://1di0t.github.io/projects/ 에서 확인 가능

---

## 팁과 모범 사례

### ✅ 좋은 프로젝트 문서

1. **스토리텔링**: 프로젝트의 시작부터 결과까지 이야기처럼 전달
2. **구체적인 수치**: "성능 개선"보다 "성능 70% 개선"
3. **코드 예시**: 핵심 구현을 코드로 보여주기
4. **시각 자료**: 다이어그램, 스크린샷 활용
5. **배운 점 강조**: 기술적 성장과 인사이트 공유

### ❌ 피해야 할 것

1. **너무 기술적**: 일반인도 이해할 수 있게 설명
2. **과장**: 실제로 한 것만 작성
3. **중복**: 같은 내용 반복하지 않기
4. **전체 코드 덤프**: 핵심 부분만 발췌
5. **날짜 오류**: ⭐ **기간은 항상 현재 날짜 기준으로 작성**

---

## 참고 자료

- [실제 프로젝트 예시](_projects/github-pages-blog.md)
- [Markdown 문법 가이드](https://www.markdownguide.org/)
- [Jekyll 프로젝트 컬렉션](https://jekyllrb.com/docs/collections/)

---

**작성일**: 2025-01-08
**마지막 업데이트**: 2025-01-08
