---
layout: post
title: 개발 용어 통합 정리
date: 2025-10-07 00:00:00 +0900
tags:
  - 개발용어
  - 프로그래밍
  - 기술정리
  - iterable
  - cors
  - restful-api
  - nosql
category: 개발 (Development)
parent_category: study
learning_framework:
  stage: digestion
  pacer_type: reference
---

## Iterable Variable

말 그대로 반복 가능한 변수라는 뜻이다.
반복문 등을 사용하여 변수를 순회할 수 있는 변수를 말한다.

파이썬을 예로 들면 List, Tuple, String, Set, Dictionary 등이 있다.

### 예시

```python
my_list = [1, 2, 3, 4]  # list를 선언한다
for element in my_list:  # 반복문을 이용하여 my_list내의 요소들을 출력한다
    print(element)
```

## CORS

- **Cross-Origin Resource Sharing**
- 지금 보여지는 웹페이지의 도메인이 아닌 다른 도메인의 자원을 해당 웹페이지가 사용할 수 있게 하는 메커니즘

## Restful API

컴퓨터 시스템들의 요청, 응답 방식을 미리 정해놔서 정보를 안전하게 교환하는 방식

## No-SQL

- 비관계형 데이터 베이스
- 정형화 되지 않은 데이터 구조
- 대규모 대용량 서비스에서 사용
- MongoDB, DynamoDB

## 진법

| 진법 | 약어 | 전체 단어 |
|------|------|-----------|
| 2진법 | 0b | Binary |
| 8진법 | 0o | Octal |
| 10진법 | 0d | Decimal |
| 16진법 | 0x | Hexadecimal |

## base64

Binary 데이터를 ASCII 문자로 표현하는 인코딩.
ASCII가 64진법이기 때문에 base64

## 캐럿 연산자

Flutter에서 ^는 주 버전 내에서 모든 버전을 호환한다는 의미

## 에러코드

### 2xx (Success)
요청이 성공적으로 처리 되었음을 나타냅니다.
- `200` OK: 요청이 성공적으로 처리되었습니다.
- `201` Created: 새로운 리소스가 성공적으로 생성되었습니다.

### 4xx (Client Error)
클라이언트의 요청에 오류가 있음을 나타냅니다.
- `400` Bad Request: 잘못된 요청입니다.
- `401` Unauthorized: 인증이 필요합니다.
- `403` Forbidden: 요청이 금지되었습니다.
- `404` Not Found: 요청한 리소스를 찾을 수 없습니다.
- `409` Conflict: 요청이 서버의 현재 상태와 충돌합니다.

### 5xx (Server Error)
서버 측 문제로 인해 요청을 처리할 수 없음을 나타냅니다.
- `500` Internal Server Error: 서버 내부 오류입니다.
- `502` Bad Gateway: 잘못된 게이트웨이입니다.
- `503` Service Unavailable: 서버가 일시적으로 사용할 수 없습니다.
