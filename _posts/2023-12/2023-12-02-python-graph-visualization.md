---
layout: post
title: Python-그래프
category: 프로그래밍 (Programming)
tags:
  - python
  - matplotlib
  - numpy
  - visualization
  - graph
excerpt: Python에서 Matplotlib을 사용하여 삼각함수 그래프를 그리는 방법을 알아봅니다.
---

## 코드 예제

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.arange(1, 10, 0.1)
y1 = np.sin(x)
y2 = np.cos(x)

plt.plot(x, y1, label="sin")
plt.plot(x, y2, linestyle="--", label="cos")
plt.legend()
plt.show()
```

---

## 코드 설명

### x 값 설정

```python
x = np.arange(1, 10, 0.1)
```

- 그래프의 시작점, 범위, 간격 설정
- 1부터 10까지 0.1 간격으로 생성

---

### y 값 계산

```python
y1 = np.sin(x)
y2 = np.cos(x)
```

- x 값을 기반으로 sin, cos 값 계산

---

### 그래프 그리기

```python
plt.plot(x, y1, label="sin")
plt.plot(x, y2, linestyle="--", label="cos")
```

- sin은 실선으로
- cos는 점선으로 표시

---

### 그래프 표시

```python
plt.legend()  # 범례 표시
plt.show()    # 그래프 출력
```

---

## 결과

sin(실선)과 cos(점선) 곡선이 함께 표시된 그래프가 생성됩니다.

---

## 추가 예제

### 그래프 스타일 개선

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.arange(1, 10, 0.1)
y1 = np.sin(x)
y2 = np.cos(x)

plt.figure(figsize=(10, 6))
plt.plot(x, y1, label="sin", color='blue', linewidth=2)
plt.plot(x, y2, linestyle="--", label="cos", color='red', linewidth=2)
plt.xlabel('x')
plt.ylabel('y')
plt.title('Sine and Cosine Functions')
plt.grid(True)
plt.legend()
plt.show()
```

---

## 참고 자료

- [Matplotlib Documentation](https://matplotlib.org/stable/contents.html)
- [NumPy Documentation](https://numpy.org/doc/)
