---
layout: post
title: "TroubleShooting: 번역 텍스트 줄바꿈 없어짐 문제"
category: 트러블슈팅 (Troubleshooting)
tags:
  - python
  - translation
  - nlp
  - text-processing
  - debugging
excerpt: 번역 과정에서 줄바꿈 문자가 사라지는 문제를 해결하는 방법을 정리합니다.
---

## 문제 설명

번역 텍스트에서 줄바꿈이 사라지는 문제가 발생했습니다.

---

## 해결 방법

### 줄바꿈 유지 번역 함수

```python
def translate_with_linebreaks(text):
    """
    줄바꿈을 유지하면서 텍스트 번역
    text: str
    return: str
    """
    lines = [line.strip() for line in text.split('\\n') if line.strip()]
    translated = translator(lines, batch_size=8)
    return '\\n'.join([t['translation_text'] for t in translated])
```

---

## 동작 원리

### 1. 텍스트 분할

```python
lines = [line.strip() for line in text.split('\\n') if line.strip()]
```

- 줄바꿈 문자(`\n`)를 기준으로 텍스트 분할
- 각 줄의 공백 제거 (`strip()`)
- 빈 줄 제거 (`if line.strip()`)

### 2. 배치 번역

```python
translated = translator(lines, batch_size=8)
```

- 여러 줄을 한 번에 번역 (batch_size=8)
- 번역 속도 향상
- API 호출 횟수 최적화

### 3. 줄바꿈 복원

```python
return '\\n'.join([t['translation_text'] for t in translated])
```

- 번역된 각 줄을 줄바꿈 문자로 연결
- 원본의 줄바꿈 구조 유지

---

## 전체 예제

```python
from transformers import pipeline

# 번역 모델 로드
translator = pipeline("translation", model="Helsinki-NLP/opus-mt-ko-en")

def translate_with_linebreaks(text):
    """줄바꿈을 유지하면서 텍스트 번역"""
    lines = [line.strip() for line in text.split('\\n') if line.strip()]
    translated = translator(lines, batch_size=8)
    return '\\n'.join([t['translation_text'] for t in translated])

# 사용 예시
original_text = """안녕하세요.
저는 개발자입니다.
번역 테스트 중입니다."""

translated_text = translate_with_linebreaks(original_text)
print(translated_text)
```

---

## 개선 사항

### 1. 빈 줄 유지 버전

```python
def translate_with_empty_lines(text):
    """빈 줄도 유지하면서 번역"""
    lines = text.split('\\n')
    translated_lines = []

    for line in lines:
        if line.strip():
            result = translator(line)[0]['translation_text']
            translated_lines.append(result)
        else:
            translated_lines.append('')  # 빈 줄 유지

    return '\\n'.join(translated_lines)
```

### 2. 에러 처리 추가

```python
def translate_with_linebreaks_safe(text):
    """에러 처리를 포함한 번역 함수"""
    try:
        lines = [line.strip() for line in text.split('\\n') if line.strip()]
        if not lines:
            return ""

        translated = translator(lines, batch_size=8)
        return '\\n'.join([t['translation_text'] for t in translated])
    except Exception as e:
        print(f"번역 중 오류 발생: {e}")
        return text  # 오류 시 원본 반환
```

---

## 성능 최적화

### Batch Size 조정

```python
# 짧은 텍스트 많을 때
batch_size = 16

# 긴 텍스트 많을 때
batch_size = 4
```

---

## 참고 자료

- [Hugging Face Transformers](https://huggingface.co/docs/transformers/)
- [Python String Methods](https://docs.python.org/3/library/stdtypes.html#string-methods)
