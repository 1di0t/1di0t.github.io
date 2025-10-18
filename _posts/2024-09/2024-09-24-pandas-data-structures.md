---
layout: post
title: Pandas 의 데이터 구조
category: 인공지능 (AI)
tags:
  - pandas
  - python
  - data-science
  - series
  - dataframe
excerpt: Pandas의 핵심 데이터 구조인 Series와 DataFrame에 대해 알아봅니다.
---

## 핵심 데이터 구조

Pandas의 핵심 데이터 구조는 **Series**와 **DataFrame**입니다.

---

## Series

### 특징

- **1차원 구조**
- 하나의 분류에 해당하는 데이터 저장
- 인덱스(index)와 값(value)로 구성

---

### 생성 예시

#### 기본 생성

```python
import pandas as pd

# 기본 생성
animal_series = pd.Series(['돼지', '코끼리', '하마', '상어'])
print(animal_series)
```

#### 딕셔너리로 생성

```python
s2 = pd.Series({'a': 1, 'b': 2, 'c': 3})
print(s2)
```

#### 사용자 정의 인덱스 지정

```python
s3 = pd.Series([4, 7, -5, 3], index=["d", "b", "a", "c"])
print(s3)
```

---

## DataFrame

### 특징

- **복수의 열을 가진 2차원 데이터 구조**
- 여러 개의 Series를 포함할 수 있음
- 행(row)과 열(column)로 구성

---

### 생성 예시

```python
# 딕셔너리로 생성
data = {
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'city': ['Seoul', 'Busan', 'Daegu']
}

df = pd.DataFrame(data)
print(df)
```

---

## Series vs DataFrame

| 특징 | Series | DataFrame |
|------|--------|-----------|
| **차원** | 1차원 | 2차원 |
| **구조** | 단일 열 | 여러 열 |
| **인덱싱** | 인덱스 | 행/열 인덱스 |

---

## 참고 자료

- [Pandas Documentation](https://pandas.pydata.org/docs/)
