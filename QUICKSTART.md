# AutoBlog 빠른 시작 가이드 ⚡

AutoBlog를 5분 안에 시작하는 방법을 알려드립니다!

## 1단계: 프로젝트 클론 (1분)

```bash
git clone https://github.com/1di0t/autoblog.git
cd autoblog
npm install
```

## 2단계: Jekyll 테스트 (2분)

```bash
# Ruby가 설치되어 있다면
bundle install
bundle exec jekyll serve

# 브라우저에서 확인
# http://localhost:4000
```

> **Ruby가 없다면?**
> - Windows: https://rubyinstaller.org/
> - Mac: `brew install ruby`
> - Ubuntu: `sudo apt-get install ruby-full`

## 3단계: Obsidian 연결 (2분)

1. **Obsidian 실행**
2. **Open folder as vault** 클릭
3. `autoblog` 폴더 선택

이제 Obsidian에서 바로 블로그를 작성할 수 있습니다!

---

## 첫 포스트 작성하기

### 방법 1: 수동 작성 (Jekyll 기본)

```bash
# _posts 폴더에 파일 생성
echo "---
title: My First Post
date: 2025-10-18
---

# Hello World

This is my first post!" > _posts/2025-10-18-my-first-post.md

# Jekyll에서 확인
bundle exec jekyll serve
```

### 방법 2: Obsidian에서 작성

1. Obsidian에서 `_posts` 폴더에 새 노트 생성
2. 파일명: `2025-10-18-my-first-post.md`
3. 내용 작성 후 저장
4. 자동으로 블로그에 반영됨!

---

## 다음 단계

기본 설정이 완료되었습니다! 이제 고급 기능을 추가해보세요:

### 🔄 멀티 기기 동기화 (선택)
- **필요**: Dropbox 계정
- **소요 시간**: 15분
- **가이드**: [SETUP.md - Phase 2](SETUP.md#phase-2-obsidian-설정-30분)

### 🤖 Claude AI 자동 정리 (선택)
- **필요**: Claude Desktop
- **소요 시간**: 30분
- **가이드**: [SETUP.md - Phase 3](SETUP.md#phase-3-claude-desktop--mcp-연동-30분)

### 🚀 Cloudflare Pages 배포 (선택)
- **필요**: Cloudflare 계정
- **소요 시간**: 15분
- **가이드**: [SETUP.md - Phase 5](SETUP.md#phase-5-cloudflare-pages-설정-15분)

---

## 자주 묻는 질문

### Q: Jekyll이 안 되는데요?

```bash
# Ruby 버전 확인 (3.0 이상 필요)
ruby --version

# Bundler 설치
gem install bundler

# 다시 시도
bundle install
bundle exec jekyll serve
```

### Q: Obsidian에서 작성한 파일이 블로그에 안 나와요

1. 파일이 `_posts` 폴더에 있는지 확인
2. 파일명이 `YYYY-MM-DD-제목.md` 형식인지 확인
3. Front matter가 올바른지 확인:
   ```yaml
   ---
   title: "제목"
   date: 2025-10-18
   ---
   ```

### Q: 모바일에서도 작성하고 싶어요

**Remotely Save 플러그인**을 설치하면 됩니다:
- iOS/Android Obsidian 앱 설치
- Remotely Save 플러그인 설정
- Dropbox 연동
- 자세한 가이드: [SETUP.md - Phase 2](SETUP.md#phase-2-obsidian-설정-30분)

---

## 도움이 필요하신가요?

- 📖 **전체 설치 가이드**: [SETUP.md](SETUP.md)
- 📋 **전체 계획서**: [Plan.md](Plan.md)
- 💬 **이슈/질문**: [GitHub Issues](https://github.com/1di0t/autoblog/issues)

---

**축하합니다! 🎉**

이제 AutoBlog로 블로그를 시작할 준비가 되었습니다!
