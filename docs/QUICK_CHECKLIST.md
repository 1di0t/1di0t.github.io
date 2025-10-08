# ✅ 포스트 작성 빠른 체크리스트

블로그 포스트를 작성할 때 빠르게 참고할 수 있는 체크리스트입니다.

---

## 📝 작성 전 준비

- [ ] 주제와 제목 정하기
- [ ] 대상 독자 정의하기
- [ ] 글의 구조 간단히 정리하기

---

## 📄 파일 생성

**파일 위치**: `_posts/2025-10/2025-10-15-title.md`

**파일명 규칙**:
- 형식: `YYYY-MM-DD-title.md`
- 날짜는 정확히
- 제목은 영문 소문자 + 하이픈만
- 월별 폴더 사용 권장

---

## 🎯 Front Matter 템플릿

```yaml
---
layout: post
title: "포스트 제목"
date: 2025-10-15 14:00:00 +0900
category: python  # ⚠️ 반드시 소문자!
tags: [python, tutorial, 기초]
excerpt: "미리보기 요약"
---
```

### 필수 확인 사항
- [ ] `layout: post` 작성
- [ ] `title` 작성 (따옴표로 감싸기)
- [ ] `date` 작성 (타임존 포함 권장)
- [ ] `category` **소문자**로 작성 ⚠️
- [ ] `tags` 배열 형식으로 작성

---

## 📂 카테고리 (소문자!)

사용 가능한 카테고리:
- `python` - Python
- `ai` - AI/머신러닝
- `development` - 일반 개발
- `project` - 프로젝트
- `mobile` - 모바일 앱
- `web` - 웹 개발
- `data` - 데이터 분석
- `network` - 네트워크
- `database` - 데이터베이스
- `study` - 학습 노트
- `troubleshooting` - 트러블슈팅
- `git` - Git/GitHub

**새 카테고리 추가**:
`category/` 폴더에 `.md` 파일 생성

---

## 📸 이미지

**저장 위치**: `assets/images/포스트명/이미지.jpg`

**Markdown 사용**:
```markdown
![설명](/assets/images/포스트명/이미지.jpg)
```

⚠️ 경로 맨 앞에 `/` 필수!

---

## 💻 코드 블록

**언어 지정 필수**:

````markdown
```python
def hello():
    print("Hello, World!")
```
````

**지원 언어**: python, javascript, java, c, cpp, bash, sql, json, yaml 등

---

## 🚀 발행 체크리스트

### 1. 기술적 검증
- [ ] 파일명 형식 확인 (`YYYY-MM-DD-title.md`)
- [ ] `_posts/` 폴더 또는 `_posts/YYYY-MM/` 폴더에 저장
- [ ] Front Matter 필수 항목 모두 작성
- [ ] **카테고리 소문자 확인** ⚠️⚠️⚠️
- [ ] 카테고리 페이지가 `category/` 폴더에 존재
- [ ] 이미지 경로 확인 (`/assets/images/...`)
- [ ] 코드 블록 언어 지정
- [ ] 링크 정상 작동 확인

### 2. 내용 품질
- [ ] 소리 내어 읽어보기
- [ ] 오타 확인
- [ ] 핵심 내용 요약 (결론 섹션)
- [ ] 추가 학습 자료 링크

---

## 🔄 Git 워크플로우

```bash
# 1. 변경사항 확인
git status

# 2. 파일 추가
git add _posts/2025-10/2025-10-15-title.md
git add assets/images/  # 이미지 있으면

# 3. 커밋
git commit -m "포스트 추가: 제목"

# 4. 푸시
git push origin main
```

---

## 🔍 배포 확인

**배포 상태 확인**:
1. https://github.com/1di0t/1di0t.github.io/actions
2. ✅ 녹색 체크 → 배포 완료
3. ❌ 빨간 X → 에러 로그 확인

**블로그 확인**:
- https://1di0t.github.io

**배포 시간**: 2~5분

---

## 🚨 자주 하는 실수

1. **카테고리를 대문자로 작성** ← 가장 흔함!
   - ❌ `category: Python`
   - ✅ `category: python`

2. **코드 블록 언어 미지정**
   - ❌ ` ```코드``` `
   - ✅ ` ```python코드``` `

3. **이미지 경로에서 `/` 누락**
   - ❌ `![](assets/images/img.jpg)`
   - ✅ `![](/assets/images/img.jpg)`

4. **Front Matter YAML 문법 오류**
   - title을 따옴표로 감싸지 않음
   - tags를 배열로 작성하지 않음

5. **파일명에 대문자/공백 사용**
   - ❌ `2025-10-15-My Post.md`
   - ✅ `2025-10-15-my-post.md`

---

## 📚 참고 자료

- [POST_GUIDE.md](POST_GUIDE.md) - Jekyll 포스트 작성 완벽 가이드
- [WRITING_GUIDE.md](WRITING_GUIDE.md) - 기술 블로그 글쓰기 가이드
- [AI_WORKFLOW.md](AI_WORKFLOW.md) - AI 활용 글쓰기

---

**Happy Blogging! 🎉**

*이 체크리스트를 프린트하거나 즐겨찾기하여 매번 참고하세요!*
