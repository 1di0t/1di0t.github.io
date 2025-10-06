---
layout: post
title: "DCCD(DemonCastleCodeDelegator)"
category: project
tags: [spam-detection, data-analysis, email, machine-learning, data-collection]
excerpt: "이메일 스팸 데이터를 수집하고 분석하여 스팸 탐지 시스템을 구축하는 프로젝트입니다."
---

## 데이터 수집 및 분석 요약

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

## 데이터 병합 및 전처리

### 데이터 축소

메일제목과 스팸 여부로 데이터를 축소하여 핵심 정보에 집중합니다.

```python
# 데이터 병합
merged_data = pd.concat([spam_data[['title', 'is_spam']],
                         normal_data[['title', 'is_spam']]])

# 데이터 확인
print(merged_data.shape)
print(merged_data.head())
```

---

## 향후 계획

### 데이터 활용 전략

제목과 내용을 결합하여 더 정확한 스팸 탐지 모델을 구축할 예정입니다.

```python
# 제목과 내용 결합
data['combined_text'] = data['title'] + ' ' + data['content']
```

---

## 프로젝트 구조

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
