---
title: "DCCD 스팸 탐지 시스템"
category: AI-ML
tech_stack: [Python, Pandas, Scikit-learn, TensorFlow, TF-IDF, Machine-Learning]
github:
demo:
period: "2024.11"
thumbnail:
excerpt: "이메일 스팸 데이터를 수집하고 분석하여 머신러닝 기반 스팸 탐지 시스템을 구축하는 프로젝트입니다."
---

## 프로젝트 개요

한국우편사업진흥원의 스팸 데이터와 Gmail의 정상 메일 데이터를 활용하여 머신러닝 기반의 이메일 스팸 탐지 시스템을 구축한 프로젝트입니다. 데이터 수집부터 전처리, 모델 학습, 예측까지 전체 파이프라인을 구현하였습니다.

## 주요 기능

### 1. 데이터 수집 및 통합
- 한국우편사업진흥원 스팸 데이터 수집 (수신일시, 메일종류, 제목, 첨부파일 정보)
- Gmail 정상 메일 데이터 수집 (제목, 발신자, 수신자, 날짜, 내용)
- 이중 데이터 소스 통합 및 라벨링

### 2. 데이터 분석 및 전처리
- 상관관계 분석 (날짜/시간대와 스팸 여부)
- 결측치 및 중복 데이터 제거
- 텍스트 정규화 및 정제

### 3. 머신러닝 모델
- TF-IDF를 활용한 특징 추출
- Naive Bayes 기반 분류 모델
- 앙상블 기법 적용 (Voting Classifier)
- 딥러닝 모델 (LSTM) 구현

## 기술적 도전과 해결

### 문제 1: 데이터 불균형
**도전**: 스팸과 정상 메일의 비율이 불균형하여 모델이 편향될 수 있는 문제가 있었습니다.

**해결**:
- 데이터 증강 기법 적용
- SMOTE를 활용한 오버샘플링
- 클래스 가중치 조정

### 문제 2: 특징 선택
**도전**: 날짜와 시간대는 스팸 판별에 큰 영향을 미치지 않는 것으로 분석되었습니다.

**해결**:
- 메일 제목과 내용에 집중
- TF-IDF를 활용한 텍스트 특징 추출
- N-gram 기법을 통한 문맥 정보 활용

### 문제 3: 한국어 텍스트 처리
**도전**: 한국어 텍스트의 형태소 분석과 불용어 처리가 필요했습니다.

**해결**:
- 텍스트 정규화 및 정제 파이프라인 구축
- 도메인 특화 불용어 사전 구축
- 문자 수준과 단어 수준 특징 결합

## 성과

- 다중 소스 데이터 통합 및 전처리 파이프라인 구축
- TF-IDF 기반 특징 추출로 텍스트 정보 효과적 활용
- 앙상블 기법을 통한 모델 성능 향상
- 확률 기반 예측으로 신뢰도 정보 제공

## 향후 계획

1. 제목과 내용을 결합한 멀티모달 분석
2. 딥러닝 모델(LSTM, BERT) 성능 비교
3. 실시간 스팸 탐지 API 서버 구축
4. 사용자 피드백 기반 온라인 학습 구현

## 배운 점

이 프로젝트를 통해 데이터 수집부터 모델 배포까지 머신러닝 전체 파이프라인을 경험할 수 있었습니다. 특히 데이터 품질의 중요성과 상관관계 분석을 통한 특징 선택의 중요성을 배웠습니다.

---

## 데이터 수집 및 분석

### 데이터 수집 소스

#### 1. 한국우편사업진흥원: 스팸 데이터

**수집 항목**:
- 수신일자
- 수신시간
- 메일종류
- 메일제목
- 첨부파일 유무

---

#### 2. Google Mail: 정상 메일 데이터

**수집 항목**:
- 메일제목
- 보낸사람
- 받은사람
- 날짜
- 메일내용

---

## 상관관계 분석

### 분석 결과

1. **날짜와 스팸 여부**
   - 관련성: 낮음
   - 날짜만으로는 스팸 판별 어려움

2. **시간대와 스팸 여부**
   - 관련성: 큰 관련 없음
   - 시간대가 스팸 판별에 큰 영향 미치지 않음

---

## 구현 상세

### 1. 데이터 수집

```python
import pandas as pd

def collect_spam_data():
    """한국우편사업진흥원 스팸 데이터 수집"""
    spam_df = pd.read_csv('spam_data.csv')
    spam_df['is_spam'] = 1
    return spam_df

def collect_normal_data():
    """Gmail 정상 메일 데이터 수집"""
    normal_df = pd.read_csv('normal_mail.csv')
    normal_df['is_spam'] = 0
    return normal_df
```

---

### 2. 데이터 전처리

```python
def preprocess_data(df):
    """데이터 전처리"""
    # 결측치 제거
    df = df.dropna(subset=['title'])

    # 중복 제거
    df = df.drop_duplicates(subset=['title'])

    # 텍스트 정리
    df['title'] = df['title'].str.strip()

    return df
```

---

### 3. 특징 추출

```python
from sklearn.feature_extraction.text import TfidfVectorizer

def extract_features(texts):
    """TF-IDF 특징 추출"""
    vectorizer = TfidfVectorizer(
        max_features=5000,
        ngram_range=(1, 2)
    )
    features = vectorizer.fit_transform(texts)
    return features, vectorizer
```

---

### 4. 모델 학습

```python
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import classification_report

def train_model(X, y):
    """스팸 탐지 모델 학습"""
    # 데이터 분할
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # 모델 학습
    model = MultinomialNB()
    model.fit(X_train, y_train)

    # 평가
    y_pred = model.predict(X_test)
    print(classification_report(y_test, y_pred))

    return model
```

---

## 전체 파이프라인

```python
# 1. 데이터 수집
spam_data = collect_spam_data()
normal_data = collect_normal_data()

# 2. 데이터 병합
all_data = pd.concat([spam_data, normal_data])

# 3. 전처리
all_data = preprocess_data(all_data)

# 4. 특징 추출
X, vectorizer = extract_features(all_data['title'])
y = all_data['is_spam']

# 5. 모델 학습
model = train_model(X, y)

# 6. 예측
def predict_spam(text):
    """스팸 여부 예측"""
    features = vectorizer.transform([text])
    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0]

    return {
        'is_spam': bool(prediction),
        'spam_probability': probability[1],
        'normal_probability': probability[0]
    }

# 테스트
test_email = "무료로 제공되는 특별한 혜택!"
result = predict_spam(test_email)
print(result)
```

---

## 성능 개선 방안

### 1. 딥러닝 모델 활용

```python
from tensorflow import keras

model = keras.Sequential([
    keras.layers.Embedding(input_dim=10000, output_dim=128),
    keras.layers.LSTM(64),
    keras.layers.Dense(1, activation='sigmoid')
])

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)
```

---

### 2. 앙상블 기법

```python
from sklearn.ensemble import VotingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC

# 여러 모델 결합
ensemble = VotingClassifier(
    estimators=[
        ('nb', MultinomialNB()),
        ('lr', LogisticRegression()),
        ('svm', SVC(probability=True))
    ],
    voting='soft'
)
```

---

## 데이터 시각화

```python
import matplotlib.pyplot as plt
import seaborn as sns

# 스팸/정상 메일 분포
plt.figure(figsize=(8, 6))
all_data['is_spam'].value_counts().plot(kind='bar')
plt.title('스팸/정상 메일 분포')
plt.xlabel('메일 유형 (0: 정상, 1: 스팸)')
plt.ylabel('개수')
plt.show()

# 제목 길이 분포
plt.figure(figsize=(12, 6))
all_data['title_length'] = all_data['title'].str.len()
sns.boxplot(x='is_spam', y='title_length', data=all_data)
plt.title('스팸/정상 메일의 제목 길이 분포')
plt.show()
```

---

## 참고 자료

- [Scikit-learn Text Classification](https://scikit-learn.org/stable/tutorial/text_analytics/working_with_text_data.html)
- [SpamAssassin](https://spamassassin.apache.org/)
