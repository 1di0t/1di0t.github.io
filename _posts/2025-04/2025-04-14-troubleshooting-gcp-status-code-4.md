---
layout: post
title: "Trouble Shooting: 'status.code': 4"
category: troubleshooting
tags: [google-cloud-build, gcp, gunicorn, deployment, timeout]
excerpt: "Google Cloud Build 배포 중 발생한 status.code 4 에러의 원인과 해결 방법을 정리합니다."
---

## 문제 설명

Google Cloud Build에서 배포 중 "status.code: 4" 에러가 발생했습니다. 처음에는 타임아웃 문제로 보였지만, 실제 원인은 달랐습니다.

---

## 근본 원인

배포가 실패한 이유는 `requirements.txt` 파일에 `gunicorn`이 포함되지 않았기 때문입니다. 이 누락으로 인해 애플리케이션이 제대로 실행되지 않았고, 결국 타임아웃이 발생했습니다.

---

## 해결 방법

다음 명령어를 사용하여 `requirements.txt` 파일을 업데이트하여 문제를 해결했습니다:

```bash
pip freeze >> requirements.txt
```

이렇게 하면 `gunicorn`을 포함한 모든 필요한 종속성이 requirements 파일에 올바르게 명시됩니다.

---

## 교훈

- 배포 전에 모든 필수 패키지가 `requirements.txt`에 포함되어 있는지 확인
- 에러 메시지가 타임아웃을 가리키더라도 근본 원인을 찾아야 함
- `pip freeze`를 사용하여 현재 환경의 모든 패키지를 정확히 기록

---

## 관련 자료

- [Google Cloud Build 문서](https://cloud.google.com/build/docs)
- [Gunicorn 공식 문서](https://gunicorn.org/)
