---
layout: post
title: 데이터란
category: 데이터사이언스 (Data Science)
tags:
  - data
  - data-types
  - structured-data
  - unstructured-data
  - dikw
  - knowledge-management
excerpt: 데이터의 특성, 유형, 그리고 지식으로의 변환 과정에 대해 알아봅니다.
parent_category: study
learning_framework:
  stage: digestion
  pacer_type: procedural
---

## 데이터의 특성

### 존재적 특성

- 있는 그대로의 객관적 사실
- 예: 시험 점수

### 당위적 특성

- 추론, 예측, 전망, 추정을 위한 근거
- 예: 평균 점수

---

## 데이터의 유형

### 데이터 구분

| 형태 | 예시 | 특징 |
|------|------|------|
| **정성적 데이터** | 언어, 문자, 텍스트 | 질적 속성 표현 |
| **정량적 데이터** | 수치, 도형, 기호 (cm, 직사각형) | 양적 속성 표현 |

---

### 정형, 비정형, 반정형의 차이

| 구분 | 연산 가능 | 정형화된 틀 | 예시 |
|------|-----------|-------------|------|
| **정형 데이터** | O | O | CSV, 엑셀, 관계형 DB |
| **비정형 데이터** | X | X | SNS 데이터, 댓글, 영상 |
| **반정형 데이터** | △ | △ | 센서 데이터, JSON, XML |

---

## 정형 데이터 (Structured Data)

### 특징

- 고정된 스키마
- 표 형태로 표현 가능
- SQL 쿼리로 처리

### 예시

```sql
SELECT name, age FROM users WHERE age > 20;
```

---

## 비정형 데이터 (Unstructured Data)

### 특징

- 고정된 구조 없음
- 다양한 형태
- 텍스트 분석, 딥러닝 필요

### 예시

- 이메일 내용
- 소셜 미디어 게시물
- 이미지, 비디오

---

## 반정형 데이터 (Semi-Structured Data)

### 특징

- 유연한 구조
- 메타데이터 포함
- 계층적 구조

### JSON 예시

```json
{
  "name": "홍길동",
  "age": 30,
  "skills": ["Python", "Java"]
}
```

### XML 예시

```xml
<user>
  <name>홍길동</name>
  <age>30</age>
</user>
```

---

## 지식의 변환 과정

### 1. 암묵지 (Tacit Knowledge)

- 개인의 지식, 경험을 노하우로 고도화
- 언어화하기 어려운 지식
- 예: 숙련된 기술자의 감각

### 2. 공통화 (Socialization)

- 다른 개인/집단과의 공통 지식 생성
- 암묵지에서 암묵지로 전환
- 예: 멘토링, 도제 시스템

### 3. 형식지 표출화 (Externalization)

- 개인 지식을 책/외부 매체로 표출
- 암묵지를 형식지로 전환
- 예: 매뉴얼 작성, 문서화

### 4. 연결화 (Combination)

- 개인 경험을 외부 지식과 연결
- 형식지를 새로운 형식지로 전환
- 예: 데이터 분석, 지식 통합

---

## DIKW 피라미드

지식의 계층 구조를 나타내는 모델입니다:

```
        Wisdom (지혜)
           ↑
      Knowledge (지식)
           ↑
     Information (정보)
           ↑
        Data (데이터)
```

### 각 단계 설명

1. **Data (데이터)**
   - 가공되지 않은 원시 사실
   - 예: 온도 25도

2. **Information (정보)**
   - 가공되고 의미가 부여된 데이터
   - 예: 오늘 평균 기온은 25도로 어제보다 5도 높다

3. **Knowledge (지식)**
   - 정보를 바탕으로 한 이해와 통찰
   - 예: 기온이 상승하면 아이스크림 판매가 증가한다

4. **Wisdom (지혜)**
   - 지식을 실제 상황에 적용하는 능력
   - 예: 날씨에 따라 재고를 조절하는 전략 수립

---

## 데이터 활용 과정

```python
# 1. 데이터 수집
raw_data = collect_data()

# 2. 데이터 가공 (정보)
processed_info = process(raw_data)

# 3. 분석 및 학습 (지식)
knowledge = analyze(processed_info)

# 4. 의사결정 (지혜)
decision = make_decision(knowledge)
```

---

## 참고 자료

- [DIKW Pyramid](https://en.wikipedia.org/wiki/DIKW_pyramid)
- [Knowledge Management](https://www.kmworld.com/)
