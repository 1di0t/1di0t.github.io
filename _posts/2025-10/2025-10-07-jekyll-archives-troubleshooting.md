---
layout: post
title: GitHub Pages에서 jekyll-archives 플러그인이 작동하지 않는 문제 해결하기
category: 학습 (Study)
tags:
  - jekyll
  - github-pages
  - troubleshooting
  - web-development
excerpt: Jekyll 블로그에서 카테고리와 태그 페이지가 404 에러를 반환하거나 포스트를 표시하지 못하는 문제를 단계별로 해결한 경험을 공유합니다.
parent_category: documentation
learning_framework:
  stage: digestion
  pacer_type: procedural
  pacer_types:
    - procedural
    - evidence
---

## 문제 상황

Jekyll로 만든 블로그를 GitHub Pages에 배포했는데, 카테고리와 태그 페이지가 제대로 작동하지 않았습니다.

- **카테고리 페이지**: 404 Not Found 에러
- **태그 페이지**: 페이지는 로드되지만 "0개의 글" 표시
- **로컬 환경**: 정상 작동
- **GitHub Pages 배포 후**: 문제 발생

## 원인 분석

### 1. GitHub Pages의 플러그인 제약

GitHub Pages는 보안상의 이유로 [화이트리스트에 있는 플러그인](https://pages.github.com/versions/)만 지원합니다. `jekyll-archives`는 이 목록에 포함되어 있지 않아, 기본 GitHub Pages 빌드에서는 작동하지 않습니다.

```yaml
# Gemfile
group :jekyll_plugins do
  gem "jekyll-archives"  # ❌ GitHub Pages에서 미지원
end
```

### 2. GitHub Actions를 통한 우회

다행히 GitHub Actions를 사용하면 이 제약을 우회할 수 있습니다. GitHub Actions에서 직접 Jekyll을 빌드하면 모든 플러그인을 사용할 수 있습니다.

```yaml
# .github/workflows/deploy.yml
- name: Build with Jekyll
  run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
  env:
    JEKYLL_ENV: production
```

### 3. 한글 카테고리/태그 URL 문제

jekyll-archives는 non-ASCII 문자(한글, 중국어, 일본어 등)로 된 카테고리/태그의 경우, 페이지는 생성하지만 URL 접근이 제대로 되지 않는 [알려진 이슈](https://github.com/jekyll/jekyll-archives/issues/146)가 있습니다.

```yaml
# ❌ 문제가 되는 설정
category: 공부
tags: [프롬프트, AI, 머신러닝]
```

**해결 방법**: 카테고리와 태그를 영문으로 변경

```yaml
# ✅ 해결된 설정
category: study
tags: [prompt-engineering, ai, machine-learning]
```

### 4. 레이아웃 변수 오류

가장 중요한 문제는 **레이아웃 파일에서 잘못된 변수를 사용**하고 있었던 것입니다.

**잘못된 코드** (`_layouts/category.html`):

```liquid
{% raw %}<!-- ❌ site.categories를 사용 -->
<p>총 {{ site.categories[page.category] | size }}개의 글</p>

{% for post in site.categories[page.category] %}
  <!-- 포스트 목록 -->
{% endfor %}{% endraw %}
```

jekyll-archives는 자체적으로 페이지 변수를 제공하는데, 이를 무시하고 `site.categories`를 사용하면 빈 배열이 반환됩니다.

**올바른 코드**:

```liquid
{% raw %}<!-- ✅ jekyll-archives가 제공하는 page.posts 사용 -->
<p>총 {{ page.posts | size }}개의 글</p>

{% for post in page.posts %}
  <!-- 포스트 목록 -->
{% endfor %}{% endraw %}
```

## jekyll-archives의 페이지 변수

jekyll-archives는 다음과 같은 [페이지 변수](https://jekyll.github.io/jekyll-archives/layouts/)를 제공합니다:

| 변수 | 설명 |
|------|------|
| `page.title` | 카테고리/태그의 이름 |
| `page.type` | 아카이브 타입 (`category`, `tag`, `year` 등) |
| `page.posts` | **해당 카테고리/태그의 포스트 배열** |
| `page.date` | 날짜 기반 아카이브의 경우 날짜 정보 |

## 해결 과정

### 1단계: GitHub Actions 워크플로우 설정

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'
          bundler-cache: true

      - name: Build with Jekyll
        run: bundle exec jekyll build
        env:
          JEKYLL_ENV: production

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 2단계: GitHub Pages 설정 변경

GitHub 저장소 → Settings → Pages → Source를 **"GitHub Actions"**로 변경

### 3단계: 카테고리/태그 영문으로 변경

```yaml
# _posts/2025-10-06-my-post.md
---
layout: post
title: "내 포스트"
category: study  # 공부 → study
tags: [ai, machine-learning]  # 한글 → 영문
---
```

### 4단계: 레이아웃 파일 수정

**category.html**:

```liquid
{% raw %}---
layout: default
---

<div class="category-page">
  <h1>{{ page.title }}</h1>
  <p>총 {{ page.posts | size }}개의 글</p>

  {% for post in page.posts %}
    <article>
      <h2>{{ post.title }}</h2>
      <time>{{ post.date | date: "%Y-%m-%d" }}</time>
      <p>{{ post.excerpt }}</p>
    </article>
  {% endfor %}
</div>{% endraw %}
```

**tag.html**:

```liquid
{% raw %}---
layout: default
---

<div class="tag-page">
  <h1>{{ page.title }}</h1>
  <p>총 {{ page.posts | size }}개의 글</p>

  {% for post in page.posts %}
    <article>
      <h2>{{ post.title }}</h2>
      <p>{{ post.excerpt }}</p>
    </article>
  {% endfor %}
</div>{% endraw %}
```

## 검증

빌드 후 다음 URL들이 정상 작동하는지 확인:

- 카테고리: `https://yourblog.github.io/category/study/`
- 태그: `https://yourblog.github.io/tags/ai/`

## 핵심 요약

1. **GitHub Pages는 jekyll-archives를 지원하지 않음** → GitHub Actions로 빌드
2. **한글 카테고리/태그는 URL 문제 발생** → 영문으로 변경
3. **레이아웃에서 `site.categories` 대신 `page.posts` 사용** → jekyll-archives 전용 변수 활용

## 참고 자료

- [jekyll-archives 공식 문서](https://jekyll.github.io/jekyll-archives/)
- [GitHub Pages 지원 플러그인 목록](https://pages.github.com/versions/)
- [Jekyll과 GitHub Actions](https://jekyllrb.com/docs/continuous-integration/github-actions/)
- [jekyll-archives non-ASCII 이슈 #146](https://github.com/jekyll/jekyll-archives/issues/146)

## 마무리

Jekyll 블로그를 운영하면서 발생할 수 있는 흔한 문제이지만, 원인을 파악하면 해결은 의외로 간단합니다. 특히 플러그인의 공식 문서를 꼼꼼히 읽어보는 것이 중요하다는 것을 배웠습니다.

동일한 문제를 겪는 분들에게 이 글이 도움이 되기를 바랍니다! 🚀
