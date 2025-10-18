---
layout: post
title: 파이썬-내림
category: 프로그래밍 (Programming)
tags:
  - python
  - algorithm
  - math
  - rounding
excerpt: Python에서 math.ceil()을 사용하지 않고 내림 연산을 수행하는 방법을 알아봅니다.
parent_category: study
learning_framework:
  stage: digestion
  pacer_type: procedural
  pacer_types:
    - procedural
    - conceptual
---

## 개요

Python에서 내림 연산을 수행하는 방법 중 `math.ceil()` 함수를 사용하지 않는 창의적인 접근법을 소개합니다.

---

## 코드 예제

```python
def solution(progresses, speeds):
    left_days = []
    for i in range(len(progresses)):
        left_days.append(-(-(100-progresses[i])//speeds[i]))
    print(left_days)

    sup = [1]
    sup_day = left_days[0]
    for day in left_days[1:]:
        if sup_day >= day:
            sup[-1] += 1
        else:
            sup_day = day
            sup.append(1)
    return sup
```

---

## 핵심 포인트

### 정수 나눗셈을 활용한 올림 연산

```python
-(-(100-progresses[i])//speeds[i])
```

이 표현식의 동작 원리:

1. `100-progresses[i]`: 남은 작업량 계산
2. `-(...//speeds[i])`: 음수로 만들어 정수 나눗셈 수행
3. 외부의 `-`: 다시 양수로 변환

이 방법은 `math.ceil()` 없이도 올림 효과를 낼 수 있습니다.

---

## 실용 예시

### 작업 진행률 계산

```python
progresses = [93, 30, 55]
speeds = [1, 30, 5]

# 결과: [7, 3, 9]
# 각 작업이 완료되기까지 남은 일수
```

---

## 정수 나눗셈 (`//`)의 특징

- 소수점 이하를 버림
- 음수에서는 내림 방향으로 작동
- 이중 음수 변환으로 올림 효과 구현

---

## 활용 분야

- 프로그래머스 알고리즘 문제
- 작업 진행률 계산
- 일정 관리 시스템

---

## 참고 자료

- [Python 공식 문서 - 정수 나눗셈](https://docs.python.org/3/reference/expressions.html#binary-arithmetic-operations)
