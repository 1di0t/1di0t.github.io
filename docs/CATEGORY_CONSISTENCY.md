# 카테고리 일관성 관리 가이드

## 문제 배경

Jekyll 블로그에서 카테고리 페이지 404 오류가 발생했습니다. 특히 `Development` 카테고리에서 문제가 발생했는데, 원인은 **파일명과 내부 설정의 불일치**였습니다.

### 발견된 문제

```
파일명: category/development.html (소문자)
Front matter:
  - category: Development (대문자)
  - permalink: /category/Development/ (대문자)

→ 결과: URL과 파일명 불일치로 404 오류
```

## 구조적 해결방안

### 1. 일관성 규칙 확립

카테고리 파일은 다음 규칙을 따라야 합니다:

```
파일명 = category 필드 = permalink의 카테고리명
```

**올바른 예시:**
```html
<!-- 파일명: category/Development.html -->
---
layout: category
title: "Development"
category: Development
permalink: /category/Development/
---
```

### 2. 자동 검증 시스템

#### 검증 스크립트 위치
- `scripts/validate-categories.js`

#### 검증 항목
1. 파일명(확장자 제외)과 `category` 필드 일치 여부
2. `category` 필드와 `permalink`의 카테고리명 일치 여부
3. 대소문자 정확성

#### 실행 방법

**수동 검증:**
```bash
npm run validate:categories
```

**자동 검증 (빌드 전):**
```bash
npm run build  # prebuild 훅에서 자동으로 validate:categories 실행
```

### 3. 수정된 파일

#### 리네임 된 카테고리 파일
- `category/development.html` → `category/Development.html`
- `category/project.html` → `category/Project.html`

#### 추가된 파일
- `scripts/validate-categories.js` - 자동 검증 스크립트

#### 수정된 파일
- `package.json` - `validate:categories` 및 `prebuild` 스크립트 추가

## 새 카테고리 추가 시 체크리스트

1. **파일명 결정**: 카테고리명과 정확히 일치하도록 (대소문자 포함)
   ```
   예: AI → AI.html
       Machine-Learning → Machine-Learning.html
       development → development.html (소문자로 통일하려면)
   ```

2. **Front matter 작성**:
   ```html
   ---
   layout: category
   title: "표시될 제목"
   category: 파일명과_동일
   permalink: /category/파일명과_동일/
   ---
   ```

3. **검증 실행**:
   ```bash
   npm run validate:categories
   ```

4. **테스트**: 로컬에서 Jekyll 서버 실행 후 카테고리 페이지 접근 확인
   ```bash
   npm run dev
   ```

## 문제 해결 프로세스

### 문제 발견 시
1. `npm run validate:categories` 실행
2. 오류 메시지 확인
3. 지시된 대로 파일명 변경 또는 front matter 수정
4. 재검증

### 예시 출력

**성공 시:**
```
✨ 모든 카테고리 파일이 일관성 검증을 통과했습니다!
```

**실패 시:**
```
❌ development.html: 파일명과 category 불일치
   파일명: "development" | category: "Development"
   → 파일명을 "Development.html"로 변경하세요
```

## 기술적 세부사항

### Jekyll의 카테고리 라우팅
- Jekyll은 `permalink`를 URL 경로로 사용
- 파일명과 무관하게 `permalink`가 실제 URL을 결정
- 하지만 일관성을 위해 파일명 = category = permalink 규칙 유지 권장

### Windows/Unix 호환성
- 검증 스크립트는 `\r\n`(Windows)와 `\n`(Unix) 모두 지원
- 정규식: `/^---[\r\n]+([\s\S]*?)[\r\n]+---/`

## 향후 개선 가능 사항

1. **Pre-commit hook 추가**: 커밋 전 자동 검증
2. **CI/CD 통합**: GitHub Actions에서 자동 검증
3. **카테고리 생성 헬퍼**: 템플릿 기반 자동 생성 스크립트
4. **대소문자 정책 통일**: 모든 카테고리를 소문자 또는 PascalCase로 통일

## 참고

이 해결방안은 2025-10-08에 `Development` 카테고리 404 오류를 해결하면서 수립되었습니다.
