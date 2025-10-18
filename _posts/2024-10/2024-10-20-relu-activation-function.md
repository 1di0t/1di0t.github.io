---
layout: post
title: 활성화 함수(Relu)
category: 인공지능 (AI)
tags:
  - deep-learning
  - activation-function
  - relu
  - neural-networks
excerpt: 딥러닝에서 가장 많이 사용되는 활성화 함수인 ReLU의 개념과 특징을 알아봅니다.
parent_category: study
learning_framework:
  stage: digestion
  pacer_type: reference
  pacer_types:
    - reference
    - conceptual
---

## ReLU (Rectified Linear Unit)

ReLU는 수학적으로 다음과 같이 표현됩니다:

$$f(x) = \max(0, x)$$

---

## 특징

- **입력이 0보다 클 경우**: 입력을 그대로 출력
- **입력이 0 이하일 경우**: 0을 출력

---

## 장점

ReLU를 사용하면 기존의 Sigmoid나 tanh에서 발생하던 **기울기 소실 문제(Vanishing Gradient Problem)**를 해결할 수 있습니다.

---

## Python 구현

```python
import numpy as np
import matplotlib.pyplot as plt

def relu(x):
    return np.maximum(0, x)

# 시각화
x = np.linspace(-10, 10, 100)
y = relu(x)

plt.plot(x, y)
plt.grid(True)
plt.title('ReLU Activation Function')
plt.xlabel('x')
plt.ylabel('f(x)')
plt.show()
```

---

## 다른 활성화 함수와 비교

| 함수 | 수식 | 범위 | 특징 |
|------|------|------|------|
| **ReLU** | max(0, x) | [0, ∞) | 계산 빠름, 기울기 소실 해결 |
| **Sigmoid** | 1/(1+e^-x) | (0, 1) | 이진 분류에 적합 |
| **Tanh** | (e^x-e^-x)/(e^x+e^-x) | (-1, 1) | 평균이 0 |

---

## 참고 자료

- [Deep Learning Book](https://www.deeplearningbook.org/)
