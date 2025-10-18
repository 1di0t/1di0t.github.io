---
layout: post
title: 임베딩(Embedding)
category: 인공지능 (AI)
tags:
  - embedding
  - nlp
  - vector
  - machine-learning
  - dense-representation
excerpt: 텍스트와 같은 이산적 데이터를 고차원 공간의 연속적인 수치 벡터로 변환하는 임베딩의 개념과 특징을 알아봅니다.
parent_category: study
learning_framework:
  stage: digestion
  pacer_type: procedural
  pacer_types:
    - procedural
    - conceptual
    - evidence
    - reference
---

## 임베딩의 정의

임베딩은 텍스트와 같은 이산적 데이터를 고차원 공간의 연속적인 수치 벡터로 변환하는 방법입니다. "Embed"는 "포함시키다" 또는 "깊숙히 박다"라는 의미를 가집니다.

---

## 주요 특징

### 1. 벡터 공간 표현

- 이산적 데이터를 벡터 공간에 포함
- 데이터 간 유사도를 수치적으로 표현
- 예: 과일(딸기, 사과, 용과) 간 언어적 유사도 표현

### 2. 밀집 표현 (Dense Representation)

- 원-핫 인코딩과 달리 요소의 값이 0이 아닌 연속값으로 존재
- 벡터의 각 요소가 의미 있는 값을 가짐

---

## 목적

데이터 간 유사성을 수치적으로 찾아내는 것

---

## 임베딩의 장점

### 1. 차원 축소

- 원-핫 인코딩에 비해 낮은 차원의 벡터 사용
- 메모리 효율성 증가
- 계산 비용 감소

### 2. 의미적 유사도 표현

```python
# 예시: 단어 간 유사도
similarity("사과", "딸기") > similarity("사과", "자동차")
```

### 3. 연속적인 벡터 공간

- 단어 간의 관계를 수학적으로 표현
- 벡터 연산을 통한 의미 조작 가능

---

## 임베딩 vs 원-핫 인코딩

| 특징 | 원-핫 인코딩 | 임베딩 |
|------|--------------|--------|
| **차원** | 높음 (단어 수만큼) | 낮음 (일반적으로 50-300) |
| **표현** | 희소 벡터 (Sparse) | 밀집 벡터 (Dense) |
| **유사도** | 표현 불가 | 표현 가능 |
| **메모리** | 비효율적 | 효율적 |

---

## 활용 분야

- 자연어 처리 (NLP)
- 추천 시스템
- 이미지 분류
- 유사도 검색
- 감성 분석

---

## 대표적인 임베딩 기법

### 1. Word2Vec

- CBOW (Continuous Bag of Words)
- Skip-gram

### 2. GloVe

- Global Vectors for Word Representation

### 3. FastText

- 서브워드(subword) 기반 임베딩

### 4. Transformer 기반

- BERT
- GPT
- RoBERTa

---

## 실전 예제

```python
from gensim.models import Word2Vec

# 학습 데이터
sentences = [
    ['사과', '과일', '맛있다'],
    ['딸기', '과일', '달다'],
    ['자동차', '탈것', '빠르다']
]

# Word2Vec 모델 학습
model = Word2Vec(sentences, vector_size=100, window=5, min_count=1)

# 유사도 계산
similarity = model.wv.similarity('사과', '딸기')
print(f"사과와 딸기의 유사도: {similarity}")
```

---

## 참고 자료

- [Word2Vec Paper](https://arxiv.org/abs/1301.3781)
- [GloVe: Global Vectors for Word Representation](https://nlp.stanford.edu/projects/glove/)
- [FastText](https://fasttext.cc/)
