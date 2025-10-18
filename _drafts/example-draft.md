# AutoBlog 사용 예시

이것은 초안 파일의 예시입니다. 러프하게 작성해도 괜찮습니다.

## Claude Desktop 사용 방법

1. Claude Desktop 열기 (Alt+Space 또는 앱 실행)
2. 다음 명령 입력:

```
"_drafts/example-draft.md 파일을 찾아서 블로그 포스트로 정리해줘.

형식:
- 제목은 H1으로
- 간단한 요약 추가
- 적절한 헤딩 구조
- 코드 블록은 언어 명시
- 카테고리: programming
- 태그: obsidian, claude, automation, blog
- Front matter 포함"
```

3. Claude가 정리한 내용 확인
4. 다음 명령으로 저장:

```
"정리된 내용을 _posts/2025-10/2025-10-18-autoblog-example.md로 저장해줘"
```

5. 10분 후 Obsidian Git이 자동 커밋
6. GitHub에 자동 푸시
7. 1-2분 후 블로그 배포 완료!

## 주요 기능

### 1. 멀티 기기 동기화
- iOS에서 작성
- 5분 후 PC에서 확인 가능
- Remotely Save 플러그인 사용

### 2. AI 자동 정리
- 러프한 메모를 블로그 포스트로 변환
- Front matter 자동 생성
- 카테고리 및 태그 자동 추가

### 3. 자동 배포
- Obsidian Git: 10분마다 자동 커밋
- GitHub Actions: 자동 빌드
- GitHub Pages/Cloudflare: 자동 배포

## 코드 예시

```python
def hello_autoblog():
    print("AutoBlog로 블로그 작성이 쉬워졌습니다!")
    return True
```

```javascript
// JavaScript 예시
const autoblog = {
  name: '바보곰의 개발 블로그',
  automation: '95%',
  cost: 0
};
```

## 마무리

이제 블로그 작성이 정말 쉬워졌습니다!

---

**다음 단계**:
1. Obsidian 플러그인 설치
2. Claude Desktop 연동
3. 첫 포스트 작성 테스트
