---
layout: post
title: "미분"
category: ai
tags: [mathematics, calculus, differentiation, machine-learning]
excerpt: "머신러닝의 기초가 되는 미분의 개념과 도함수에 대해 알아봅니다."
---

## 미분 설명

미분은 어떤 함수의 순간 변화율을 구하는 과정입니다.

구체적으로, 함수 f(x)의 한 점 a에서의 미분은 다음과 같이 정의할 수 있습니다:

$$f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$$

이 식은 x가 a에 가까워질 때 f(x)의 변화율의 극한을 나타냅니다.

---

## 도함수

도함수는 함수의 미분값을 나타내는 함수입니다.

### 예시

$$f(x) = x^2$$

의 도함수는:

$$f'(x) = 2x$$

---

## 머신러닝에서의 미분

미분은 경사 하강법(Gradient Descent)의 핵심 개념으로, 손실 함수의 최솟값을 찾는 데 사용됩니다.

---

## Python 구현

```python
import numpy as np
import matplotlib.pyplot as plt

def f(x):
    return x**2

def derivative(f, x, h=1e-5):
    return (f(x + h) - f(x)) / h

x = np.linspace(-5, 5, 100)
y = f(x)
y_prime = [derivative(f, xi) for xi in x]

plt.plot(x, y, label='f(x) = x²')
plt.plot(x, y_prime, label="f'(x) = 2x")
plt.legend()
plt.grid(True)
plt.show()
```

---

## 참고 자료

- [Khan Academy - Calculus](https://www.khanacademy.org/math/calculus-1)
