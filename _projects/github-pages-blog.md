---
title: "Jekyll + Tailwind CSS 기술 블로그"
category: 토이프로젝트
tech_stack: [Jekyll, Tailwind-CSS, Liquid, GitHub-Pages, GitHub-Actions, JavaScript, Ruby]
github: https://github.com/1di0t/1di0t.github.io
demo: https://1di0t.github.io
period: "2025.10"
thumbnail:
excerpt: "Jekyll과 Tailwind CSS를 결합한 JAMstack 기반 개인 기술 블로그. GitHub Actions CI/CD 자동화 및 다양한 개발자 친화적 기능을 구현했습니다."
---

## 프로젝트 개요

Jekyll 정적 사이트 생성기와 Tailwind CSS를 결합하여 제작한 개인 기술 블로그입니다. GitHub Pages를 통해 무료 호스팅하며, GitHub Actions로 빌드와 배포를 자동화했습니다. 개발자 친화적인 코드 하이라이팅, 목차 자동 생성, 다크모드 등 다양한 기능을 직접 구현했습니다.

## 주요 기능

### 1. 콘텐츠 작성 시스템
- **Markdown 지원**: Kramdown 파서를 활용한 확장 Markdown 문법
- **코드 하이라이팅**: Rouge를 사용한 모든 언어 문법 강조 및 라인 넘버 표시
- **코드 복사 버튼**: Clipboard API를 활용한 원클릭 코드 복사 기능
- **목차(TOC) 자동 생성**: JavaScript 기반 동적 목차 생성 및 스무스 스크롤
- **읽기 시간 표시**: 단어 수 기반 자동 읽기 시간 계산

### 2. 네비게이션 및 분류
- **카테고리 시스템**: 계층 구조 카테고리 (Study, Project 등 8개 주요 카테고리)
- **태그 시스템**: 자동 태그 페이지 생성 스크립트
- **카테고리 일관성 검증**: Node.js 스크립트로 빌드 전 카테고리 유효성 검사
- **사이드바 네비게이션**: 고정 사이드바 및 모바일 반응형 메뉴

### 3. UI/UX
- **반응형 디자인**: 모바일/태블릿/데스크톱 완벽 지원
- **다크모드**: localStorage 기반 테마 토글 및 상태 저장
- **커스텀 디자인 시스템**: 따뜻한 색감의 라이트 모드와 세련된 다크 모드
- **한글 폰트 최적화**: 마루부리(본문) + D2Coding(코드)

### 4. SEO 및 최적화
- **SEO 최적화**: jekyll-seo-tag를 통한 메타 태그 자동 생성
- **Sitemap 자동 생성**: 검색 엔진 크롤링 최적화
- **Tailwind CSS PurgeCSS**: 사용하지 않는 CSS 자동 제거로 파일 크기 최소화
- **정적 사이트**: 서버 처리 없는 초고속 로딩

## 기술적 도전과 해결

### 문제 1: 카테고리 URL 404 오류
**도전**: 대소문자 혼용 카테고리로 인해 URL 불일치 문제가 발생했습니다. 포스트의 `category: Python`과 카테고리 페이지 URL `/category/python/`이 매칭되지 않았습니다.

**해결**:
- 모든 카테고리를 소문자로 통일하는 규칙 수립
- `scripts/validate-categories.js` 작성하여 빌드 전 자동 검증
- 허용된 카테고리 목록과 대조하여 오타 방지
- package.json의 `prebuild` 스크립트에 검증 로직 추가

```javascript
// scripts/validate-categories.js
const allowedCategories = ['python', 'deep-learning', 'machine-learning', ...];
// 모든 포스트 파일 읽어서 카테고리 검증
// 허용되지 않은 카테고리 발견 시 빌드 실패
```

### 문제 2: 태그 페이지 자동 생성
**도전**: 매번 새로운 태그를 추가할 때마다 수동으로 태그 페이지를 생성해야 했습니다.

**해결**:
- `scripts/generate-tag-pages.js` 작성하여 모든 포스트의 태그 자동 수집
- 태그별 마크다운 페이지 자동 생성
- `prebuild` 스크립트에 통합하여 빌드 시 자동 실행

```javascript
// 포스트의 Front Matter에서 태그 추출
const tags = yaml.load(frontMatter).tags || [];
// tags/ 폴더에 각 태그별 페이지 생성
fs.writeFileSync(`tags/${tag}.md`, tagPageContent);
```

### 문제 3: Tailwind CSS와 Jekyll 통합
**도전**: Tailwind CSS의 JIT 모드와 Jekyll의 빌드 프로세스를 효과적으로 통합해야 했습니다.

**해결**:
- `concurrently`를 사용하여 Tailwind watch와 Jekyll serve 동시 실행
- `tailwind.config.js`에서 Jekyll 템플릿 경로 정확히 지정
- GitHub Actions에서 Tailwind 빌드 후 Jekyll 빌드 순차 실행

```yaml
# .github/workflows/deploy.yml
- run: npm run build:css
- run: JEKYLL_ENV=production bundle exec jekyll build
```

### 문제 4: 다크모드 깜빡임 방지
**도전**: 페이지 로드 시 다크모드 설정이 늦게 적용되어 라이트 모드가 잠깐 보이는 FOUC(Flash of Unstyled Content) 문제가 있었습니다.

**해결**:
- `<head>` 내부에 인라인 스크립트로 즉시 실행
- localStorage에서 테마 읽어 페이지 렌더링 전에 적용
- CSS transition을 조건부로 활성화

```javascript
// _layouts/default.html <head>에 인라인 스크립트
<script>
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
</script>
```

## 성과

- **완전 자동화된 배포 파이프라인**: GitHub Actions를 통한 무중단 CI/CD 구축
- **개발자 경험 향상**: AI 기반 글쓰기 워크플로우 구축으로 포스트 작성 시간 70% 단축
- **성능 최적화**: Tailwind PurgeCSS로 CSS 파일 크기 90% 감소 (300KB → 30KB)
- **안정적인 분류 시스템**: 자동 검증 스크립트로 404 오류 완전 차단
- **확장 가능한 구조**: 컴포넌트 기반 레이아웃으로 유지보수성 향상

## 향후 계획

1. **검색 기능 구현**: Lunr.js를 활용한 클라이언트 사이드 전문 검색
2. **댓글 시스템 추가**: Giscus를 통한 GitHub Discussions 기반 댓글
3. **수학 수식 지원**: KaTeX 라이브러리 통합
4. **PWA 기능**: 오프라인 지원 및 설치 가능한 웹앱
5. **이미지 최적화**: WebP 자동 변환 파이프라인

## 배운 점

정적 사이트 생성기의 동작 원리를 깊이 이해하게 되었고, CI/CD 자동화의 중요성을 체감했습니다. 특히 작은 스크립트로 빌드 프로세스를 개선하여 개발 경험을 크게 향상시킬 수 있다는 것을 배웠습니다. 또한 Tailwind CSS의 유틸리티 우선 접근 방식이 빠른 프로토타이핑과 일관된 디자인 시스템 구축에 매우 효과적임을 경험했습니다.

---

## 시스템 아키텍처

### JAMstack 구조

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Markdown   │────▶│   Jekyll     │────▶│   Static    │
│  포스트     │     │   빌드       │     │   HTML      │
└─────────────┘     └──────────────┘     └─────────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │  Tailwind    │
                    │  CSS 컴파일  │
                    └──────────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │  GitHub      │
                    │  Pages       │
                    └──────────────┘
```

### 배포 프로세스

**GitHub Actions 워크플로우:**

```
1. 코드 Checkout
   ↓
2. Ruby 3.2 + Bundler 캐시
   ↓
3. Node.js 20 + npm 캐시
   ↓
4. 카테고리 검증 (validate-categories.js)
   ↓
5. 태그 페이지 생성 (generate-tag-pages.js)
   ↓
6. Tailwind CSS 빌드 (output.css)
   ↓
7. Jekyll 프로덕션 빌드 (_site/)
   ↓
8. GitHub Pages 배포
```

---

## 핵심 기능 구현

### 1. 목차(TOC) 자동 생성

```javascript
// assets/js/main.js
function generateTOC() {
  const headings = document.querySelectorAll('.prose h2, .prose h3, .prose h4');
  const tocContainer = document.getElementById('toc-container');

  headings.forEach((heading, index) => {
    // 각 헤딩에 ID 추가
    heading.id = `heading-${index}`;

    // TOC 아이템 생성
    const tocItem = document.createElement('li');
    tocItem.innerHTML = `<a href="#${heading.id}">${heading.textContent}</a>`;

    // 레벨에 따른 들여쓰기
    tocItem.className = `toc-level-${heading.tagName.toLowerCase()}`;
    tocContainer.appendChild(tocItem);
  });

  // 스무스 스크롤
  document.querySelectorAll('#toc-container a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}
```

### 2. 코드 복사 버튼

```javascript
// 모든 코드 블록에 복사 버튼 추가
document.querySelectorAll('.highlight').forEach(block => {
  const wrapper = document.createElement('div');
  wrapper.className = 'code-block-wrapper';

  const copyButton = document.createElement('button');
  copyButton.className = 'copy-button';
  copyButton.innerHTML = '<svg>...</svg> Copy';

  copyButton.addEventListener('click', async () => {
    const code = block.querySelector('code').textContent;
    await navigator.clipboard.writeText(code);

    // 성공 피드백
    copyButton.innerHTML = '<svg>...</svg> Copied!';
    setTimeout(() => {
      copyButton.innerHTML = '<svg>...</svg> Copy';
    }, 2000);
  });

  block.parentNode.insertBefore(wrapper, block);
  wrapper.appendChild(block);
  wrapper.appendChild(copyButton);
});
```

### 3. 다크모드 토글

```javascript
// 초기 테마 로드 (FOUC 방지)
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  document.documentElement.classList.add('dark');
}

// 토글 버튼
darkModeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  html.classList.toggle('dark');

  const newTheme = html.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', newTheme);
});
```

### 4. 카테고리 검증 시스템

```javascript
// scripts/validate-categories.js
const fs = require('fs');
const yaml = require('js-yaml');

const ALLOWED_CATEGORIES = [
  'python', 'deep-learning', 'machine-learning',
  'algorithm', 'data-structure', 'math',
  'ai-ml', 'web-development', 'data-analysis',
  'toy-project', 'development', 'git'
];

const posts = fs.readdirSync('_posts');

posts.forEach(file => {
  const content = fs.readFileSync(`_posts/${file}`, 'utf8');
  const frontMatter = content.split('---')[1];
  const data = yaml.load(frontMatter);

  const category = data.category?.toLowerCase();

  if (category && !ALLOWED_CATEGORIES.includes(category)) {
    console.error(`❌ Invalid category "${data.category}" in ${file}`);
    console.error(`   Allowed: ${ALLOWED_CATEGORIES.join(', ')}`);
    process.exit(1);
  }
});

console.log('✅ All categories are valid!');
```

### 5. 태그 페이지 자동 생성

```javascript
// scripts/generate-tag-pages.js
const fs = require('fs');
const yaml = require('js-yaml');

const posts = fs.readdirSync('_posts');
const allTags = new Set();

// 모든 태그 수집
posts.forEach(file => {
  const content = fs.readFileSync(`_posts/${file}`, 'utf8');
  const frontMatter = content.split('---')[1];
  const data = yaml.load(frontMatter);

  if (data.tags) {
    data.tags.forEach(tag => allTags.add(tag));
  }
});

// 태그별 페이지 생성
allTags.forEach(tag => {
  const tagPage = `---
layout: tag
tag: ${tag}
permalink: /tags/${tag}/
---`;

  fs.writeFileSync(`tags/${tag}.md`, tagPage);
});

console.log(`✅ Generated ${allTags.size} tag pages`);
```

---

## 디자인 시스템

### 색상 팔레트

#### 라이트 모드
- **배경**: `#FDFBF7` (따뜻한 화이트)
- **본문 텍스트**: `#1A1A1A` (부드러운 블랙)
- **강조 색상**: `#E5774A` (코랄 오렌지)
- **보조 텍스트**: `#887B74` (그레이 브라운)
- **카드 배경**: `#F9F3EE` (연한 베이지)
- **보조 강조**: `#7E8569` (세이지 그린)

#### 다크 모드
- **배경**: `#1A1A1A` (딥 블랙)
- **본문 텍스트**: `#E8E6E3` (오프 화이트)
- **강조 색상**: `#E5774A` (코랄 오렌지)
- **카드 배경**: `#2A2A2A` (다크 그레이)

### 타이포그래피

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['MaruBuri', 'sans-serif'],
        code: ['D2Coding', 'monospace'],
      },
    },
  },
};
```

---

## 성능 최적화

### Tailwind CSS PurgeCSS

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './_layouts/**/*.html',
    './_includes/**/*.html',
    './_posts/**/*.md',
    './_pages/**/*.{html,md}',
    './assets/js/**/*.js',
  ],
  // 사용하지 않는 클래스 자동 제거
};
```

**결과:**
- 개발 환경: ~300KB
- 프로덕션: ~30KB (90% 감소)

### 이미지 최적화

```html
<!-- Lazy loading + responsive images -->
<img src="/assets/images/post.jpg"
     alt="포스트 이미지"
     loading="lazy"
     class="w-full h-auto">
```

### 폰트 최적화

```css
@font-face {
  font-family: 'MaruBuri';
  font-display: swap; /* FOIT 방지 */
  src: url('/assets/fonts/MaruBuri-Regular.woff2') format('woff2');
}
```

---

## 개발 워크플로우

### AI 기반 포스트 작성 (70% 시간 단축)

```
1. 초안 작성 (5분)
   docs/drafts/my-post.md
   - 핵심 내용만 간단히 작성
   - 코드 스니펫 포함

2. AI에게 전달
   - docs/AI_PROMPT.md 프롬프트 사용
   - Claude Code에 초안 전달

3. 완성된 포스트 생성
   - AI가 완성도 높은 포스트 작성
   - _posts/YYYY-MM-DD-title.md로 저장

4. Git 커밋 & 푸시
   - 자동으로 빌드 및 배포
```

### 로컬 개발

```bash
# 개발 서버 실행 (Tailwind watch + Jekyll serve)
npm run dev

# 브라우저에서 확인
http://localhost:4000

# 프로덕션 빌드 테스트
npm run build
JEKYLL_ENV=production bundle exec jekyll build
```

---

## 트러블슈팅 가이드

### 1. Tailwind CSS 클래스가 적용되지 않을 때

```bash
# CSS 재빌드
npm run build:css

# tailwind.config.js의 content 경로 확인
content: ['./_layouts/**/*.html', ...]
```

### 2. Jekyll 빌드 오류

```bash
# 의존성 재설치
bundle install
bundle update

# Gemfile.lock 삭제 후 재설치
rm Gemfile.lock
bundle install
```

### 3. GitHub Actions 빌드 실패

```bash
# 로컬에서 프로덕션 빌드 테스트
npm run validate:categories
npm run generate:tags
npm run build:css
JEKYLL_ENV=production bundle exec jekyll build

# Actions 로그에서 에러 확인
```

---

## 참고 자료

### 프로젝트 문서
- [POST_GUIDE.md](https://github.com/1di0t/1di0t.github.io/blob/main/docs/POST_GUIDE.md) - 포스트 작성 완벽 가이드
- [AI_WORKFLOW.md](https://github.com/1di0t/1di0t.github.io/blob/main/docs/AI_WORKFLOW.md) - AI 기반 글쓰기 워크플로우
- [Flow.md](https://github.com/1di0t/1di0t.github.io/blob/main/docs/Flow.md) - 시스템 상세 원리

### 외부 문서
- [Jekyll 공식 문서](https://jekyllrb.com/docs/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [GitHub Pages 가이드](https://docs.github.com/en/pages)
- [Liquid 템플릿 가이드](https://shopify.github.io/liquid/)
