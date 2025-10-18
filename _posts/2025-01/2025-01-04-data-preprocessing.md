---
layout: post
title: 데이터 전처리
category: 데이터사이언스 (Data Science)
tags:
  - data-preprocessing
  - pandas
  - python
  - missing-values
  - data-cleaning
excerpt: 데이터 전처리 과정에서 결측치를 처리하는 방법을 알아봅니다.
parent_category: study
learning_framework:
  stage: digestion
  pacer_type: procedural
---

## 개요

데이터 전처리는 데이터 분석의 첫 단계로, 원본 데이터를 분석 가능한 형태로 변환하는 과정입니다.

---

## 결측치 처리

### 결측치 확인 및 제거

```python
# 결측치 관측 결과
coffee_drop = coffee_text_review.dropna()
print(coffee_drop.shape, '\n')
print(coffee_drop.isnull().sum())

# 결과 예시
# (2438, 3)
# origin 0
# desc_1 0
# desc_3 0
```

---

## 처리 방법 선택

원본 데이터셋에서 결측값이 존재했으며, `dropna()` 메서드를 사용하여 결측값이 있는 행을 제거했습니다.

처리 후 데이터셋의 크기는 (2438, 3)으로 변경되었으며, 결측값은 모두 제거되었습니다. 결측값이 적었기 때문에 행 삭제 방식을 선택했습니다.

---

## 결측치 처리 방법 비교

### 1. 행 삭제 (dropna)

```python
# 결측값이 있는 행 제거
df_dropped = df.dropna()

# 특정 열의 결측값만 제거
df_dropped = df.dropna(subset=['column_name'])
```

**장점**:
- 간단하고 빠름
- 데이터 품질 유지

**단점**:
- 데이터 손실
- 샘플 수 감소

---

### 2. 결측값 채우기 (fillna)

#### 평균값으로 채우기

```python
# 숫자 열의 평균값으로 채우기
df['column_name'].fillna(df['column_name'].mean(), inplace=True)
```

#### 중앙값으로 채우기

```python
# 중앙값으로 채우기
df['column_name'].fillna(df['column_name'].median(), inplace=True)
```

#### 최빈값으로 채우기

```python
# 범주형 데이터의 최빈값으로 채우기
df['column_name'].fillna(df['column_name'].mode()[0], inplace=True)
```

#### 앞/뒤 값으로 채우기

```python
# 앞의 값으로 채우기 (forward fill)
df.fillna(method='ffill', inplace=True)

# 뒤의 값으로 채우기 (backward fill)
df.fillna(method='bfill', inplace=True)
```

---

### 3. 보간법 (Interpolation)

```python
# 선형 보간
df['column_name'].interpolate(method='linear', inplace=True)

# 시계열 데이터 보간
df['column_name'].interpolate(method='time', inplace=True)
```

---

## 결측치 처리 전략

### 결측치 비율에 따른 전략

```python
import pandas as pd

# 결측치 비율 계산
missing_ratio = df.isnull().sum() / len(df) * 100
print(missing_ratio)

# 결측치 비율에 따른 처리
if missing_ratio < 5:
    # 5% 미만: 행 삭제
    df = df.dropna()
elif missing_ratio < 30:
    # 5-30%: 평균/중앙값으로 채우기
    df.fillna(df.mean(), inplace=True)
else:
    # 30% 이상: 해당 열 삭제 고려
    df = df.drop(columns=['column_name'])
```

---

## 실전 예제

### 커피 리뷰 데이터 전처리

```python
import pandas as pd

# 데이터 로드
coffee_text_review = pd.read_csv('coffee_reviews.csv')

# 1. 결측치 확인
print("결측치 개수:")
print(coffee_text_review.isnull().sum())
print("\n데이터셋 크기:", coffee_text_review.shape)

# 2. 결측치 비율 계산
missing_ratio = coffee_text_review.isnull().sum() / len(coffee_text_review) * 100
print("\n결측치 비율(%):")
print(missing_ratio)

# 3. 결측치 제거
coffee_drop = coffee_text_review.dropna()
print("\n처리 후 데이터셋 크기:", coffee_drop.shape)

# 4. 결과 확인
print("\n처리 후 결측치:")
print(coffee_drop.isnull().sum())
```

---

## 데이터 전처리 체크리스트

- [ ] 결측치 확인 및 처리
- [ ] 중복 데이터 제거
- [ ] 이상치(Outlier) 탐지 및 처리
- [ ] 데이터 타입 변환
- [ ] 범주형 데이터 인코딩
- [ ] 데이터 정규화/표준화
- [ ] 피처 엔지니어링

---

## 참고 자료

- [Pandas 공식 문서 - Missing Data](https://pandas.pydata.org/docs/user_guide/missing_data.html)
- [Scikit-learn - Imputation](https://scikit-learn.org/stable/modules/impute.html)
