---
layout: post
title: 인공지능 학습 분류
category: 인공지능 (AI)
tags:
  - machine-learning
  - supervised-learning
  - classification
  - regression
  - algorithms
excerpt: 지도학습의 분류(Classification)와 회귀(Regression) 기법에 대해 알아봅니다.
parent_category: study
learning_framework:
  stage: digestion
  pacer_type: procedural
  pacer_types:
    - procedural
    - reference
---

## 학습 분류 개요

**Supervised learning(지도학습)**은 학습 데이터로 input과 label(target) 값을 공급하는 학습 방법입니다.

지도학습은 크게 두 가지로 나눌 수 있습니다.

---

## 1. Classification (분류) 기법

특정한 값을 분류해내는 기법으로, 다음과 같은 알고리즘들이 포함됩니다:

- **로지스틱 회귀 (Logistic Regression)**
- **선형 판별 분석 (Linear Discriminant Analysis)**
- **K-최근접 이웃 (k-Nearest Neighbors, k-NN)**
- **트리 (Decision Trees)**
- **인공 신경망 (Artificial Neural Networks)**
- **서포트 벡터 머신 (SVM)**

---

## 2. Regression (회귀) 기법

분류 기법과 달리 label(결과)의 값이 **연속적**인 특징을 가집니다.

### 예시

- 집 가격 예측
- 온도 예측
- 주가 예측

---

## 분류 vs 회귀

| 특징 | 분류 (Classification) | 회귀 (Regression) |
|------|----------------------|-------------------|
| **출력** | 범주형 (이산형) | 연속형 |
| **예시** | 스팸/정상, 고양이/개 | 가격, 온도 |
| **평가 지표** | 정확도, F1-score | MSE, RMSE, MAE |

---

## Python 예제

### 분류 (Classification)

```python
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_iris

# 데이터 로드
iris = load_iris()
X, y = iris.data, iris.target

# 모델 학습
model = LogisticRegression()
model.fit(X, y)

# 예측
predictions = model.predict(X[:5])
print(predictions)
```

### 회귀 (Regression)

```python
from sklearn.linear_model import LinearRegression
import numpy as np

# 데이터 생성
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 6, 8, 10])

# 모델 학습
model = LinearRegression()
model.fit(X, y)

# 예측
predictions = model.predict([[6]])
print(predictions)  # 약 12
```

---

## 참고 자료

- [Scikit-learn Documentation](https://scikit-learn.org/stable/)
- [Machine Learning Mastery](https://machinelearningmastery.com/)
