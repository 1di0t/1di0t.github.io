# 🚀 AutoBlog 배포 체크리스트

> 처음부터 끝까지 단계별 배포 가이드

---

## 📋 배포 전 체크리스트

- [ ] Git 커밋 완료
- [ ] 로컬 테스트 완료 (선택)
- [ ] GitHub 계정 로그인

---

## 🎯 배포 프로세스 (5단계)

### 1단계: GitHub에 코드 푸시 (1분)

#### Windows (PowerShell)
```powershell
cd E:\self\AutoBlog

# 변경사항 확인
git status

# 푸시
git push origin main
```

#### macOS/Linux (Terminal)
```bash
cd ~/Projects/AutoBlog

# 변경사항 확인
git status

# 푸시
git push origin main
```

**결과**:
```
Enumerating objects: 20, done.
Counting objects: 100% (20/20), done.
Delta compression using up to 8 threads
Compressing objects: 100% (12/12), done.
Writing objects: 100% (12/12), 15.24 KiB | 5.08 MiB/s, done.
Total 12 (delta 8), reused 0 (delta 0), pack-reused 0
To https://github.com/1di0t/1di0t.github.io.git
   1680fd0..71fdcf4  main -> main
```

✅ **푸시 성공!**

---

### 2단계: GitHub Actions 확인 (1-2분)

#### 1. GitHub Actions 페이지 접속

브라우저에서:
```
https://github.com/1di0t/1di0t.github.io/actions
```

#### 2. 빌드 상태 확인

**진행 상태**:
- 🟡 **노란 점** (진행 중): 1-2분 소요
- ✅ **녹색 체크** (성공): 배포 완료!
- ❌ **빨간 X** (실패): 로그 확인 필요

#### 3. 빌드 로그 확인 (실패 시)

1. 실패한 워크플로우 클릭
2. "Build and deploy" 클릭
3. 빨간 X가 있는 단계 클릭
4. 에러 메시지 확인

**흔한 에러**:
```yaml
# Front matter 문법 오류
Error: YAML syntax error

# 해결: Front matter 확인
---
layout: post
title: "제목"  # 따옴표 필수
date: 2025-10-18  # 날짜 형식
category: programming  # 존재하는 카테고리
tags: [python]
---
```

---

### 3단계: GitHub Pages 활성화 확인 (1분, 최초 1회만)

#### 1. 저장소 Settings 접속

```
https://github.com/1di0t/1di0t.github.io/settings/pages
```

#### 2. Source 설정 확인

**설정**:
- Source: **GitHub Actions** 선택
- Branch: main (자동)

**이미 설정되어 있으면 스킵**

#### 3. URL 확인

GitHub Pages 페이지에 다음 메시지가 표시되면 성공:
```
✅ Your site is live at https://1di0t.github.io
```

---

### 4단계: utterances 댓글 시스템 활성화 (1분, 최초 1회만)

#### 1. utterances 앱 설치

브라우저에서:
```
https://github.com/apps/utterances
```

#### 2. Install 버튼 클릭

#### 3. 저장소 선택

- **Only select repositories** 선택
- **1di0t/1di0t.github.io** 체크
- **Install** 클릭

#### 4. 권한 승인

GitHub 비밀번호 입력 (요청 시)

✅ **utterances 설치 완료!**

**이후**: 댓글 작성 시 자동으로 GitHub Issues에 저장됨

---

### 5단계: 블로그 배포 확인 (1분)

#### 1. 블로그 접속

브라우저에서:
```
https://1di0t.github.io
```

**캐시 강제 새로고침**:
- Windows/Linux: `Ctrl + F5`
- macOS: `Cmd + Shift + R`

#### 2. 확인 사항

- [ ] 메인 페이지가 열리는가?
- [ ] 포스트 목록이 보이는가?
- [ ] 사이드바에 17개 카테고리가 표시되는가?
- [ ] 다크모드가 작동하는가? (우측 상단 토글)
- [ ] 검색 기능이 작동하는가? (상단 검색창)
- [ ] 포스트 클릭 시 열리는가?
- [ ] 댓글 섹션이 보이는가? (포스트 하단)

#### 3. 댓글 기능 테스트 (선택)

1. 아무 포스트 열기
2. 하단 "💬 댓글" 섹션 확인
3. GitHub 계정으로 로그인
4. 테스트 댓글 작성
5. GitHub Issues 확인:
   ```
   https://github.com/1di0t/1di0t.github.io/issues?q=label:comments
   ```

---

## 🎉 배포 완료!

모든 단계가 완료되었으면:

✅ **블로그가 성공적으로 배포되었습니다!**

**블로그 URL**: https://1di0t.github.io

---

## 🔄 이후 배포 (자동)

**첫 배포 이후에는 더 간단합니다:**

### 방법 1: Obsidian Git 자동 커밋 (권장)

```
1. Obsidian에서 글 작성/수정
2. 10분 후 자동 커밋
3. GitHub Actions 자동 빌드
4. 1-2분 후 배포 완료!
```

**아무것도 안 해도 됨!**

### 방법 2: 수동 푸시

```bash
git add .
git commit -m "Add: 새 포스트"
git push origin main
```

1-2분 후 자동 배포!

---

## 🐛 트러블슈팅

### 문제 1: 빌드 실패 (❌)

**증상**: GitHub Actions에서 빨간 X

**해결**:
1. Actions 로그 확인
2. Front matter 문법 확인
3. 파일명 형식 확인 (`YYYY-MM-DD-title.md`)
4. 로컬 테스트:
   ```bash
   bundle exec jekyll build
   ```

---

### 문제 2: 포스트가 안 보임

**증상**: 빌드는 성공했지만 블로그에 포스트 없음

**해결**:
1. 날짜 확인 (미래 날짜는 표시 안 됨)
2. 파일 위치 확인: `_posts/YYYY-MM/`
3. Front matter 확인: `layout: post` 있는지
4. 캐시 새로고침: `Ctrl+F5`

---

### 문제 3: utterances 댓글 안 보임

**증상**: 댓글 섹션이 비어있음

**해결**:
1. utterances 앱 설치 확인:
   ```
   https://github.com/settings/installations
   ```
2. 저장소 권한 확인:
   - `1di0t/1di0t.github.io` 접근 권한 있는지
3. 브라우저 콘솔 확인 (F12):
   - 에러 메시지 확인

---

### 문제 4: 다크모드에서 댓글 테마 안 바뀜

**증상**: 다크모드인데 댓글이 라이트 테마

**해결**:
1. 페이지 새로고침 (`Ctrl+F5`)
2. 다크모드 토글 다시 클릭
3. 브라우저 캐시 삭제

---

## 📊 배포 상태 모니터링

### GitHub Actions 이메일 알림 설정

1. **GitHub → Settings → Notifications**
2. **Actions** 섹션
3. **Email notifications** 활성화

**이후**: 빌드 성공/실패 시 자동 이메일

---

### GitHub Actions 뱃지 추가 (선택)

README.md에 추가:
```markdown
![Build Status](https://github.com/1di0t/1di0t.github.io/workflows/Build%20and%20Deploy/badge.svg)
```

**결과**:
![Build Status](https://github.com/1di0t/1di0t.github.io/workflows/Build%20and%20Deploy/badge.svg)

---

## 🔗 주요 URL 모음

| 항목 | URL |
|------|-----|
| **블로그** | https://1di0t.github.io |
| **GitHub 저장소** | https://github.com/1di0t/1di0t.github.io |
| **GitHub Actions** | https://github.com/1di0t/1di0t.github.io/actions |
| **GitHub Pages 설정** | https://github.com/1di0t/1di0t.github.io/settings/pages |
| **utterances 앱** | https://github.com/apps/utterances |
| **댓글 Issues** | https://github.com/1di0t/1di0t.github.io/issues?q=label:comments |

---

## 📚 관련 가이드

| 문서 | 내용 |
|------|------|
| **[QUICKSTART.md](QUICKSTART.md)** | 5분 시작 가이드 |
| **[DEPLOYMENT_SIMPLE.md](DEPLOYMENT_SIMPLE.md)** | 간단한 배포 설명 |
| **[CATEGORY_AUTO.md](CATEGORY_AUTO.md)** | 카테고리 자동화 |
| **[WRITING_GUIDE.md](WRITING_GUIDE.md)** | 글 작성 가이드 |

---

## ✅ 최종 체크리스트

### 최초 배포 (1회)
- [ ] Git 푸시
- [ ] GitHub Actions 성공 확인
- [ ] GitHub Pages 활성화
- [ ] utterances 앱 설치
- [ ] 블로그 접속 확인
- [ ] 댓글 기능 테스트

### 이후 배포 (매번)
- [ ] 글 작성
- [ ] Obsidian Git 자동 커밋 (10분)
- [ ] 블로그 확인 (12분 후)

---

**배포 완료! 이제 블로그가 전 세계에 공개됩니다!** 🎉

**"The best blog is the one you actually write."** 💪
