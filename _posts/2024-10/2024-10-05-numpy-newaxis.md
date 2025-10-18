---
layout: post
title: numpy.newaxis
category: 인공지능 (AI)
tags:
  - numpy
  - python
  - array
  - dimension
  - data-science
excerpt: NumPy 배열의 차원을 확장하는 newaxis의 사용법을 알아봅니다.
parent_category: study
learning_framework:
  stage: digestion
  pacer_type: procedural
---

## 개요

`numpy.newaxis`는 NumPy 배열의 차원을 증가시키는 데 사용되는 도구입니다.

---

## 예제 1: 1D에서 2D 배열로

### 초기 배열

```python
import numpy as np

arr_1d = np.arange(4)
print(arr_1d.shape)  # 출력: (4,)
```

---

### 수평 차원 확장

```python
arr_2d_horizontal = arr_1d[np.newaxis, :]
print(arr_2d_horizontal.shape)  # 출력: (1, 4)
```

1행 4열의 2D 배열 생성

---

### 수직 차원 확장

```python
arr_2d_vertical = arr_1d[:, np.newaxis]
print(arr_2d_vertical.shape)  # 출력: (4, 1)
```

4행 1열의 2D 배열 생성

---

## 주요 목적

기존 배열에 새로운 축(차원)을 추가하여 다양한 데이터 조작 및 머신러닝 작업에 활용할 수 있습니다.

---

## 실용 예제

```python
# 브로드캐스팅에 활용
a = np.array([1, 2, 3])
b = np.array([10, 20, 30])

# 외적(outer product) 계산
result = a[:, np.newaxis] * b[np.newaxis, :]
print(result)
# [[10 20 30]
#  [20 40 60]
#  [30 60 90]]
```

---

## 참고 자료

- [NumPy Documentation](https://numpy.org/doc/)
