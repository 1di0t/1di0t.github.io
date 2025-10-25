---
layout: post
title: "우분투 부팅 속도 최적화 완벽 가이드"
date: 2025-10-25
category: Development
parent_category: study
learning_framework:
  stage: digestion
  pacer_type: procedural
  pacer_types: [procedural, reference]
tags: [ubuntu, linux, systemd, boot-optimization, performance]
excerpt: "systemd-analyze로 부팅 병목을 찾고, 불필요한 서비스를 제거하여 우분투 부팅 시간을 단축하는 실전 가이드입니다."
---

# 우분투 부팅 속도 최적화 완벽 가이드

우분투를 사용하다 보면 부팅 시간이 점점 느려지는 것을 경험하게 됩니다. 이 글에서는 systemd 도구를 활용하여 부팅 시간을 분석하고 최적화하는 방법을 단계별로 알아보겠습니다.

## 부팅 시간 분석하기

### 1. 전체 부팅 시간 확인

가장 먼저 현재 부팅 시간을 확인해봅시다.

```bash
systemd-analyze
```

출력 예시:
```
Startup finished in 18.075s (firmware) + 14.225s (loader) + 
3.195s (kernel) + 59.227s (userspace) = 1min 34.723s
```

각 구간의 의미:
- **firmware**: UEFI/BIOS 초기화 시간
- **loader**: 부트로더(GRUB) 시간
- **kernel**: 커널 로딩 시간
- **userspace**: systemd 및 서비스 시작 시간

대부분의 최적화는 userspace 영역에서 이루어집니다.

### 2. 느린 서비스 찾기

어떤 서비스가 부팅을 지연시키는지 확인합니다.

```bash
# 모든 서비스를 느린 순서로 표시
systemd-analyze blame

# 상위 20개만 보기
systemd-analyze blame | head -20
```

출력 예시:
```
32.145s postgresql@16-main.service
18.234s NetworkManager-wait-online.service
12.456s accounts-daemon.service
 8.123s snapd.service
```

### 3. 부팅 병목 지점 찾기

서비스 간 의존성 체인을 분석합니다.

```bash
# 크리티컬 체인 확인
systemd-analyze critical-chain

# 특정 서비스의 의존성 확인
systemd-analyze critical-chain NetworkManager.service
```

이 명령어는 어떤 서비스가 다른 서비스를 기다리고 있는지 보여줍니다.

### 4. 시각화로 한눈에 파악하기

```bash
# SVG 그래프 생성
systemd-analyze plot > boot_timeline.svg

# 브라우저에서 열기
xdg-open boot_timeline.svg
```

생성된 타임라인 그래프에서 각 서비스의 시작 시간과 의존관계를 시각적으로 확인할 수 있습니다.

## 서비스 최적화하기

### 불필요한 서비스 비활성화

분석 결과를 바탕으로 불필요한 서비스를 비활성화합니다.

#### 네트워크 대기 서비스 (데스크톱 환경)

```bash
# 네트워크가 완전히 연결될 때까지 기다리는 서비스
# 일반 데스크톱에서는 불필요
sudo systemctl disable NetworkManager-wait-online.service
```

#### 부팅 스플래시 화면

```bash
# Plymouth (부팅 로고 화면)
sudo systemctl disable plymouth.service
sudo systemctl mask plymouth-quit-wait.service
```

#### 사용하지 않는 데이터베이스

```bash
# PostgreSQL을 매번 부팅 시 시작할 필요가 없다면
sudo systemctl disable postgresql@16-main.service

# 필요할 때 수동으로 시작
sudo systemctl start postgresql@16-main.service
```

#### 스냅 서비스

```bash
# Snap을 사용하지 않는다면
sudo systemctl disable snapd.service
sudo systemctl disable snapd.socket
```

### 서비스 관리 명령어

```bash
# 서비스 비활성화 (부팅 시 자동 시작 안 함)
sudo systemctl disable [서비스명]

# 서비스 활성화
sudo systemctl enable [서비스명]

# 서비스 완전히 차단 (수동 시작도 불가)
sudo systemctl mask [서비스명]

# 마스크 해제
sudo systemctl unmask [서비스명]

# 서비스 상태 확인
systemctl status [서비스명]
```

## 저널 로그 최적화

systemd 저널이 너무 크면 부팅 시간에 영향을 줄 수 있습니다.

### 현재 로그 크기 확인

```bash
journalctl --disk-usage
```

출력 예시:
```
Archived and active journals take up 2.5G in the file system.
```

### 로그 정리하기

```bash
# 크기 기준으로 정리 (100MB로 제한)
sudo journalctl --vacuum-size=100M

# 시간 기준으로 정리 (1주일 이상 된 로그 삭제)
sudo journalctl --vacuum-time=1week

# 또는 1개월
sudo journalctl --vacuum-time=30d
```

### 저널 설정 영구 적용

로그가 계속 쌓이지 않도록 설정 파일을 수정합니다.

```bash
sudo nano /etc/systemd/journald.conf
```

다음 내용을 추가하거나 주석을 제거합니다:

```ini
[Journal]
# 저장소 설정
Storage=persistent

# 압축 활성화
Compress=yes

# 전체 로그 최대 크기
SystemMaxUse=100M

# 개별 파일 크기
SystemMaxFileSize=10M

# 최대 보관 기간
MaxRetentionSec=1week
```

설정 적용:

```bash
sudo systemctl restart systemd-journald
```

## 실전 최적화 워크플로우

### 1단계: 현재 상태 기록

```bash
# 최적화 전 부팅 시간 저장
systemd-analyze > boot_before.txt
systemd-analyze blame | head -20 > blame_before.txt
```

### 2단계: 최적화 적용

```bash
# 불필요한 서비스 비활성화
sudo systemctl disable NetworkManager-wait-online.service
sudo systemctl disable plymouth.service
sudo systemctl mask plymouth-quit-wait.service

# 저널 정리
sudo journalctl --vacuum-time=1week

# 저널 설정 변경
sudo nano /etc/systemd/journald.conf
# (위에서 설명한 설정 적용)
sudo systemctl restart systemd-journald
```

### 3단계: 재부팅 및 확인

```bash
sudo reboot
```

재부팅 후:

```bash
# 최적화 후 부팅 시간 저장
systemd-analyze > boot_after.txt
systemd-analyze blame | head -20 > blame_after.txt

# 비교
diff boot_before.txt boot_after.txt
```

## 추가 팁과 요령

### 서비스 의존성 확인

서비스를 비활성화하기 전에 다른 서비스가 의존하고 있는지 확인합니다.

```bash
# 특정 서비스에 의존하는 서비스 목록
systemctl list-dependencies --reverse [서비스명]

# 특정 서비스가 의존하는 서비스 목록
systemctl list-dependencies [서비스명]
```

### 로그 실시간 모니터링

```bash
# 실시간 로그 확인 (tail -f와 유사)
journalctl -f

# 특정 서비스 로그만
journalctl -u NetworkManager.service -f

# 에러 메시지만
journalctl -p err -f
```

### 부팅 타입별 로그 조회

```bash
# 부팅 목록 확인
journalctl --list-boots

# 현재 부팅 로그
journalctl -b 0

# 이전 부팅 로그
journalctl -b -1
```

## 주의사항

### 백업은 필수

설정 변경 전에 항상 백업을 만듭니다.

```bash
# journald 설정 백업
sudo cp /etc/systemd/journald.conf /etc/systemd/journald.conf.backup
```

### 서버 환경에서 주의

데스크톱과 서버 환경은 요구사항이 다릅니다.

**데스크톱에서 안전하게 비활성화 가능:**
- NetworkManager-wait-online.service
- plymouth.service
- snapd.service (Snap을 사용하지 않는 경우)

**서버에서 주의 필요:**
- NetworkManager-wait-online.service (네트워크 의존 서비스가 있는 경우)
- 데이터베이스 서비스 (항상 실행 필요)

### 원상복구 방법

최적화 후 문제가 발생하면 쉽게 되돌릴 수 있습니다.

```bash
# 서비스 다시 활성화
sudo systemctl enable [서비스명]
sudo systemctl unmask [서비스명]
sudo systemctl start [서비스명]

# 설정 파일 복구
sudo cp /etc/systemd/journald.conf.backup /etc/systemd/journald.conf
sudo systemctl restart systemd-journald
```

## 실제 최적화 결과

제 시스템에서 실제로 적용한 최적화 결과입니다.

**최적화 전:**
```
Startup finished in 18.075s (firmware) + 14.225s (loader) + 
3.195s (kernel) + 59.227s (userspace) = 1min 34.723s
```

**최적화 후:**
```
Startup finished in 18.145s (firmware) + 14.127s (loader) + 
3.241s (kernel) + 24.316s (userspace) = 59.829s
```

**개선 사항:**
- userspace 시간: 59.2초 → 24.3초 (약 59% 개선)
- 전체 부팅 시간: 1분 35초 → 1분 이내

주요 변경사항:
- NetworkManager-wait-online 비활성화: -18초
- PostgreSQL 비활성화: -32초
- Plymouth 비활성화: -5초
- 저널 최적화: -4초

## 마무리

부팅 속도 최적화는 한 번의 작업으로 끝나는 것이 아닙니다. 정기적으로 `systemd-analyze`를 실행하여 새로 추가된 서비스를 확인하고, 저널 로그를 정리하는 습관을 들이세요.

**최적화 체크리스트:**
- [ ] `systemd-analyze blame`로 느린 서비스 확인
- [ ] 불필요한 서비스 비활성화
- [ ] 저널 로그 크기 제한 설정
- [ ] 재부팅 후 결과 확인
- [ ] 정기적으로 로그 정리 (월 1회 권장)

여러분의 시스템은 얼마나 빨라졌나요? 추가로 궁금한 점이 있다면 댓글로 남겨주세요!
