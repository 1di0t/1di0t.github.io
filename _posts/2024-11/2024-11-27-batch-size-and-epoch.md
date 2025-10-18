---
layout: post
title: "배치 사이즈(Batch Size)와 에폭(Epoch)"
category: ai
tags: [deep-learning, batch-size, epoch, training, neural-networks]
excerpt: "딥러닝 학습 과정에서 중요한 개념인 배치 사이즈와 에폭에 대해 알아봅니다."
---

## 배치 사이즈 (Batch Size)

배치 사이즈는 딥러닝에서 학습 시 한 번에 처리하는 데이터의 양을 의미합니다.

### 예시

100개의 문제를 10개씩 풀고 채점한다면, 배치 사이즈는 10이 됩니다.

---

## 코드 예제

```python
model.fit(train_set, epochs=10, batch_size=20)
```

### 동작 방식

데이터셋 크기가 200이라면:
- `batch_size=20`: 데이터를 20개씩 나눔
- `200 / 20 = 10`: 10번의 가중치 업데이트를 수행
- 이 10번의 업데이트가 **1 에폭**

---

## 에폭 (Epoch)

에폭은 전체 데이터셋을 한 바퀴 완전히 학습하는 과정을 의미합니다.

### 예시

위 코드에서:
- 10번의 업데이트 = 1 에폭
- `epochs=10`: 이 과정을 10번 반복

즉, 전체 데이터셋을 10번 학습합니다.

---

## 배치 사이즈의 영향

### 작은 배치 사이즈

```python
model.fit(X_train, y_train, batch_size=8, epochs=10)
```

**장점**:
- 메모리 사용량 적음
- 일반화 성능 향상 가능
- 더 자주 가중치 업데이트

**단점**:
- 학습 시간 길어짐
- 노이즈 많음
- 불안정한 학습

---

### 큰 배치 사이즈

```python
model.fit(X_train, y_train, batch_size=256, epochs=10)
```

**장점**:
- 빠른 학습 속도
- 안정적인 그래디언트
- GPU 활용 효율적

**단점**:
- 메모리 사용량 많음
- 일반화 성능 저하 가능
- Local minima에 빠질 위험

---

## 배치 사이즈 선택 가이드

| 데이터셋 크기 | 권장 배치 사이즈 |
|---------------|------------------|
| 작음 (< 1000) | 16-32 |
| 중간 (1000-10000) | 32-64 |
| 큼 (> 10000) | 64-256 |

---

## 전체 데이터셋 vs 배치

### 배치 학습의 필요성

```python
# 전체 데이터를 한 번에 (비효율적)
model.fit(X_train, y_train, batch_size=len(X_train))

# 배치로 나눠서 (권장)
model.fit(X_train, y_train, batch_size=32)
```

**배치 학습의 이유**:
1. 메모리 제약
2. 더 나은 일반화
3. 정규화 효과

---

## 실전 예제

### TensorFlow/Keras

```python
import tensorflow as tf
from tensorflow import keras

# 데이터 준비
(X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()
X_train = X_train.reshape(-1, 28*28) / 255.0

# 모델 생성
model = keras.Sequential([
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# 학습
history = model.fit(
    X_train, y_train,
    batch_size=32,      # 배치 사이즈
    epochs=10,          # 에폭 수
    validation_split=0.2
)
```

---

### PyTorch

```python
import torch
from torch.utils.data import DataLoader, TensorDataset

# 데이터 준비
X_train = torch.randn(1000, 10)
y_train = torch.randint(0, 2, (1000,))

# 데이터셋 및 데이터로더 생성
dataset = TensorDataset(X_train, y_train)
dataloader = DataLoader(
    dataset,
    batch_size=32,
    shuffle=True
)

# 학습 루프
model = torch.nn.Linear(10, 2)
criterion = torch.nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters())

epochs = 10
for epoch in range(epochs):
    for batch_X, batch_y in dataloader:
        # Forward pass
        outputs = model(batch_X)
        loss = criterion(outputs, batch_y)

        # Backward pass
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

    print(f'Epoch {epoch+1}/{epochs}, Loss: {loss.item():.4f}')
```

---

## 배치 관련 용어

### 1. Batch Gradient Descent
전체 데이터셋 사용

```python
batch_size = len(X_train)
```

### 2. Stochastic Gradient Descent (SGD)
한 번에 하나의 샘플

```python
batch_size = 1
```

### 3. Mini-batch Gradient Descent
작은 배치 사용 (가장 일반적)

```python
batch_size = 32  # 또는 64, 128, 256
```

---

## 계산 예제

### 시나리오
- 전체 데이터: 1000개
- 배치 사이즈: 50
- 에폭: 20

### 계산
```python
iterations_per_epoch = 1000 / 50 = 20
total_iterations = 20 * 20 = 400
```

**결과**:
- 1 에폭당 20번 업데이트
- 총 400번의 가중치 업데이트

---

## 모니터링

```python
import matplotlib.pyplot as plt

# 학습 이력 시각화
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(history.history['loss'], label='Training Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(history.history['accuracy'], label='Training Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()

plt.show()
```

---

## 최적화 팁

### 1. Learning Rate와 배치 사이즈

```python
# 큰 배치 사이즈 사용 시 learning rate도 증가
batch_size = 256
learning_rate = 0.001 * (batch_size / 32)
```

### 2. Warm-up 전략

```python
# 처음에는 작은 learning rate로 시작
initial_lr = 0.0001
final_lr = 0.001
warmup_epochs = 3
```

---

## 참고 자료

- [Deep Learning Book - Training](https://www.deeplearningbook.org/)
- [TensorFlow Guide](https://www.tensorflow.org/guide)
- [PyTorch Tutorial](https://pytorch.org/tutorials/)
