---
layout: post
title: Pandas의 데이터 조회 및 검사
category: 인공지능 (AI)
tags:
  - pandas
  - python
  - data-analysis
  - data-science
excerpt: Pandas DataFrame의 데이터를 조회하고 검사하는 방법을 알아봅니다.
parent_category: study
learning_framework:
  stage: digestion
  pacer_type: procedural
---

## 예시 데이터프레임

```python
import pandas as pd

df = pd.DataFrame({
    'A': [1, 2, 3, 4, 5],
    'B': [10, 20, 30, 40, 50],
    'C': [100, 200, 300, 400, 500],
})
```

---

## describe() 메서드

데이터프레임의 시리즈(Series)에 대한 기본적인 통계를 반환합니다:

```python
print(df.describe())
```

### 출력 예시

```
       A    B     C
count 5.000000 5.000000 5.000000
mean  3.000000 30.000000 300.000000
std   1.581139 15.811388 158.113883
min   1.000000 10.000000 100.000000
25%   2.000000 20.000000 200.000000
50%   3.000000 30.000000 300.000000
75%   4.000000 40.000000 400.000000
max   5.000000 50.000000 500.000000
```

---

## 주요 통계 정보

- **count**: 데이터 개수
- **mean**: 평균
- **std**: 표준편차
- **min**: 최솟값
- **25%, 50%, 75%**: 사분위수
- **max**: 최댓값

---

## 기타 유용한 메서드

```python
# 데이터 정보
df.info()

# 상위 n개 행
df.head()

# 하위 n개 행
df.tail()

# 데이터 타입
df.dtypes

# 결측치 확인
df.isnull().sum()
```

---

## 참고 자료

- [Pandas Documentation](https://pandas.pydata.org/docs/)
