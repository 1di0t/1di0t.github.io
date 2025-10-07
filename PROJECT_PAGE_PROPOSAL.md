# 프로젝트 페이지 구현 제안서

## 📋 현재 상황 분석

### 문제점
1. **404 에러 발생**: [projects.html:17-38](/_pages/projects.html#L17-L38)에서 프로젝트 카테고리 링크 클릭 시 404 에러 발생
2. **카테고리 불일치**: 프로젝트 페이지는 `AI-ML`, `웹개발`, `데이터분석`, `토이프로젝트` 카테고리를 참조하지만, 실제 포스트에는 이런 카테고리가 없음
3. **콘텐츠 부재**: 프로젝트용 포스트가 아직 작성되지 않음

### 기존 구조
- **블로그 포스트**: `_posts/` 폴더, `category: programming` 등 사용, `/blog/년/월/일/제목/` 형식 URL
- **permalink 구조**: [_config.yml:14](/_config.yml#L14)에서 `/blog/:year/:month/:day/:title/` 설정
- **레이아웃**: `post.html` 레이아웃 사용

---

## 🎯 제안하는 해결 방안

### 방안 1: 독립적인 프로젝트 컬렉션 (권장)

프로젝트를 블로그 포스트와 **완전히 분리된 컬렉션**으로 관리

#### 구조
```
_projects/
  ├── ai-ml/
  │   ├── 2024-chatbot-project.md
  │   └── 2025-image-classifier.md
  ├── web-dev/
  │   └── 2024-portfolio-website.md
  ├── data-analysis/
  │   └── 2024-sales-dashboard.md
  └── toy-projects/
      └── 2024-game-clone.md
```

#### 장점
- ✅ 프로젝트와 블로그 포스트가 명확히 구분됨
- ✅ 프로젝트만의 고유한 메타데이터 정의 가능 (기술 스택, GitHub 링크, 데모 URL, 프로젝트 기간 등)
- ✅ 독립적인 URL 구조 (`/projects/프로젝트명/`)
- ✅ 프로젝트 전용 레이아웃 사용 가능

#### 단점
- ❌ Jekyll 설정 및 구조 변경 필요
- ❌ 새로운 레이아웃 파일 작성 필요

#### 구현 방법
1. `_config.yml`에 프로젝트 컬렉션 추가:
   ```yaml
   collections:
     projects:
       output: true
       permalink: /projects/:name/
   ```

2. `_layouts/project.html` 생성 (프로젝트 전용 레이아웃)

3. 프로젝트 포스트 frontmatter 예시:
   ```yaml
   ---
   layout: project
   title: "AI 챗봇 프로젝트"
   category: AI-ML
   tech_stack: [Python, TensorFlow, FastAPI]
   github: https://github.com/username/chatbot
   demo: https://demo.example.com
   period: "2024.03 - 2024.06"
   thumbnail: /assets/images/projects/chatbot.png
   ---
   ```

---

### 방안 2: 기존 포스트 시스템 활용

프로젝트도 `_posts/` 폴더에서 관리하되, **프로젝트 카테고리를 명확히 구분**

#### 구조
```
_posts/
  ├── 2024-03/
  │   ├── 2024-03-15-chatbot-project.md  (category: AI-ML)
  │   └── 2024-03-20-python-tutorial.md  (category: programming)
  ├── 2024-06/
  │   └── 2024-06-10-portfolio-web.md    (category: 웹개발)
```

#### 장점
- ✅ 기존 구조 그대로 사용 가능
- ✅ 빠른 구현 가능
- ✅ Jekyll Archives 플러그인 자동 활용

#### 단점
- ❌ 블로그 포스트와 프로젝트가 섞임
- ❌ 모든 URL이 `/blog/년/월/일/제목/` 형식
- ❌ 프로젝트만의 특별한 메타데이터 추가가 제한적

#### 구현 방법
1. 프로젝트 포스트 작성 시 카테고리를 `AI-ML`, `웹개발`, `데이터분석`, `토이프로젝트` 중 하나로 설정
2. 기존 [projects.html](/_pages/projects.html) 파일 그대로 사용
3. Jekyll Archives 플러그인이 자동으로 카테고리 페이지 생성

---

### 방안 3: 하이브리드 방식

프로젝트는 독립 컬렉션으로 관리하되, **기존 포스트 시스템과 연동**

#### 구조
```
_projects/          # 프로젝트 메인 페이지용
  └── chatbot.md
_posts/             # 프로젝트 관련 블로그 글
  └── 2024-03-15-chatbot-development-log.md
```

#### 특징
- 프로젝트 메인 페이지: 프로젝트 개요, 데모, GitHub 링크 등
- 관련 블로그 포스트: 개발 과정, 트러블슈팅, 회고 등
- 프로젝트 페이지에서 관련 블로그 포스트 자동 링크

---

## 🏆 최종 권장안: 방안 1 (독립적인 프로젝트 컬렉션)

### 권장 이유
1. **확장성**: 프로젝트가 늘어날수록 관리가 용이
2. **SEO**: 프로젝트 전용 URL 구조로 검색 엔진 최적화
3. **사용자 경험**: 포트폴리오로서의 전문성 강조
4. **유지보수**: 블로그와 프로젝트의 명확한 분리

### 프로젝트 전용 기능
프로젝트 레이아웃에 다음 요소를 추가할 수 있습니다:

1. **프로젝트 헤더**
   - 프로젝트 썸네일 이미지
   - 기술 스택 뱃지
   - GitHub/Demo 링크 버튼
   - 프로젝트 기간

2. **프로젝트 상세**
   - 프로젝트 개요
   - 주요 기능
   - 기술적 도전과 해결
   - 스크린샷/데모 영상
   - 성과 지표

3. **관련 리소스**
   - GitHub 저장소
   - 라이브 데모
   - 발표 자료
   - 관련 블로그 포스트

---

## 📝 구현 단계

### Phase 1: 프로젝트 컬렉션 설정
1. `_config.yml` 수정 (컬렉션 추가)
2. `_layouts/project.html` 생성
3. `_projects/` 폴더 생성

### Phase 2: 프로젝트 페이지 수정
1. `_pages/projects.html` 수정 (컬렉션 참조로 변경)
2. 카테고리별 필터링 로직 업데이트

### Phase 3: 샘플 프로젝트 작성
1. 각 카테고리별 샘플 프로젝트 1개씩 작성
2. 실제 프로젝트 데이터로 교체

### Phase 4: 스타일링 및 최적화
1. 프로젝트 카드 디자인 개선
2. 반응형 레이아웃 최적화
3. 이미지 최적화

---

## 🎨 프로젝트 레이아웃 예시

```html
<!-- _layouts/project.html -->
---
layout: default
---

<article class="project max-w-6xl mx-auto">
  <!-- Project Hero -->
  <header class="mb-8">
    {% if page.thumbnail %}
    <img src="{{ page.thumbnail }}" alt="{{ page.title }}"
         class="w-full h-64 object-cover rounded-lg mb-6">
    {% endif %}

    <h1 class="text-4xl font-bold mb-4">{{ page.title }}</h1>

    <!-- Meta Info -->
    <div class="flex flex-wrap gap-4 mb-6">
      <span class="badge">{{ page.category }}</span>
      <span class="text-muted-foreground">{{ page.period }}</span>
    </div>

    <!-- Tech Stack -->
    <div class="flex flex-wrap gap-2 mb-6">
      {% for tech in page.tech_stack %}
      <span class="tech-badge">{{ tech }}</span>
      {% endfor %}
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-3">
      {% if page.github %}
      <a href="{{ page.github }}" class="btn-primary">
        GitHub
      </a>
      {% endif %}

      {% if page.demo %}
      <a href="{{ page.demo }}" class="btn-secondary">
        Live Demo
      </a>
      {% endif %}
    </div>
  </header>

  <!-- Project Content -->
  <div class="prose max-w-none">
    {{ content }}
  </div>
</article>
```

---

## 🔧 다음 단계

1. **결정**: 위 방안 중 선택
2. **구현**: 선택한 방안에 따라 코드 수정
3. **테스트**: 로컬에서 Jekyll 빌드 및 테스트
4. **배포**: GitHub Pages에 배포

---

## 💡 추가 제안

### 프로젝트 필터링 기능
- 기술 스택별 필터
- 연도별 필터
- 카테고리별 탭

### 프로젝트 검색
- search.json에 프로젝트 데이터 추가
- 통합 검색 기능

### 프로젝트 갤러리 뷰
- 그리드 뷰 / 리스트 뷰 토글
- 썸네일 중심의 비주얼 갤러리

---

**문서 작성일**: 2025-10-07
**작성자**: Claude Code Assistant
