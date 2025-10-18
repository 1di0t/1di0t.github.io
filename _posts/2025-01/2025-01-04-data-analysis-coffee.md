---
layout: post
title: 데이터 분석
category: 데이터사이언스 (Data Science)
tags:
  - data-analysis
  - coffee
  - pandas
  - python
  - data-columns
excerpt: 커피 데이터 분석을 위한 컬럼 구조와 데이터 항목에 대해 알아봅니다.
parent_category: study
learning_framework:
  stage: digestion
  pacer_type: procedural
---

## 개요

커피 관련 데이터를 분석하기 위한 프로젝트입니다. 각 컬럼의 의미와 활용 방법을 정리합니다.

---

## 데이터 컬럼 설명

### 기본 정보

#### ColumnsSlug
- 리뷰 소스 웹사이트 주소
- 데이터 출처 추적

#### All_text
- 스크래핑된 모든 텍스트
- 원본 데이터 보존

---

### 평가 정보

#### Rating
- 커피 점수
- 전체적인 품질 평가

#### Review_date
- 리뷰 날짜
- 시계열 분석에 활용

---

### 커피 상세 정보

#### Name
- 커피 이름
- 제품 식별자

#### Roaster
- 로스팅 장소
- 생산자 정보

#### Location
- 로스터의 위치
- 지역별 분석 가능

#### Origin
- 커피 원산지
- 생두 생산 국가/지역

---

### 로스팅 정보

#### Roast
- 로스팅 레벨
- 예: Light, Medium, Dark

#### Agtron
- 로스팅 레벨 (분쇄 전/후)
- 수치적 로스팅 정도 측정

---

### 가격 정보

#### Est_price
- 가격/수량
- 비용 분석

---

### 향미 평가 (10점 만점)

#### Aroma
- 커피 향
- 후각적 특성 평가

#### Acid
- 산미
- 신맛의 정도와 특성

#### Body
- 바디감
- 텍스처, 무게감, 농도

#### Flavor
- 플레이버
- 종합적인 맛과 향

#### After_taste
- 여운
- 뒷맛, 향의 지속 시간

---

### 상세 평가

#### desc_1
- 상세 맛 평가 단어들
- 구체적인 향미 노트

#### desc_2
- 맛 평가 및 로스터 정보
- 추가 설명

---

## 데이터 분석 예제

### 1. 기본 통계

```python
import pandas as pd

# 데이터 로드
df = pd.read_csv('coffee_data.csv')

# 기본 정보 확인
print(df.info())
print(df.describe())

# 평가 점수 분석
print("\n평가 점수 통계:")
print(df[['Aroma', 'Acid', 'Body', 'Flavor', 'After_taste']].describe())
```

---

### 2. 원산지별 평균 평점

```python
# 원산지별 평균 Rating
origin_ratings = df.groupby('Origin')['Rating'].mean().sort_values(ascending=False)
print("\n원산지별 평균 평점:")
print(origin_ratings.head(10))
```

---

### 3. 로스팅 레벨별 분석

```python
# 로스팅 레벨별 평균 점수
roast_analysis = df.groupby('Roast')[['Aroma', 'Acid', 'Body', 'Flavor']].mean()
print("\n로스팅 레벨별 향미 특성:")
print(roast_analysis)
```

---

### 4. 가격대별 품질 분석

```python
# 가격 구간 생성
df['price_range'] = pd.cut(df['Est_price'], bins=5, labels=['매우 저가', '저가', '중가', '고가', '매우 고가'])

# 가격대별 평균 Rating
price_quality = df.groupby('price_range')['Rating'].mean()
print("\n가격대별 평균 품질:")
print(price_quality)
```

---

### 5. 시계열 분석

```python
# 날짜 형식 변환
df['Review_date'] = pd.to_datetime(df['Review_date'])

# 연도별 평균 Rating
yearly_ratings = df.groupby(df['Review_date'].dt.year)['Rating'].mean()
print("\n연도별 평균 평점:")
print(yearly_ratings)
```

---

## 시각화 예제

```python
import matplotlib.pyplot as plt
import seaborn as sns

# 스타일 설정
sns.set_style("whitegrid")
plt.rcParams['font.family'] = 'Malgun Gothic'  # 한글 폰트

# 1. 향미 특성 분포
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
flavors = ['Aroma', 'Acid', 'Body', 'Flavor', 'After_taste', 'Rating']

for idx, flavor in enumerate(flavors):
    ax = axes[idx // 3, idx % 3]
    df[flavor].hist(bins=20, ax=ax)
    ax.set_title(f'{flavor} 분포')
    ax.set_xlabel('점수')
    ax.set_ylabel('빈도')

plt.tight_layout()
plt.show()

# 2. 원산지별 상위 10개 평균 평점
top_origins = df.groupby('Origin')['Rating'].mean().sort_values(ascending=False).head(10)
plt.figure(figsize=(12, 6))
top_origins.plot(kind='bar')
plt.title('원산지별 평균 평점 (상위 10개)')
plt.xlabel('원산지')
plt.ylabel('평균 평점')
plt.xticks(rotation=45)
plt.show()
```

---

## 고급 분석

### 상관관계 분석

```python
# 향미 특성 간 상관관계
correlation = df[['Aroma', 'Acid', 'Body', 'Flavor', 'After_taste', 'Rating']].corr()

plt.figure(figsize=(10, 8))
sns.heatmap(correlation, annot=True, cmap='coolwarm', center=0)
plt.title('향미 특성 상관관계')
plt.show()
```

---

## 참고 자료

- [Pandas 데이터 분석 가이드](https://pandas.pydata.org/docs/)
- [Matplotlib 시각화](https://matplotlib.org/)
- [Seaborn 통계 시각화](https://seaborn.pydata.org/)
