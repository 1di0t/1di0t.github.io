---
layout: post
title: "SpamGuardian - 머신러닝 기반 스팸 필터링 프로젝트"
date: 2025-10-07 01:00:00 +0900
categories: [project, machine-learning]
tags: [머신러닝, 스팸필터, python, knn, naive-bayes, flask, react]
---

## 데이터 수집

### 스팸 데이터
한국우편사업진흥원에서 스팸 데이터를 수집하였습니다.

수신일자, 수신시간, 메일종류, 메일제목, 첨부파일 유무로 구성하였습니다.

### 정상 메일 데이터
Google Mail에서 정상 메일 데이터 수집하였습니다.

메일제목, 보낸사람, 받은사람, 날짜, 더보기, 인덱스, 메일내용으로 구성하였습니다.

## 상관관계 분석

날짜와 스팸여부는 관련성이 낮은 것으로 판단 했습니다.

시간대와 스팸여부의 상관관계를 분석한 결과, 시간대는 스팸여부와는 큰 관련이 없다고 판단했습니다.

## 데이터 병합

한국우편사업진흥원에서 수집한 스팸, 바이러스 데이터는 구글에 있는 날짜, 시간 내용 등이 없기 때문에 메일제목, 스팸여부로 축소 후 병합하였습니다.

추후 입력 받을 데이터는 제목과 내용을 결합하여 사용하기로 결정했습니다.

## 데이터 전처리

```python
# load data
spam_ham = pd.read_csv("Rabble/datasets/combined_data_under.csv")
logger.info("데이터 로드 완료")

# change data type to numeric
spam_ham['메일종류'] = spam_ham['메일종류'].map({'햄':0, '스팸':1})
logger.info("데이터 타입 변경 완료")

# split data
X_train,X_test,y_train,y_test = train_test_split(spam_ham['메일제목'], spam_ham['메일종류'], test_size=0.3, random_state=42)
logger.info("데이터 분리 완료")

# 형태소 분석 적용
# Morphological Analysis
X_train_tokenized = X_train.apply(dp.tokenize_kiwi)
X_test_tokenized = X_test.apply(dp.tokenize_kiwi)
logger.info("형태소 분석 완료")

# padding - make all data to same length
max_len = max(len(i) for i in X_train)
encoder = dp.TextEncoder
encoder.fit(X_test_tokenized)
X_train = encoder.encode(X_train)
X_test = encoder.encode(X_test_tokenized)
logger.info("패딩 완료")

# one-hot encoding
y_train = to_categorical(y_train)
y_test = to_categorical(y_test)
logger.info("원핫인코딩 완료")
```

kiwi 형태소 분석기를 활용해 형태소로 분리하였고 패딩후 원핫인코딩을 적용시켰습니다.

## 딥러닝 모델 구축

```python
def create_regularized_model(input_dim, output_dim):
    model = Sequential([
        Embedding(input_dim = vocab_size,output_dim=64, input_length=max_len),
        GlobalAveragePooling1D,

        # L1 정규화
        Dense(64, activation='relu', input_shape=(input_dim,),
              kernel_regularizer=l1(0.02)),
        Dropout(0.3),

        # L2 정규화
        Dense(32, activation='relu',
              kernel_regularizer=l2(0.02)),
        Dropout(0.3),

        # L1 및 L2 정규화 동시 적용
        Dense(16, activation='relu',
              kernel_regularizer=l1_l2(l1=0.02, l2=0.02)),
        Dropout(0.3),

        Dense(output_dim, activation='softmax')
    ])

    # 모델 컴파일
    model.compile(optimizer=Adam(learning_rate=0.001),
                  loss='binary_crossentropy',
                  metrics=['accuracy'])

    return model
```

여러가지 모델을 실험 후 최종적으로 Sequential 모델을 구축 했습니다.
하지만 기대치 만큼의 정확도는 확보할 수 없었습니다.

```python
# K-NN 모델 학습
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(X_train, y_train)
joblib.dump(knn, 'knn_model.pkl')

# 나이브 베이즈 모델 학습
nb_model = MultinomialNB
nb_model.fit(X_train, y_train)
joblib.dump(nb_model, 'nb_model.pkl')
```

여러가지 모델을 실험중 오히려 머신러닝에서 원하는 정확도를 이끌어 낼수 있었고
KNN과 나이브베이즈를 이용하는 방안을 채택했습니다.

## 결과

이후 React와 Flask를 통해 간단한 웹앱으로 구현하였습니다.
간단한 테스트들은 통과하는 것으로 프로젝트를 1차 마무리 했습니다.
