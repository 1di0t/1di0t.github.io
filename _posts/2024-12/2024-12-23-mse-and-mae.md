---
layout: post
title: MSE와 MAE
category: 인공지능 (AI)
tags:
  - machine-learning
  - loss-function
  - mse
  - mae
  - regression
  - evaluation
excerpt: 머신러닝 모델 학습 시 사용되는 두 가지 주요 에러 평가 지표인 MSE와 MAE의 차이점을 알아봅니다.
---

## 개요

학습 시 에러를 평가할 때, 에러 값의 상쇄를 방지하기 위해 MSE와 MAE를 사용합니다.

---

## Mean Squared Error (MSE)

### 정의

에러 값을 제곱하여 음의 수를 제거하는 방법입니다.

### 수식

$$MSE = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2$$

### 특징

- **민감도**: 변화에 더 민감하게 반응
- **이상치 영향**: 이상치와 가깝게 지나가는 모델을 생성
- **제곱 효과**: 큰 오차에 더 큰 페널티 부여

---

## Mean Absolute Error (MAE)

### 정의

에러 값을 절대값으로 변환하는 방법입니다.

### 수식

$$MAE = \frac{1}{n}\sum_{i=1}^{n}|y_i - \hat{y}_i|$$

### 특징

- **선형성**: 값에 선형적으로 변화
- **전체 흐름**: 데이터의 전체적인 흐름에 맞는 모델을 생성
- **균등한 페널티**: 모든 오차에 동일한 가중치

---

## MSE vs MAE 비교

| 특징 | MSE | MAE |
|------|-----|-----|
| **계산 방식** | 제곱 | 절대값 |
| **이상치 민감도** | 높음 | 낮음 |
| **미분 가능성** | 모든 점에서 가능 | 0에서 불가능 |
| **해석** | 단위가 제곱됨 | 원래 단위 유지 |
| **최적화** | 평균에 수렴 | 중앙값에 수렴 |

---

## 언제 어떤 지표를 사용할까?

### MSE 사용이 적합한 경우

- 이상치에 큰 페널티를 주고 싶을 때
- 큰 오차를 줄이는 것이 중요할 때
- 미분 가능한 손실 함수가 필요할 때

### MAE 사용이 적합한 경우

- 이상치의 영향을 줄이고 싶을 때
- 모든 오차를 동등하게 처리하고 싶을 때
- 해석이 쉬운 지표가 필요할 때

---

## Python 구현

### NumPy로 구현

```python
import numpy as np

def mse(y_true, y_pred):
    """Mean Squared Error"""
    return np.mean((y_true - y_pred) ** 2)

def mae(y_true, y_pred):
    """Mean Absolute Error"""
    return np.mean(np.abs(y_true - y_pred))

# 예시
y_true = np.array([3, -0.5, 2, 7])
y_pred = np.array([2.5, 0.0, 2, 8])

print(f"MSE: {mse(y_true, y_pred):.4f}")
print(f"MAE: {mae(y_true, y_pred):.4f}")
```

---

### Scikit-learn 사용

```python
from sklearn.metrics import mean_squared_error, mean_absolute_error

y_true = [3, -0.5, 2, 7]
y_pred = [2.5, 0.0, 2, 8]

mse_value = mean_squared_error(y_true, y_pred)
mae_value = mean_absolute_error(y_true, y_pred)

print(f"MSE: {mse_value:.4f}")
print(f"MAE: {mae_value:.4f}")
```

---

## RMSE (Root Mean Squared Error)

MSE의 제곱근을 취한 값으로, 원래 단위로 변환됩니다.

### 수식

$$RMSE = \sqrt{MSE} = \sqrt{\frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2}$$

### 특징

- MSE의 단위 문제 해결
- 해석이 용이
- 여전히 이상치에 민감

```python
import numpy as np
from sklearn.metrics import mean_squared_error

def rmse(y_true, y_pred):
    """Root Mean Squared Error"""
    return np.sqrt(mean_squared_error(y_true, y_pred))

y_true = [3, -0.5, 2, 7]
y_pred = [2.5, 0.0, 2, 8]

print(f"RMSE: {rmse(y_true, y_pred):.4f}")
```

---

## 시각화로 이해하기

```python
import numpy as np
import matplotlib.pyplot as plt

# 데이터 생성
errors = np.linspace(-5, 5, 100)
mse_values = errors ** 2
mae_values = np.abs(errors)

# 시각화
plt.figure(figsize=(10, 6))
plt.plot(errors, mse_values, label='MSE', linewidth=2)
plt.plot(errors, mae_values, label='MAE', linewidth=2)
plt.xlabel('Error')
plt.ylabel('Loss')
plt.title('MSE vs MAE')
plt.legend()
plt.grid(True)
plt.show()
```

---

## 실전 예제

```python
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error
import numpy as np

# 샘플 데이터 생성
np.random.seed(42)
X = np.random.rand(100, 1) * 10
y = 2 * X + 1 + np.random.randn(100, 1) * 2

# 학습/테스트 분할
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# 모델 학습
model = LinearRegression()
model.fit(X_train, y_train)

# 예측
y_pred = model.predict(X_test)

# 평가
mse = mean_squared_error(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mse)

print(f"MSE: {mse:.4f}")
print(f"MAE: {mae:.4f}")
print(f"RMSE: {rmse:.4f}")
```

---

## 참고 자료

- [Scikit-learn Metrics](https://scikit-learn.org/stable/modules/model_evaluation.html)
- [Loss Functions in Machine Learning](https://machinelearningmastery.com/loss-and-loss-functions-for-training-deep-learning-neural-networks/)
