# GitHub Pages 설정 가이드

> Jekyll 블로그를 GitHub Pages로 배포하기 위한 단계별 설정 가이드입니다.

---

## 📋 목차

1. [GitHub Pages란?](#github-pages란)
2. [사전 준비사항](#사전-준비사항)
3. [GitHub Pages 활성화하기](#github-pages-활성화하기)
4. [배포 확인하기](#배포-확인하기)
5. [문제 해결](#문제-해결)
6. [참고 자료](#참고-자료)

---

## 🌐 GitHub Pages란?

**GitHub Pages**는 GitHub에서 제공하는 무료 정적 사이트 호스팅 서비스입니다.

### 주요 특징
- ✅ **무료**: 별도 비용 없이 사용 가능
- ✅ **간편한 배포**: Git push만으로 자동 배포
- ✅ **HTTPS 지원**: 무료 SSL 인증서 제공
- ✅ **커스텀 도메인**: 본인 소유 도메인 연결 가능
- ✅ **Jekyll 지원**: Jekyll 사이트를 자동으로 빌드

### 사용 가능한 URL 형식
- **User/Organization 사이트**: `https://<username>.github.io`
- **프로젝트 사이트**: `https://<username>.github.io/<repository>`

---

## 🔧 사전 준비사항

### 1. 저장소 이름 확인

**User/Organization 사이트**를 만들려면 저장소 이름이 다음 형식이어야 합니다:

```
<username>.github.io
```

예시:
- GitHub 사용자명이 `1di0t`인 경우
- 저장소 이름: `1di0t.github.io` ✅

> **참고**: 현재 저장소 이름이 `https://github.com/1di0t/1di0t.github.io`로 올바르게 설정되어 있습니다.

### 2. 필요한 파일 확인

다음 파일들이 저장소에 있어야 합니다:

- ✅ `_config.yml` - Jekyll 설정 파일
- ✅ `.github/workflows/deploy.yml` - GitHub Actions 배포 워크플로우
- ✅ `_posts/` - 블로그 포스트 디렉토리
- ✅ `index.html` - 메인 페이지

현재 저장소에는 모든 필수 파일이 준비되어 있습니다.

---

## ⚙️ GitHub Pages 활성화하기

### 방법 1: GitHub 웹사이트에서 설정 (권장)

#### 1단계: 저장소 설정으로 이동

1. 웹 브라우저에서 GitHub 저장소로 이동:
   ```
   https://github.com/1di0t/1di0t.github.io
   ```

2. 상단 메뉴에서 **Settings** (⚙️) 클릭

#### 2단계: Pages 설정 찾기

1. 왼쪽 사이드바에서 **Pages** 메뉴 클릭
2. "Build and deployment" 섹션 확인

#### 3단계: Source 설정

**Source** 드롭다운에서 다음 중 하나를 선택:

##### 옵션 A: GitHub Actions 사용 (권장)

```
Source: GitHub Actions
```

- 현재 저장소에는 `.github/workflows/deploy.yml` 파일이 있으므로 이 옵션을 선택하면 자동으로 Jekyll 빌드 및 배포가 진행됩니다.
- 장점: 커스텀 빌드 프로세스 가능 (Tailwind CSS 등)

##### 옵션 B: Deploy from a branch

```
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

- Jekyll 기본 설정만 사용하는 경우
- 단점: 커스텀 빌드 스크립트 실행 불가

> **추천**: 현재 프로젝트는 Tailwind CSS를 사용하므로 **"GitHub Actions"** 옵션을 선택하세요.

#### 4단계: 설정 저장

1. **Save** 버튼 클릭
2. 설정이 저장되면 자동으로 첫 배포가 시작됩니다

---

### 방법 2: 명령줄에서 확인 및 트리거

GitHub Pages 설정은 GitHub 웹사이트에서만 활성화할 수 있지만, 명령줄에서 배포를 트리거할 수 있습니다:

```bash
# 저장소 상태 확인
git status

# 변경사항이 있다면 커밋
git add .
git commit -m "Enable GitHub Pages"

# 원격 저장소로 푸시 (배포 트리거)
git push origin main
```

푸시하면 GitHub Actions 워크플로우가 자동으로 실행됩니다.

---

## 🚀 배포 확인하기

### 1. GitHub Actions 워크플로우 확인

1. GitHub 저장소로 이동
2. 상단 메뉴에서 **Actions** 탭 클릭
3. 최근 워크플로우 실행 확인

워크플로우 단계:
```
1. ✅ Checkout - 코드 가져오기
2. ✅ Setup Ruby - Ruby 설치
3. ✅ Setup Node.js - Node.js 설치
4. ✅ Install Node dependencies - npm 패키지 설치
5. ✅ Build Tailwind CSS - CSS 빌드
6. ✅ Setup Pages - GitHub Pages 설정
7. ✅ Build with Jekyll - Jekyll 빌드
8. ✅ Upload artifact - 빌드 결과물 업로드
9. ✅ Deploy to GitHub Pages - 배포
```

### 2. 배포 상태 확인

**Settings → Pages**로 이동하면 다음과 같은 메시지가 표시됩니다:

```
✅ Your site is live at https://1di0t.github.io/
```

### 3. 사이트 접속

브라우저에서 다음 URL로 접속:

```
https://1di0t.github.io
```

> **참고**: 첫 배포는 3-5분 정도 소요될 수 있습니다.

---

## 🔍 문제 해결

### 문제 1: "Your site is published at..." 메시지가 보이지 않음

**원인**: GitHub Pages가 아직 활성화되지 않음

**해결 방법**:
1. **Settings → Pages**로 이동
2. Source를 **GitHub Actions**로 설정
3. 저장 후 다시 푸시

```bash
git commit --allow-empty -m "Trigger GitHub Pages"
git push origin main
```

---

### 문제 2: Actions 탭에서 워크플로우가 실행되지 않음

**원인**: Actions 권한이 비활성화됨

**해결 방법**:
1. **Settings → Actions → General**로 이동
2. **Workflow permissions** 섹션에서 다음을 선택:
   - ✅ **Read and write permissions**
3. **Save** 클릭

---

### 문제 3: 빌드는 성공했지만 페이지가 404 에러

**원인**: `_config.yml`의 `baseurl` 또는 `url` 설정 오류

**해결 방법**:

`_config.yml` 파일 확인:

```yaml
# User/Organization 사이트의 경우
baseurl: ""
url: "https://1di0t.github.io"

# 프로젝트 사이트의 경우 (예: github.com/username/my-blog)
baseurl: "/my-blog"
url: "https://username.github.io"
```

현재 설정:
```yaml
baseurl: ""
url: "https://1di0t.github.io"
```
✅ 올바르게 설정되어 있습니다.

---

### 문제 4: CSS나 이미지가 로드되지 않음

**원인**: 경로 설정 오류

**해결 방법**:

1. `_config.yml`의 `url`과 `baseurl` 확인
2. 레이아웃 파일에서 경로를 다음과 같이 수정:

```html
<!-- 절대 경로 사용 (권장) -->
<link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">

<!-- 상대 경로는 피하기 -->
<link rel="stylesheet" href="assets/css/main.css"> ❌
```

---

### 문제 5: Jekyll 빌드 실패

**원인**: Gemfile 또는 플러그인 설정 오류

**해결 방법**:

1. **Actions** 탭에서 에러 로그 확인
2. 로컬에서 빌드 테스트:

```bash
# Jekyll 로컬 빌드
bundle install
bundle exec jekyll build

# 로컬 서버 실행
bundle exec jekyll serve
```

3. 빌드가 성공하면 푸시:

```bash
git add .
git commit -m "Fix Jekyll build errors"
git push origin main
```

---

### 문제 6: "pages build and deployment" 권한 오류

**원인**: GitHub Actions 워크플로우에 필요한 권한이 없음

**해결 방법**:

1. **Settings → Actions → General**로 이동
2. **Workflow permissions** 섹션 확인:
   ```
   ✅ Read and write permissions
   ✅ Allow GitHub Actions to create and approve pull requests
   ```
3. **Save** 클릭

---

## 📚 참고 자료

### 공식 문서
- [GitHub Pages 공식 문서](https://docs.github.com/en/pages)
- [Jekyll 공식 문서](https://jekyllrb.com/docs/)
- [GitHub Actions로 Jekyll 배포하기](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)

### 유용한 링크
- [Jekyll 테마 찾기](https://jekyllrb.com/docs/themes/)
- [GitHub Pages 커스텀 도메인 설정](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages 제한사항](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#usage-limits)

---

## ✅ 설정 완료 체크리스트

배포 전 확인사항:

- [ ] GitHub 저장소 이름이 `<username>.github.io` 형식인가?
- [ ] `_config.yml`의 `url`이 올바르게 설정되었는가?
- [ ] GitHub Pages가 **Settings → Pages**에서 활성화되었는가?
- [ ] Source가 **GitHub Actions**로 설정되었는가?
- [ ] Actions 탭에서 워크플로우가 성공적으로 완료되었는가?
- [ ] `https://<username>.github.io`로 접속하여 사이트가 정상적으로 보이는가?

---

## 🎯 다음 단계

GitHub Pages 설정이 완료되었다면:

1. **커스텀 도메인 연결** (선택사항)
   - [CUSTOM_DOMAIN.md](CUSTOM_DOMAIN.md) 참고

2. **SEO 최적화**
   - `_config.yml`에 메타데이터 추가
   - Google Search Console 등록

3. **블로그 포스트 작성**
   - [AI_WORKFLOW.md](AI_WORKFLOW.md) 참고

4. **테마 커스터마이징**
   - CSS, 레이아웃 수정
   - 폰트, 색상 변경

---

## 💡 팁

### 배포 시간 단축하기

`.github/workflows/deploy.yml`에서 캐싱 최적화:

```yaml
- name: Setup Ruby
  uses: ruby/setup-ruby@v1
  with:
    ruby-version: '3.2'
    bundler-cache: true  # 캐싱 활성화

- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'  # npm 캐싱 활성화
```

✅ 현재 설정에 이미 포함되어 있습니다.

### 배포 전 로컬 테스트

항상 로컬에서 먼저 테스트하세요:

```bash
# Jekyll 로컬 서버 실행
bundle exec jekyll serve

# 브라우저에서 확인
# http://localhost:4000
```

### 자동 배포 트리거

`main` 브랜치에 푸시할 때마다 자동으로 배포됩니다:

```bash
git add .
git commit -m "Add new blog post"
git push origin main
```

---

**이제 GitHub Pages 설정이 완료되었습니다! 🎉**

블로그 포스트를 작성하고 푸시하면 자동으로 배포됩니다.