---
layout: post
title: "TroubleShooting: Llama 답변 구조 문제"
category: troubleshooting
tags: [llama, nlp, text-processing, regex, python]
excerpt: "Llama 모델의 답변에서 필요한 부분만 추출하는 문자열 파싱 함수를 구현합니다."
---

## 문제 설명

Llama 모델이 답변을 생성할 때 컨텍스트, 질문, 답변을 모두 포함하여 반환하는 문제가 발생했습니다. 필요한 것은 답변 부분만 추출하는 것입니다.

---

## 해결 방법

정규 표현식을 사용한 문자열 파싱 함수를 작성하여 문제를 해결했습니다.

### 구현 코드

```python
import re

def extract_origin_text(data: str) -> str:
    """
    결과 텍스트에서 원본 텍스트를 추출합니다
    result_text: str
    """
    result_text = data
    # 원본 텍스트 추출
    match = re.search(r"(\n\nOrigin:.*?\n\n)", result_text, re.DOTALL)
    if match:
        return match.group(1).strip()
    return ""
```

---

## 코드 분석

### 정규 표현식 설명

```python
r"(\n\nOrigin:.*?\n\n)"
```

- `\n\n`: 두 개의 줄바꿈으로 시작
- `Origin:`: "Origin:" 문자열
- `.*?`: 최소 매칭 (non-greedy)
- `\n\n`: 두 개의 줄바꿈으로 종료
- `re.DOTALL`: `.`이 줄바꿈 문자도 포함하도록 설정

### match.group(1)

- 괄호로 묶인 첫 번째 그룹 반환
- `strip()`: 앞뒤 공백 제거

---

## 사용 예시

### 입력 데이터

```python
llama_output = """
Context: 사용자가 질문을 했습니다.

Question: 날씨가 어때요?

Origin: 오늘 날씨는 맑습니다.

Additional Info: ...
"""

result = extract_origin_text(llama_output)
print(result)
# 출력: "Origin: 오늘 날씨는 맑습니다."
```

---

## 개선된 버전

### 여러 패턴 지원

```python
import re

def extract_answer(data: str, pattern: str = "Origin") -> str:
    """
    다양한 패턴의 답변 추출
    data: str - 전체 텍스트
    pattern: str - 추출할 섹션 이름
    """
    # 패턴에 맞는 섹션 추출
    regex = rf"({pattern}:.*?)(?=\n\n[A-Z]|\Z)"
    match = re.search(regex, data, re.DOTALL)

    if match:
        return match.group(1).strip()
    return ""

# 사용 예시
result = extract_answer(llama_output, "Origin")
```

### 다중 섹션 추출

```python
def extract_all_sections(data: str) -> dict:
    """모든 섹션을 딕셔너리로 추출"""
    sections = {}
    pattern = r"([A-Z][a-z]+):\s*(.*?)(?=\n\n[A-Z]|\Z)"

    for match in re.finditer(pattern, data, re.DOTALL):
        section_name = match.group(1)
        section_content = match.group(2).strip()
        sections[section_name] = section_content

    return sections

# 사용 예시
sections = extract_all_sections(llama_output)
print(sections["Origin"])
```

---

## 에러 핸들링

```python
def extract_origin_text_safe(data: str) -> str:
    """안전한 텍스트 추출"""
    try:
        if not data or not isinstance(data, str):
            return ""

        match = re.search(r"(\n\nOrigin:.*?\n\n)", data, re.DOTALL)
        if match:
            return match.group(1).strip()

        # 대안 패턴 시도
        match = re.search(r"Origin:(.*?)(?=\n\n|\Z)", data, re.DOTALL)
        if match:
            return match.group(1).strip()

        return ""
    except Exception as e:
        print(f"텍스트 추출 중 오류: {e}")
        return ""
```

---

## 성능 최적화

### 컴파일된 정규 표현식 사용

```python
import re

# 모듈 레벨에서 컴파일
ORIGIN_PATTERN = re.compile(r"(\n\nOrigin:.*?\n\n)", re.DOTALL)

def extract_origin_text_fast(data: str) -> str:
    """최적화된 텍스트 추출"""
    match = ORIGIN_PATTERN.search(data)
    if match:
        return match.group(1).strip()
    return ""
```

---

## 참고 자료

- [Python re 모듈](https://docs.python.org/3/library/re.html)
- [Regex101 테스터](https://regex101.com/)
- [Llama 모델 문서](https://github.com/facebookresearch/llama)
