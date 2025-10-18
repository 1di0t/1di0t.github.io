---
layout: post
title: Git/GitHub 사용 가이드
date: 2025-10-07 02:00:00 +0900
tags:
  - git
  - github
  - 버전관리
  - 개발도구
  - 커밋
category: 개발 (Development)
---

## Git 커밋 타입

| 타입 이름 | 내용 |
|-----------|------|
| feat | 새로운 기능에 대한 커밋 |
| fix | 버그 수정에 대한 커밋 |
| build | 빌드 관련 파일 수정 / 모듈 설치 또는 삭제에 대한 커밋 |
| chore | 그 외 자잘한 수정에 대한 커밋 |
| ci | ci 관련 설정 수정에 대한 커밋 |
| docs | 문서 수정에 대한 커밋 |
| style | 코드 스타일 혹은 포맷 등에 관한 커밋 |
| refactor | 코드 리팩토링에 대한 커밋 |
| test | 테스트 코드 수정에 대한 커밋 |
| perf | 성능 개선에 대한 커밋 |

## 원격 저장소 관리

### 원격 저장소 업데이트

```bash
git remote update
# 원격저장소를 업데이트
```

### 브랜치 조회

```bash
git branch
# 로컬브랜치 조회

git branch -r
# 원격브랜치 조회

git branch -a
# 모든브랜치 조회
```

### 브랜치 변경

```bash
git checkout /origin/branch-name
# /origin/branch-name로 브랜치 변경

git checkout -t branch-name
# branch-name 로컬브랜치 생성후 해당이름의 원격브랜치로 변경
```

### 저장소 클론

```bash
git clone repository-name
# 해당 저장소 클론
```

## 변경사항 취소

### git add 취소

```bash
git reset HEAD filename
# git add를 취소 (filename이 없을 시 전체 취소)
```

### git commit 취소

```bash
git reset HEAD^
# git commit을 취소
```
