---
layout: post
title: "원-핫 인코딩(One-Hot Encoding)"
category: ai
tags: [nlp, encoding, tokenization, text-preprocessing, machine-learning]
excerpt: "자연어 처리에서 문자를 숫자로 변환하는 원-핫 인코딩 기법을 알아봅니다."
---

## 개요

원-핫 인코딩은 자연어 처리에서 문자를 숫자로 변환하는 기법 중 하나입니다.

---

## Python 예제

```python
from tensorflow.keras.preprocessing.text import Tokenizer

text = "안녕 클레오파트라 세상에서 제일 가는 포테이토칩 안녕 안녕 클레오파트라 세상에서 제일 가는"

# 토큰화 과정
token = Tokenizer()
token.fit_on_texts([text])
print(f"{token.word_index}\n")
# 결과: {'안녕': 1, '클레오파트라': 2, '세상에서': 3, '제일': 4, '가는': 5, '포테이토칩': 6}

# 시퀀스로 변환
x = token.texts_to_sequences([text])
print(text)  # 원본 텍스트 출력
```

---

## 원-핫 인코딩 상세

```python
from tensorflow.keras.utils import to_categorical

# 단어를 인덱스로 변환
sequences = [[1, 2, 3]]

# 원-핫 인코딩
one_hot = to_categorical(sequences, num_classes=7)
print(one_hot)
```

---

## 장단점

### 장점
- 간단하고 직관적
- 단어 간 독립성 보장

### 단점
- 차원이 매우 높아짐 (Sparse)
- 단어 간 유사도 표현 불가
- 메모리 비효율적

---

## 참고 자료

- [Keras Tokenizer](https://www.tensorflow.org/api_docs/python/tf/keras/preprocessing/text/Tokenizer)
