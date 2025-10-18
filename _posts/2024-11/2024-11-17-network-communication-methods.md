---
layout: post
title: 네트워크 통신 방식
category: 네트워크 (Network)
tags:
  - network
  - circuit-switching
  - packet-switching
  - message-switching
  - tcp
  - communication
excerpt: 회선 교환, 메시지 교환, 패킷 교환 등 네트워크 통신 방식의 종류와 특징을 알아봅니다.
---

## 통신 방식 요약

### 1. 회선 교환 (Circuit Switched Network)

**특징**:
- 두 지점 연결
- Routing → 유지 → 해제 순서로 작동
- Routing에 시간 소요
- 전송률의 신뢰도 보장

**예시**: 전화 통신

---

### 2. 메시지 교환 (Message Switched Network)

**특징**:
- 메시지에 주소, 데이터 형식을 구간별로 전송
- 기차, 소포 전송과 유사
- 사전 경로 설정 불필요
- Store & Forward 방식
- 전체 경로를 배타적으로 공유하지 않음

---

### 3. 패킷 교환 (Packet Switched Network)

**특징**:
- 대형 메시지 분할 → 패킷(일련번호 부여)
- 데이터그램: 짧은 데이터 전송 시 사용
- 사전 경로 없음
- 구간별 전송
- 각 패킷별 독립적 경로 사용
- 고장, 혼잡, 구간 우회 가능

#### 가상 회선 (Virtual Circuit)
- TCP 등에서 사용
- 데이터 전송 시 활용

---

## 통신 방식 비교

| 특징 | 회선 교환 | 메시지 교환 | 패킷 교환 |
|------|-----------|-------------|-----------|
| **연결 설정** | 필요 | 불필요 | 불필요 |
| **경로** | 고정 | 각 메시지별 | 각 패킷별 |
| **대역폭** | 고정 할당 | 공유 | 공유 |
| **신뢰성** | 높음 | 중간 | 높음 (TCP) |
| **속도** | 일정 | 가변 | 가변 |

---

## 참고 자료

- [Computer Networks](https://www.geeksforgeeks.org/computer-network-tutorials/)
