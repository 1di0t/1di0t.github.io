# 🚀 지금 바로 배포하기

> 이 파일을 보면서 따라하세요!

---

## ✅ 1단계: GitHub에 푸시 (1분)

### Windows PowerShell에서 실행:

```powershell
cd E:\self\AutoBlog
git push origin main
```

### 예상 결과:
```
Enumerating objects: 25, done.
Counting objects: 100% (25/25), done.
...
To https://github.com/1di0t/1di0t.github.io.git
   1680fd0..61accba  main -> main
```

✅ **푸시 성공!** → 2단계로

---

## ✅ 2단계: GitHub Actions 확인 (1-2분)

### 브라우저에서 열기:

```
https://github.com/1di0t/1di0t.github.io/actions
```

### 확인 사항:

- 🟡 **노란 점** (Building...): 1-2분 대기
- ✅ **녹색 체크**: 성공! → 3단계로
- ❌ **빨간 X**: 에러! → 아래 "빌드 실패 시" 확인

#### 빌드 실패 시:
1. 빨간 X 클릭
2. "Build and deploy" 클릭
3. 에러 메시지 확인
4. Front matter 문법 확인

---

## ✅ 3단계: GitHub Pages 활성화 (1분, 최초 1회)

### 브라우저에서 열기:

```
https://github.com/1di0t/1di0t.github.io/settings/pages
```

### 설정 확인:

**Source**: `GitHub Actions` 선택되어 있는지 확인

✅ **이미 설정되어 있으면 스킵** → 4단계로

---

## ✅ 4단계: utterances 앱 설치 (1분, 최초 1회)

### 브라우저에서 열기:

```
https://github.com/apps/utterances
```

### 설치:

1. **Install** 버튼 클릭
2. **Only select repositories** 선택
3. **1di0t/1di0t.github.io** 체크
4. **Install** 클릭

✅ **설치 완료!** → 5단계로

---

## ✅ 5단계: 블로그 확인 (1분)

### 브라우저에서 열기:

```
https://1di0t.github.io
```

**캐시 새로고침**: `Ctrl + F5` (Windows) / `Cmd + Shift + R` (Mac)

### 확인 사항:

- [ ] 메인 페이지가 열리는가?
- [ ] 포스트 목록이 보이는가?
- [ ] 사이드바에 17개 카테고리가 있는가?
- [ ] 다크모드 토글이 작동하는가? (우측 상단)
- [ ] 검색 기능이 작동하는가?

### 댓글 테스트:

1. 아무 포스트 열기
2. 하단 "💬 댓글" 섹션 확인
3. 다크모드 토글 → 댓글 테마도 변경되는지 확인

---

## 🎉 배포 완료!

모든 단계가 완료되었으면:

✅ **블로그가 성공적으로 배포되었습니다!**

**블로그**: https://1di0t.github.io

**GitHub Actions**: https://github.com/1di0t/1di0t.github.io/actions

---

## 🔄 이후 배포 (자동)

다음부터는 더 간단합니다:

### Obsidian Git 자동 (권장)

```
1. Obsidian에서 글 작성
2. 10분 후 자동 커밋
3. 자동 배포
```

### 수동 푸시

```bash
git add .
git commit -m "Add: 새 포스트"
git push origin main
```

---

## 🐛 문제 발생 시

상세한 트러블슈팅은:

**[docs/DEPLOYMENT_CHECKLIST.md](docs/DEPLOYMENT_CHECKLIST.md)**

---

**지금 바로 1단계부터 시작하세요!** 🚀
