---
layout: post
title: "소켓(Socket): 네트워크 통신의 핵심 개념과 TCP/UDP 프로토콜"
category: 네트워크 (Network)
tags:
  - socket
  - network
  - tcp
  - udp
  - protocol
  - port
  - osi-model
excerpt: 네트워크 통신의 기본 단위인 소켓의 개념과 TCP/UDP 프로토콜, 포트 번호, OSI 계층 구조에 대해 알아봅니다.
---

## 소켓이란?

**소켓(Socket)**은 네트워크 통신의 기본 단위로, **두 프로그램 간의 양방향 통신 연결을 위한 엔드포인트**입니다.

쉽게 말해, 소켓은 **전화기의 연결 구멍**과 같습니다. 전화를 걸거나 받기 위해서는 전화선을 연결할 구멍이 필요한 것처럼, 네트워크 통신을 하려면 소켓이 필요합니다.

---

## 네트워크 통신의 핵심 요소

네트워크에서 두 컴퓨터가 통신하려면 다음 세 가지 정보가 필요합니다:

1. **IP 주소**: 통신 대상 컴퓨터의 위치
2. **프로토콜**: 통신 규칙 (TCP 또는 UDP)
3. **포트 번호**: 특정 애플리케이션 식별

### 예시: 웹 브라우저 통신

```
IP 주소: 192.168.0.1
프로토콜: TCP
포트: 80 (HTTP)
```

---

## 데이터 송수신 기본 구성

### 네트워크 계층 구성 요소

1. **NIC (Network Interface Card)**
   - 물리적인 네트워크 연결 장치
   - LAN 카드라고도 불림
   - 데이터를 전기 신호로 변환

2. **IP (Internet Protocol)**
   - 데이터 패킷의 주소 지정 및 라우팅
   - 목적지까지 데이터 전달 책임

---

## OSI 7계층 모델

네트워크 통신은 7개의 계층으로 나뉩니다:

| 계층 | 이름 | 역할 | 예시 |
|------|------|------|------|
| **Layer 7** | 응용 계층 | 사용자 인터페이스 제공 | HTTP, FTP, SMTP |
| **Layer 6** | 표현 계층 | 데이터 암호화/압축 | SSL, JPEG |
| **Layer 5** | 세션 계층 | 세션 연결 관리 | NetBIOS |
| **Layer 4** | 전송 계층 | 데이터 전송 방식 결정 | TCP, UDP |
| **Layer 3** | 네트워크 계층 | 주소 지정 및 라우팅 | IP, ICMP |
| **Layer 2** | 데이터 링크 계층 | 물리적 연결 관리 | Ethernet, MAC |
| **Layer 1** | 물리 계층 | 비트 전송 | 케이블, 허브 |

---

## 프로토콜 종류

### 1. TCP (Transmission Control Protocol) - 연결형

**신뢰성 있는 연결형 프로토콜**로, 데이터 전송을 보장합니다.

#### 특징

- **연결 지향**: 3-way handshake로 연결 수립
- **신뢰성**: 데이터 전송 보장, 재전송 메커니즘
- **순서 보장**: 패킷 순서대로 전달
- **속도**: UDP보다 느림

#### TCP를 사용하는 프로토콜

- **SMTP** (Simple Mail Transfer Protocol): 이메일 전송
- **POP3** (Post Office Protocol): 이메일 수신
- **Telnet**: 원격 접속
- **FTP** (File Transfer Protocol): 파일 전송
- **HTTP/HTTPS**: 웹 브라우징

#### TCP 소켓 예제 (Python)

```python
import socket

# 서버 소켓 생성
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind(('localhost', 8080))
server_socket.listen(5)

print("서버 대기 중...")
client_socket, addr = server_socket.accept()
print(f"클라이언트 연결: {addr}")

# 데이터 수신
data = client_socket.recv(1024)
print(f"받은 데이터: {data.decode()}")

# 데이터 송신
client_socket.send("안녕하세요!".encode())

client_socket.close()
server_socket.close()
```

---

### 2. UDP (User Datagram Protocol) - 비연결형

**빠르지만 신뢰성이 낮은 비연결형 프로토콜**입니다.

#### 특징

- **비연결 지향**: 연결 수립 과정 없음
- **신뢰성 낮음**: 데이터 전송 보장 안 함
- **순서 보장 안 함**: 패킷 순서 뒤바뀔 수 있음
- **속도**: TCP보다 빠름

#### UDP를 사용하는 프로토콜 및 서비스

- **DNS**: 도메인 이름 조회
- **DHCP**: IP 주소 할당
- **온라인 게임**: 실시간 통신
- **스트리밍**: 영상/음성 전송
- **VoIP**: 인터넷 전화

#### UDP 소켓 예제 (Python)

```python
import socket

# UDP 소켓 생성
udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
udp_socket.bind(('localhost', 9090))

print("UDP 서버 대기 중...")
data, addr = udp_socket.recvfrom(1024)
print(f"받은 데이터: {data.decode()}, 보낸 주소: {addr}")

# 응답 전송
udp_socket.sendto("응답 메시지".encode(), addr)

udp_socket.close()
```

---

## Well-Known Ports (잘 알려진 포트)

포트 번호는 0~65535 범위이며, 특정 서비스에는 고정된 포트가 할당됩니다.

| 포트 번호 | 프로토콜 | 서비스 |
|-----------|----------|--------|
| **20, 21** | FTP | 파일 전송 |
| **22** | SSH | 보안 원격 접속 |
| **23** | Telnet | 원격 접속 |
| **25** | SMTP | 이메일 전송 |
| **53** | DNS | 도메인 이름 조회 |
| **80** | HTTP | 웹 브라우징 |
| **110** | POP3 | 이메일 수신 |
| **143** | IMAP | 이메일 수신 |
| **443** | HTTPS | 보안 웹 브라우징 |
| **3306** | MySQL | 데이터베이스 |

---

## TCP vs UDP 비교

| 항목 | TCP | UDP |
|------|-----|-----|
| **연결 방식** | 연결형 (Connection-oriented) | 비연결형 (Connectionless) |
| **신뢰성** | 높음 ✅ | 낮음 ⚠️ |
| **속도** | 느림 | 빠름 ✅ |
| **순서 보장** | 보장 ✅ | 보장 안 함 |
| **데이터 경계** | 스트림 방식 | 데이터그램 방식 |
| **오버헤드** | 높음 | 낮음 |
| **사용 사례** | 파일 전송, 이메일, 웹 | 스트리밍, 게임, DNS |

---

## 소켓 프로그래밍 기본 흐름

### TCP 소켓 통신 과정

#### 서버

1. `socket()`: 소켓 생성
2. `bind()`: IP 주소와 포트 바인딩
3. `listen()`: 연결 대기
4. `accept()`: 클라이언트 연결 수락
5. `recv()/send()`: 데이터 송수신
6. `close()`: 소켓 닫기

#### 클라이언트

1. `socket()`: 소켓 생성
2. `connect()`: 서버에 연결
3. `send()/recv()`: 데이터 송수신
4. `close()`: 소켓 닫기

---

## C/C++ 소켓 프로그래밍

### 라이브러리 포함

```cpp
// 표준 라이브러리
#include <sys/socket.h>  // 소켓 함수
#include <netinet/in.h>  // 인터넷 주소 구조체
#include <arpa/inet.h>   // IP 주소 변환

// 사용자 정의 라이브러리
#include "myheader.h"
```

### 간단한 TCP 서버 예제 (C++)

```cpp
#include <iostream>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
using namespace std;

int main() {
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);

    sockaddr_in address;
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(8080);

    bind(server_fd, (struct sockaddr*)&address, sizeof(address));
    listen(server_fd, 3);

    int client_fd = accept(server_fd, nullptr, nullptr);
    char buffer[1024] = {0};
    read(client_fd, buffer, 1024);
    cout << "받은 메시지: " << buffer << endl;

    close(client_fd);
    close(server_fd);
    return 0;
}
```

---

## 결론

소켓은 네트워크 통신의 핵심 개념으로, **TCP**와 **UDP** 프로토콜을 통해 다양한 방식의 데이터 전송을 지원합니다.

- **신뢰성이 중요한 경우**: TCP 사용 (파일 전송, 웹 브라우징)
- **속도가 중요한 경우**: UDP 사용 (게임, 스트리밍)

OSI 7계층 모델과 포트 번호를 이해하면 네트워크 통신의 전체 구조를 파악할 수 있습니다.

---

## 참고 자료

- [Beej's Guide to Network Programming](https://beej.us/guide/bgnet/)
- [RFC 793 - TCP](https://www.rfc-editor.org/rfc/rfc793)
- [RFC 768 - UDP](https://www.rfc-editor.org/rfc/rfc768)
