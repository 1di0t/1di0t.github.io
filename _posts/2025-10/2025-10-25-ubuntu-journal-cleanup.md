---
layout: post
title: "우분투 저널 정리로 부팅 시간 단축하기"
date: 2025-10-25
category: troubleshooting
parent_category: troubleshooting
learning_framework:
  stage: digestion
  pacer_type: procedural
tags: [ubuntu, linux, journald, systemd, optimization]
excerpt: "명령어 한 줄로 저널 크기를 제한하고 부팅 시간을 단축하는 실전 가이드입니다. 파일 경로를 몰라도 됩니다."
---

# 우분투 저널 정리로 부팅 시간 단축하기

우분투를 오래 사용하다 보면 systemd 저널 로그가 계속 쌓여서 부팅 시간이 느려집니다. 이 글에서는 **명령어 한 줄로** 저널 크기를 제한하고 부팅 시간을 단축하는 방법을 알려드립니다.

파일 위치를 찾거나 에디터를 열 필요가 없습니다!

## 문제 상황

제 시스템의 부팅 시간을 확인해보니:

```bash
systemd-analyze
```

```
Startup finished in 18.174s (firmware) + 9.215s (loader) + 
3.227s (kernel) + 1min 7.051s (userspace) = 1min 37.669s
```

1분 37초나 걸리고 있었습니다. 특히 userspace(시스템 서비스 시작) 시간이 1분이 넘었습니다.

저널 크기를 확인해보니:

```bash
journalctl --disk-usage
```

```
Archived and active journals take up 538.2M in the file system.
```

무려 538MB의 로그가 쌓여 있었습니다!

## 해결 방법: 3단계로 끝내기

### 1단계: 설정 파일 자동 생성

다음 명령어를 복사해서 터미널에 붙여넣으세요. 한 줄이지만 여러 줄로 보기 좋게 나눴습니다.

```bash
sudo mkdir -p /etc/systemd/journald.conf.d/ && \
sudo tee /etc/systemd/journald.conf.d/00-journal-size.conf > /dev/null <<'EOF'
[Journal]
# 저널 최대 크기를 100MB로 제한
SystemMaxUse=100M

# 1주일 이상 된 로그는 자동 삭제
MaxRetentionSec=1week

# 개별 저널 파일 크기 10MB로 설정
SystemMaxFileSize=10M

# 시스템에 최소 500MB 여유 공간 확보
SystemKeepFree=500M
EOF
```

이 명령어는:
1. `/etc/systemd/journald.conf.d/` 디렉토리를 자동으로 만들고
2. `00-journal-size.conf` 파일을 생성하고
3. 설정 내용을 자동으로 작성합니다

**파일 위치를 몰라도 됩니다!**

### 2단계: 설정 적용

```bash
sudo systemctl restart systemd-journald
```

### 3단계: 기존 대용량 로그 정리

```bash
sudo journalctl --vacuum-size=100M
```

기존에 쌓인 로그를 100MB까지만 남기고 삭제합니다.

## 결과 확인

```bash
# 정리 후 저널 크기 확인
journalctl --disk-usage
```

```
Archived and active journals take up 96.0M in the file system.
```

538MB → 96MB로 줄었습니다!

재부팅 후 부팅 시간 확인:

```bash
sudo reboot
# 재부팅 후
systemd-analyze
```

```
Startup finished in 18.145s (firmware) + 9.127s (loader) + 
3.241s (kernel) + 30.316s (userspace) = 1min 0.829s
```

**1분 37초 → 1분으로 단축!** (약 37% 개선)

## 다른 옵션들

필요에 따라 다른 설정을 선택할 수 있습니다.

### 옵션 A: 보수적 (200MB, 2주일)

로그를 더 많이 보관하고 싶다면:

```bash
sudo mkdir -p /etc/systemd/journald.conf.d/ && \
sudo tee /etc/systemd/journald.conf.d/00-journal-size.conf > /dev/null <<'EOF'
[Journal]
SystemMaxUse=200M
MaxRetentionSec=2week
SystemKeepFree=500M
EOF
```

### 옵션 B: 균형적 (100MB, 1주일) - **추천**

대부분의 사용자에게 적합:

```bash
sudo mkdir -p /etc/systemd/journald.conf.d/ && \
sudo tee /etc/systemd/journald.conf.d/00-journal-size.conf > /dev/null <<'EOF'
[Journal]
SystemMaxUse=100M
MaxRetentionSec=1week
SystemMaxFileSize=10M
SystemKeepFree=500M
EOF
```

### 옵션 C: 공격적 (50MB, 3일)

디스크 공간이 매우 부족하다면:

```bash
sudo mkdir -p /etc/systemd/journald.conf.d/ && \
sudo tee /etc/systemd/journald.conf.d/00-journal-size.conf > /dev/null <<'EOF'
[Journal]
SystemMaxUse=50M
MaxRetentionSec=3day
SystemMaxFileSize=8M
SystemKeepFree=500M
EOF
```

## 설정 확인하기

생성된 설정 파일을 확인하려면:

```bash
# 생성된 파일 내용 보기
cat /etc/systemd/journald.conf.d/00-journal-size.conf
```

또는 실제 적용될 전체 설정을 보려면:

```bash
# 기본값 + 커스텀 설정을 합친 최종 설정
systemd-analyze cat-config systemd/journald.conf
```

## 전체 과정 한 번에 실행하기

다음 명령어들을 순서대로 복사-붙여넣기하면 됩니다:

```bash
# 1. 설정 파일 생성
sudo mkdir -p /etc/systemd/journald.conf.d/ && \
sudo tee /etc/systemd/journald.conf.d/00-journal-size.conf > /dev/null <<'EOF'
[Journal]
SystemMaxUse=100M
MaxRetentionSec=1week
SystemMaxFileSize=10M
SystemKeepFree=500M
EOF

# 2. 설정 파일 확인
cat /etc/systemd/journald.conf.d/00-journal-size.conf

# 3. 현재 저널 크기 확인 (변경 전)
journalctl --disk-usage

# 4. journald 재시작 (설정 적용)
sudo systemctl restart systemd-journald

# 5. 기존 대용량 로그 즉시 정리
sudo journalctl --vacuum-size=100M

# 6. 정리 후 저널 크기 확인
journalctl --disk-usage

# 7. 완료 메시지
echo "설정 완료! 다음 부팅 시 'systemd-analyze' 명령어로 부팅 시간을 확인하세요."
```

## 설정 되돌리기

만약 설정을 원래대로 되돌리고 싶다면 한 줄로 가능합니다:

```bash
sudo rm -f /etc/systemd/journald.conf.d/00-journal-size.conf && \
sudo systemctl restart systemd-journald
```

## 추가 유용한 명령어

### 저널 상태 확인

```bash
# 현재 저널 설정 확인
journalctl --header

# 저널 크기
journalctl --disk-usage

# 저널 무결성 확인
sudo journalctl --verify
```

### 특정 로그 보기

```bash
# 최근 에러 로그 10줄
journalctl -p err -n 10

# 현재 부팅 로그
journalctl -b

# 실시간 로그 모니터링
journalctl -f
```

### 특정 부팅 로그만 삭제

```bash
# 현재 부팅 제외하고 이전 부팅 로그만 삭제
sudo journalctl --vacuum-time=0
```

## 설정 파일 위치 찾기

나중에 설정 파일 위치를 잊어버렸다면:

```bash
# journald 관련 모든 설정 파일 찾기
find /etc -name "*journald*" 2>/dev/null
```

또는:

```bash
# 적용된 설정 전체 보기 (파일 위치도 표시됨)
systemd-analyze cat-config systemd/journald.conf
```

## 각 설정의 의미

```ini
[Journal]
# 저널이 차지할 수 있는 최대 디스크 공간
SystemMaxUse=100M

# 이보다 오래된 로그는 자동 삭제
MaxRetentionSec=1week

# 개별 저널 파일의 최대 크기
SystemMaxFileSize=10M

# 시스템에 항상 남겨둘 여유 공간
SystemKeepFree=500M
```

## 주의사항

### 로그 보존 기간

- **개발자/시스템 관리자**: 2주일 이상 권장 (디버깅 시 필요)
- **일반 사용자**: 1주일이면 충분
- **서버**: 감사 로그 요구사항에 따라 조정 필요

### 디스크 공간

설정한 크기만큼 디스크 공간을 사용합니다:
- 50MB: 매우 공격적, 중요 로그가 빨리 삭제될 수 있음
- 100MB: 대부분의 경우 적절
- 200MB: 여유있게 로그 보관

### 서버 환경

프로덕션 서버에서는:
- 로그를 별도 로그 관리 시스템으로 전송
- journald는 최근 로그만 보관
- 감사 요구사항 확인 필수

## 자동화 스크립트

자주 사용한다면 스크립트로 만들어두세요:

```bash
# journal-optimize.sh
#!/bin/bash

echo "저널 최적화를 시작합니다..."

# 설정 파일 생성
sudo mkdir -p /etc/systemd/journald.conf.d/
sudo tee /etc/systemd/journald.conf.d/00-journal-size.conf > /dev/null <<'EOF'
[Journal]
SystemMaxUse=100M
MaxRetentionSec=1week
SystemMaxFileSize=10M
SystemKeepFree=500M
EOF

echo "변경 전 저널 크기:"
journalctl --disk-usage

# 적용
sudo systemctl restart systemd-journald

# 정리
sudo journalctl --vacuum-size=100M

echo "변경 후 저널 크기:"
journalctl --disk-usage

echo "완료!"
```

실행 권한 부여 후 사용:

```bash
chmod +x journal-optimize.sh
./journal-optimize.sh
```

## 마무리

이 방법으로 간단하게 우분투의 부팅 시간을 단축할 수 있습니다.

**핵심 정리:**
1. 명령어 한 줄로 설정 파일 자동 생성
2. systemd-journald 재시작
3. 기존 로그 정리

파일 경로를 외우거나 에디터를 열 필요가 없습니다. 복사-붙여넣기만 하면 됩니다!

**다음 단계:**
- 다른 서비스 최적화하기 (NetworkManager-wait-online, Plymouth 등)
- 불필요한 서비스 비활성화
- 시작 프로그램 정리

여러분의 시스템은 얼마나 빨라졌나요?
