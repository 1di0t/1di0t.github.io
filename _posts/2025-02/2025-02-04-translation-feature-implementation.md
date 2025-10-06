---
layout: post
title: "번역 기능 추가"
category: development
tags: [python, translation, nlp, transformers, nllb, facebook]
excerpt: "Facebook의 NLLB-200-distilled-600M 모델을 사용한 번역 기능 구현 과정과 발생한 문제를 정리합니다."
---

## 개요

번역 기능을 추가하기 위해 Facebook의 NLLB-200-distilled-600M 모델을 사용하려고 했습니다.

---

## 구현 코드

```python
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

tokenizer = AutoTokenizer.from_pretrained("facebook/nllb-200-distilled-600M")
model = AutoModelForSeq2SeqLM.from_pretrained("facebook/nllb-200-distilled-600M")
```

---

## 발생한 문제

공식 문서를 참고하여 직접 모델을 로드하는 과정에서 다음과 같은 문제가 발생했습니다:

### 1. 번역 언어 인식 문제

- 모델이 입력 텍스트의 언어를 정확히 인식하지 못함
- 소스 언어와 타겟 언어 설정이 필요

### 2. 의도하지 않은 언어로 번역되는 문제

- 번역 결과가 예상과 다른 언어로 출력됨
- 언어 코드 설정 오류

---

## NLLB-200 모델 소개

### 특징

- **200개 언어 지원**: 다양한 언어 간 번역 가능
- **Distilled 버전**: 경량화된 모델 (600M 파라미터)
- **고품질 번역**: Facebook AI Research에서 개발

### 장점

- 저자원 언어 번역 지원
- 다국어 간 직접 번역 가능
- 상대적으로 작은 모델 크기

---

## 올바른 사용 방법

### 1. 언어 코드 설정

```python
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

tokenizer = AutoTokenizer.from_pretrained("facebook/nllb-200-distilled-600M")
model = AutoModelForSeq2SeqLM.from_pretrained("facebook/nllb-200-distilled-600M")

# 한국어 -> 영어 번역
text = "안녕하세요"
inputs = tokenizer(text, return_tensors="pt")

# 소스 언어: 한국어 (kor_Hang)
# 타겟 언어: 영어 (eng_Latn)
translated_tokens = model.generate(
    **inputs,
    forced_bos_token_id=tokenizer.lang_code_to_id["eng_Latn"]
)

translation = tokenizer.batch_decode(translated_tokens, skip_special_tokens=True)[0]
print(translation)
```

### 2. Pipeline 사용 (권장)

```python
from transformers import pipeline

translator = pipeline(
    "translation",
    model="facebook/nllb-200-distilled-600M",
    src_lang="kor_Hang",
    tgt_lang="eng_Latn"
)

result = translator("안녕하세요")
print(result[0]['translation_text'])
```

---

## 주요 언어 코드

| 언어 | 코드 |
|------|------|
| 한국어 | kor_Hang |
| 영어 | eng_Latn |
| 중국어 (간체) | zho_Hans |
| 일본어 | jpn_Jpan |
| 프랑스어 | fra_Latn |
| 독일어 | deu_Latn |
| 스페인어 | spa_Latn |

---

## 트러블슈팅 체크리스트

- [ ] 언어 코드가 올바르게 설정되었는지 확인
- [ ] `forced_bos_token_id` 설정 확인
- [ ] 입력 텍스트 인코딩 확인
- [ ] 모델 버전 확인
- [ ] 토크나이저와 모델 버전 일치 여부 확인

---

## 향후 과제

추가적인 트러블슈팅이 필요한 상황입니다:

1. 언어 자동 감지 기능 구현
2. 번역 품질 평가
3. 배치 번역 최적화
4. 에러 핸들링 강화

---

## 참고 자료

- [NLLB-200 모델 카드](https://huggingface.co/facebook/nllb-200-distilled-600M)
- [Hugging Face Transformers 문서](https://huggingface.co/docs/transformers/)
- [NLLB 논문](https://arxiv.org/abs/2207.04672)
