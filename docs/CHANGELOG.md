# 📋 문서 변경 이력

## 2025-10-08 - 대규모 가이드 업데이트

### ✨ 신규 파일

1. **QUICK_CHECKLIST.md**
   - 포스트 작성 시 빠른 참조용 체크리스트
   - 파일 생성부터 배포까지 전 단계 요약
   - 자주 하는 실수 TOP 5 정리
   - 프린트 가능한 형식

2. **WRITING_GUIDE.md**
   - Guide.txt를 마크다운으로 전환하고 대폭 확장
   - 3단계 글쓰기 프레임워크 상세 설명
   - 비유, 예시, 코드 작성 원칙 추가
   - 제목 작성법 및 최종 체크리스트

3. **CHANGELOG.md** (이 파일)
   - 문서 변경 이력 추적

### ⭐ 업데이트된 파일

1. **POST_GUIDE.md**
   - ⚠️ **카테고리 소문자 규칙 강조** (대문자 사용 시 404 에러)
   - 월별 폴더 구조 권장 추가 (`_posts/2025-10/`)
   - 타임존 포함 날짜 형식 추가 (`2025-10-15 14:00:00 +0900`)
   - 실제 사용 중인 카테고리 목록으로 업데이트
   - 실전 팁 섹션 추가 (워크플로우, 카테고리 전략, 제목 팁 등)
   - FAQ 확장 (Q7~Q9 추가)
   - 실제 블로그 URL 반영 (https://1di0t.github.io)

2. **AI_PROMPT.md**
   - 카테고리 목록을 소문자로 업데이트
   - 실제 사용 중인 카테고리로 변경
   - 날짜 형식에 타임존 포함 예시 추가
   - Guide.txt → WRITING_GUIDE.md 참조 변경

3. **README_DOCS.md**
   - 새로 추가된 문서 반영
   - 문서 설명 업데이트
   - 폴더 구조 최신화
   - 사용 시나리오 업데이트

4. **QUICK_CHECKLIST.md, POST_GUIDE.md**
   - Guide.txt → WRITING_GUIDE.md 참조 변경

### 🗑️ 삭제된 파일

1. **Guide.txt**
   - WRITING_GUIDE.md로 대체 (마크다운 형식 + 내용 확장)

2. **CATEGORY_CONSISTENCY.md**
   - 이미 해결된 문제 (카테고리 소문자 규칙 확립)
   - POST_GUIDE.md에 통합됨
   - 중복 내용 제거

### 📊 주요 변경 사항 요약

#### 카테고리 시스템 개선
```yaml
# 변경 전
category: Python, Deep-Learning, Machine-Learning  # 대문자 혼용

# 변경 후
category: python, ai, data  # 소문자로 통일 (필수!)
```

#### 날짜 형식 표준화
```yaml
# 기본 형식
date: 2025-10-15

# 타임존 포함 (권장)
date: 2025-10-15 14:00:00 +0900
```

#### 문서 구조 개선
```
Before:
- POST_GUIDE.md (기본 가이드)
- Guide.txt (글쓰기 팁)
- AI_PROMPT.md (AI 프롬프트)

After:
- POST_GUIDE.md (Jekyll 포스트 작성 완벽 가이드)
- WRITING_GUIDE.md (기술 블로그 글쓰기 가이드)
- QUICK_CHECKLIST.md (빠른 체크리스트)
- AI_PROMPT.md (AI 프롬프트)
```

### 🎯 핵심 메시지

**⚠️ 가장 중요한 변경사항: 카테고리는 반드시 소문자로!**

```yaml
❌ category: Python    # 404 에러!
✅ category: python    # 정상 작동
```

### 📈 개선 효과

1. **사용성 향상**
   - 빠른 참조용 체크리스트 추가
   - 단계별 가이드 명확화

2. **일관성 확보**
   - 카테고리 소문자 규칙 확립
   - 날짜 형식 표준화
   - 참조 링크 일관성

3. **문서 품질**
   - 마크다운 형식으로 통일
   - 예시와 설명 대폭 확장
   - 실전 팁 추가

### 🔗 관련 문서

- [README_DOCS.md](README_DOCS.md) - 전체 문서 안내
- [POST_GUIDE.md](POST_GUIDE.md) - 포스트 작성 가이드
- [WRITING_GUIDE.md](WRITING_GUIDE.md) - 글쓰기 가이드
- [QUICK_CHECKLIST.md](QUICK_CHECKLIST.md) - 빠른 체크리스트

---

## 향후 계획

### 고려 중인 개선 사항

1. **자동화 도구**
   - 카테고리 검증 스크립트 강화
   - 포스트 템플릿 자동 생성 CLI
   - Pre-commit hook 추가

2. **문서 확장**
   - 이미지 최적화 가이드
   - SEO 최적화 팁
   - 성능 측정 및 개선 가이드

3. **CI/CD 개선**
   - 빌드 시 자동 검증
   - 린팅 및 포맷 체크
   - 배포 알림 자동화

---

**마지막 업데이트**: 2025-10-08
**작성자**: Claude Code
