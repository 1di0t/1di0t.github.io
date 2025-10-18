---
layout: post
title: "git/github"
category: development
tags: [git, github, version-control, commit, branch]
excerpt: "Git 커밋 타입과 브랜치 관리 명령어를 정리합니다."
---

## Commit Types

| Type | Description |
|------|-------------|
| **feat** | 새로운 기능에 대한 커밋 |
| **fix** | 버그 수정에 대한 커밋 |
| **build** | 빌드 관련 파일 수정 / 모듈 설치 또는 삭제에 대한 커밋 |
| **chore** | 그 외 자잘한 수정에 대한 커밋 |
| **ci** | CI 관련 설정 수정에 대한 커밋 |
| **docs** | 문서 수정에 대한 커밋 |
| **style** | 코드 스타일 혹은 포맷 등에 관한 커밋 |
| **refactor** | 코드 리팩토링에 대한 커밋 |
| **test** | 테스트 코드 수정에 대한 커밋 |
| **perf** | 성능 개선에 대한 커밋 |

---

## Git Branch Commands

### 원격 저장소 업데이트

```bash
git remote update
```

### 브랜치 조회

```bash
# 로컬 브랜치 조회
git branch

# 원격 브랜치 조회
git branch -r

# 모든 브랜치 조회
git branch -a
```

### 브랜치 변경

```bash
# origin/branch-name로 브랜치 변경
git checkout origin/branch-name

# 원격 브랜치 추적하며 체크아웃
git checkout -t origin/branch-name
```

---

## 자주 사용하는 Git 명령어

### 기본 작업 흐름

```bash
# 변경사항 확인
git status

# 파일 스테이징
git add .
git add filename

# 커밋
git commit -m "feat: 새로운 기능 추가"

# 푸시
git push origin branch-name
```

### 브랜치 작업

```bash
# 새 브랜치 생성
git branch new-branch

# 브랜치 생성 및 전환
git checkout -b new-branch

# 브랜치 삭제
git branch -d branch-name

# 원격 브랜치 삭제
git push origin --delete branch-name
```

---

## 참고 자료

- [Git 공식 문서](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
