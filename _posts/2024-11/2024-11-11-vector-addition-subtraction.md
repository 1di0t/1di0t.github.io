---
layout: post
title: 벡터의 덧셈과 뺄셈
category: 인공지능 (AI)
tags:
  - vector
  - mathematics
  - linear-algebra
  - machine-learning
excerpt: 머신러닝의 기초가 되는 벡터의 개념과 연산 방법을 알아봅니다.
parent_category: study
learning_framework:
  stage: digestion
  pacer_type: procedural
---

## 벡터 소개

벡터는 크기와 방향을 가진 값입니다. 예를 들어 `[3, 4]` 벡터는 좌표평면에 다음과 같이 표현됩니다.

---

## 벡터의 특성

### 크기 (Magnitude)

빗변의 길이로 계산됩니다:

$$\text{크기} = \sqrt{4^{2}+3^{2}} = \sqrt{16+9} = \sqrt{25} = 5$$

### 방향 (Direction)

각도로 표현됩니다:

$$\theta = \tan^{-1}\frac{3}{4}$$

---

## 벡터 특징

- `[4,3]`과 `[8,3]`은 크기와 방향이 같은 벡터입니다
- 시작점이 달라도 방향과 크기가 같으면 같은 벡터

---

## 벡터 연산

### 벡터 덧셈

```python
[4, 3] + [-1, 2] = [3, 5]
```

각 요소끼리 더합니다.

### 벡터 뺄셈

```python
[4, 3] - [-1, 2] = [5, 1]
```

각 요소끼리 뺍니다.

---

## Python 구현

```python
import numpy as np

# 벡터 정의
v1 = np.array([4, 3])
v2 = np.array([-1, 2])

# 벡터 덧셈
v_add = v1 + v2
print(f"덧셈: {v_add}")  # [3 5]

# 벡터 뺄셈
v_sub = v1 - v2
print(f"뺄셈: {v_sub}")  # [5 1]

# 벡터 크기
magnitude = np.linalg.norm(v1)
print(f"v1의 크기: {magnitude}")  # 5.0
```

---

## 참고 자료

- [선형대수학 기초](https://www.khanacademy.org/math/linear-algebra)
