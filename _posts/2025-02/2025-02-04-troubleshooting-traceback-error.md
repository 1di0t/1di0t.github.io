---
layout: post
title: "TroubleShooting: Traceback Error"
category: 트러블슈팅 (Troubleshooting)
tags:
  - python
  - debugging
  - traceback
  - server
  - error-handling
excerpt: 서버 실행 중 Traceback error가 발생하여 서버가 멈추는 현상의 해결 방법을 정리합니다.
---

## 문제 설명

서버 실행 중 Traceback error가 나오면서 서버가 멈추는 현상이 발생했습니다.

---

## 해결 방법

### 1. 문제 분석

Traceback limit의 기본값이 10으로 설정되어 있음을 확인했습니다.

### 2. 해결 코드

Python 코드로 limit을 증가시켜 문제를 해결할 수 있습니다:

```python
import sys
sys.tracebacklimit = 50
```

---

## 상세 설명

### sys.tracebacklimit이란?

Python의 `sys.tracebacklimit`은 예외 발생 시 표시되는 traceback 스택의 깊이를 제어합니다.

- **기본값**: 10
- **설정 가능 범위**: 0 ~ 무제한
- **효과**: 더 많은 스택 프레임 정보 확인 가능

---

## 활용 예시

### 디버깅 모드에서 상세 정보 출력

```python
import sys

# 개발 환경
if DEBUG:
    sys.tracebacklimit = 100
else:
    sys.tracebacklimit = 5
```

### Traceback 완전히 숨기기

```python
import sys
sys.tracebacklimit = 0  # traceback 출력 안 함
```

---

## 주의사항

- **운영 환경**: 보안상 상세한 에러 정보를 노출하지 않도록 제한
- **개발 환경**: 디버깅을 위해 충분히 높은 값 설정
- **로깅**: traceback 정보를 로그 파일에 기록하는 것이 좋음

---

## 관련 설정

### 로깅과 함께 사용

```python
import sys
import logging
import traceback

logging.basicConfig(level=logging.ERROR)

try:
    # 서버 코드
    pass
except Exception as e:
    logging.error(f"Error: {e}")
    logging.error(traceback.format_exc())
```

---

## 참고 자료

- [Python sys 모듈 공식 문서](https://docs.python.org/3/library/sys.html)
- [Python traceback 모듈](https://docs.python.org/3/library/traceback.html)
