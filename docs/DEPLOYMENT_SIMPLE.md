# 🚀 AutoBlog 배포 가이드 (초간단)

> 3단계로 끝나는 블로그 배포

---

## 📋 배포 프로세스

```
글 작성 완료
    ↓
Obsidian Git 자동 커밋 (10분)
    ↓
GitHub Actions 자동 빌드 (1-2분)
    ↓
GitHub Pages 배포 완료
    ↓
https://1di0t.github.io 에서 확인!
```

**총 소요 시간**: 최대 12분 (모두 자동)

---

## 🎯 최초 배포 (1회만)

### 1단계: GitHub 저장소 확인

```bash
cd E:\self\AutoBlog  # Windows
# cd ~/Projects/AutoBlog  # macOS/Linux

git remote -v
# origin  https://github.com/1di0t/1di0t.github.io.git (fetch)
# origin  https://github.com/1di0t/1di0t.github.io.git (push)
```

### 2단계: 첫 커밋 푸시

```bash
# 변경사항 확인
git status

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit: AutoBlog setup"

# 푸시
git push origin main
```

### 3단계: GitHub Pages 활성화

1. **GitHub 저장소 접속**
   - https://github.com/1di0t/1di0t.github.io

2. **Settings → Pages**
   - Source: **GitHub Actions** 선택
   - Branch: **main** 선택

3. **완료!**
   - 1-2분 후: https://1di0t.github.io 접속 가능

---

## ✅ 배포 확인 (매번)

### 1. GitHub Actions 확인

```
https://github.com/1di0t/1di0t.github.io/actions
```

**상태**:
- ✅ 녹색 체크: 빌드 성공
- 🟡 노란 점: 빌드 진행 중 (1-2분 소요)
- ❌ 빨간 X: 빌드 실패 (로그 확인)

### 2. 블로그 확인

```
https://1di0t.github.io
```

**확인 사항**:
- 새 포스트가 상단에 표시되는가?
- 카테고리 페이지에 포스트가 있는가?
- 검색에서 포스트가 검색되는가?

**캐시 새로고침**:
- Windows/Linux: `Ctrl + F5`
- macOS: `Cmd + Shift + R`

---

## 🔧 자동 배포 설정

### Obsidian Git 설정

```
Settings → Obsidian Git:
✅ Vault backup interval: 10 (10분마다 자동 커밋)
✅ Auto backup after file change: ON
✅ Auto pull interval: 5 (5분마다 자동 풀)
```

### 수동 배포 (필요시)

```bash
# Obsidian Git이 안 되면 수동으로
cd E:\self\AutoBlog

git add .
git commit -m "Add: 새 포스트 추가"
git push origin main
```

---

## 🐛 트러블슈팅 (3가지만)

### 1️⃣ 빌드 실패 (❌)

**증상**: GitHub Actions에서 빨간 X

**해결**:
1. Actions 로그 확인
   ```
   https://github.com/1di0t/1di0t.github.io/actions
   → 실패한 워크플로우 클릭 → 에러 메시지 확인
   ```

2. **흔한 오류**:
   ```yaml
   # ❌ 잘못된 Front Matter
   ---
   layout: post
   title: 제목  # 따옴표 없음
   date: 25-10-18  # 날짜 형식 틀림
   category: unknown  # 존재하지 않는 카테고리
   ---

   # ✅ 올바른 Front Matter
   ---
   layout: post
   title: "제목"
   date: 2025-10-18
   category: programming
   tags: [python, web]
   ---
   ```

3. 로컬 테스트
   ```bash
   bundle exec jekyll build
   # 로컬에서 성공하면 GitHub에서도 성공
   ```

---

### 2️⃣ 포스트가 안 보임 (✅ 빌드 성공했는데)

**해결**:
1. **날짜 확인**
   ```yaml
   # ❌ 미래 날짜는 표시 안 됨
   date: 2025-12-31

   # ✅ 오늘 또는 과거 날짜
   date: 2025-10-18
   ```

2. **파일 위치 확인**
   ```
   ✅ _posts/2025-10/2025-10-18-title.md
   ❌ _drafts/2025-10-18-title.md
   ```

3. **캐시 강제 새로고침**
   ```
   Ctrl + F5 (Windows)
   Cmd + Shift + R (macOS)
   ```

---

### 3️⃣ Obsidian Git 자동 커밋 안 됨

**해결**:
1. **플러그인 설정 확인**
   ```
   Settings → Obsidian Git
   → Vault backup interval: 10
   → Auto backup after file change: ON
   ```

2. **Git 인증 확인**
   ```bash
   git config user.name
   git config user.email

   # 없으면 설정
   git config user.name "1di0t"
   git config user.email "your-email@example.com"
   ```

3. **수동 커밋 테스트**
   ```
   Ctrl+P (Cmd+P) → "Obsidian Git: Commit all changes"
   ```

---

## 📊 배포 상태 모니터링

### GitHub Actions 이메일 알림

```
GitHub → Settings → Notifications
→ Actions: Enable email notifications
```

- ✅ 빌드 성공 알림
- ❌ 빌드 실패 알림 (에러 요약 포함)

### Obsidian Git 상태 표시줄

Obsidian 하단 상태:
```
✅ "Pushed to remote" - 성공
⏳ "Pushing..." - 진행 중
❌ "Push failed" - 실패
```

---

## 🧪 로컬 테스트 (선택)

배포 전에 로컬에서 미리 확인:

### 의존성 설치 (최초 1회)
```bash
# Ruby 의존성
bundle install

# Node.js 의존성
npm install
```

### 로컬 서버 실행
```bash
# Jekyll 단독
bundle exec jekyll serve

# Tailwind + Jekyll 동시
npm run dev

# 접속
http://localhost:4000
```

---

## 📝 배포 체크리스트

### 글 작성 후 확인
- [ ] Front matter 올바른가? (layout, title, date, category, tags)
- [ ] 파일명 형식: `YYYY-MM-DD-title.md`
- [ ] 파일 위치: `_posts/YYYY-MM/`
- [ ] 이미지 경로: `/assets/images/`

### 배포 확인
- [ ] Obsidian Git 커밋 성공 (10분 후)
- [ ] GitHub Actions 빌드 성공 (1-2분)
- [ ] 블로그에서 포스트 확인
- [ ] 카테고리/태그 페이지 확인

---

## 🔗 주요 URL

| 항목 | URL |
|------|-----|
| **블로그** | https://1di0t.github.io |
| **GitHub Actions** | https://github.com/1di0t/1di0t.github.io/actions |
| **저장소** | https://github.com/1di0t/1di0t.github.io |

---

## 📚 추가 가이드

| 문서 | 내용 |
|------|------|
| **[QUICKSTART.md](QUICKSTART.md)** | 5분 시작 가이드 |
| **[CATEGORY_AUTO.md](CATEGORY_AUTO.md)** | 카테고리 자동화 |
| **[DEPLOYMENT.md](DEPLOYMENT.md)** | 배포 가이드 (상세) |

---

**"배포는 자동, 확인만 하면 끝!"** 🚀
