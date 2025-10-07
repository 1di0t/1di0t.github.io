---
layout: post
title: "EatPrint 개발일지 - SNS 앱 개발 여정"
date: 2025-10-07 04:00:00 +0900
categories: [Project, Mobile]
tags: [flutter, dart, python, flask, aws, dynamodb, postgresql, 앱개발]
---

## 개발 언어 및 프레임워크

### Flutter & Dart
이전 프로젝트에서 사용했던 프론트엔드 제작 프레임워크
다양한 플랫폼으로 빌드가 가능

### Python & Flask
Boto3 라이브러리를 사용하여 DynamoDB를 활용 가능

### DynamoDB
SNS의 특성상 비정형 데이터가 유리하다고 생각했기 때문
클라우드 서비스를 이용해보고자 사용 - 이번 프로젝트의 주 목적이기도 하다.

---

## 주요 개발 내용

### 로그인 및 회원가입

#### DB 생성 및 유저 생성 & 권한 설정

```sql
CREATE DATABASE users; -- DB 생성
create user 'username'@'%' IDENTIFIED BY 'pwd';
-- 모든 호스트(%)에서 접근하는 유저생성
GRANT ALL PRIVILEGES ON database_name.* TO 'user'@'%';
-- DB 내의 모든 테이블에 접근권한 설정
FLUSH PRIVILEGES;
-- 서버에 업데이트
```

### 게시물 저장 및 보여주기

게시물 데이터베이스를 설계하고 이미지 업로드 기능을 구현했습니다.

---

## Trouble Shooting

### 1. Image Picker 권한 문제

**문제**: Image Picker를 활용해서 이미지를 선택하면 IOS Simulator가 종료되는 현상 발생

**원인**: 갤러리 라이브러리에서 사진을 가져오는 권한을 설정하지 않아서 종료됨

**해결**: info.plist에서 권한 설정

```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>사진 접근 권한이 필요합니다.</string>
```

### 2. Flask 데코레이터 문제

**문제**: 데코레이터 `@app.before_first_request` 가 유효하지 않다는 에러

**원인**: Flask 2.3.x 버전부터 데코레이터 구문 변경

**해결**: 다음과 같이 변경

```python
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
```

### 3. MySQL 서버 연결 문제

**문제**: 앱에서 회원가입 시도시 timeout 에러 출력

**원인**: 공개 IP주소를 사용하더라도 특정 네트워크를 따로 지정을 해주어야 연결가능

**해결**: Google cloud console에서 connection - networking 에서 IP추가

### 4. SQLAlchemy 인스턴스 중복 문제

**문제**:
```python
RuntimeError: The current Flask app is not registered with this 'SQLAlchemy' instance.
Did you forget to call 'init_app', or did you create multiple 'SQLAlchemy' instances?
```

**원인**: 테이블 클래스 분리중 models.py 파일에 인스턴스 생성 중복

**해결**: User테이블과 db 인스턴스를 함께 import

```python
from models import db, User
```

### 5. PostgreSQL 권한 문제

**문제**:
```python
sqlalchemy.exc.ProgrammingError: (psycopg2.errors.InsufficientPrivilege)
permission denied for schema public
```

**원인**: PostgreSQL 15 이상 부터는 데이터베이스 소유자를 제외한 모든 사용자의 CREATE 권한이 취소됨

**해결**:

```sql
CREATE USER exampleUser WITH ENCRYPTED PASSWORD '~~~'; -- create user
GRANT ALL PRIVILEGES ON DATABASE exampledb to exampleUser; -- exampleUser의 권한을 허용
\c exampledb postgres; -- 데이터베이스에 접근
GRANT ALL ON SCHEMA public TO exampleUser; -- public schema에 관한 권한을 exampleUser에게 부여
```

### 6. AWS S3 접근 권한 문제

**문제**:
```python
botocore.exceptions.ClientError: An error occurred (AccessDenied) when calling the PutObject operation: Access Denied
```
```python
botocore.exceptions.ClientError: An error occurred (AccessControlListNotSupported) when calling the PutObject operation: The bucket does not allow ACLs
```

**해결**: ACL을 활성화후 버킷 정책에 Json 형식의 데이터 추가

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:PutObjectAcl"
            ],
            "Resource": "arn:aws:s3:::eatprintbucket/*"
        }
    ]
}
```

### 7. 이미지 업로드 방식

**고민**: 플러터에서 이미지를 업로드 할 때 await 와 Future.wait 중 어느 방식으로 처리할지 고민

**결정**: await보단 병렬로 처리하는 wait가 성능향상에 도움이 될 것 같아서 wait 채택

### 8. post 변환 문제

**문제**: flask 측 get_post 함수에서 post를 post_dict로 변환하는 중 에러발생

**원인**: `__dict__`는 Join등을 사용하여 객체가 복잡해질 경우 에러를 일으키는 것으로 추정

**해결**: 명시적으로 딕셔너리 생성

```python
post_dict = {
    'post_id': post.post_id,
    'user_num': post.user_num,
    'user_nickname': user.nick_name if user else 'Unknown User',
    'content': post.content,
    'location': None,
    'imageUrls': []
}
```

---

## 개발 타임라인

### 2024-07

#### 2024-07-06
로그인 및 회원 가입을 위한 데이터베이스 구축
구글 클라우드를 사용하여 MySQL 인스턴스 생성

#### 2024-07-19
회원가입 시 아이디 중복 체크 기능 추가

#### 2024-07-23
로그인 상태 SharedPreferences로 기억하는 기능 추가

#### 2024-07-28
로그아웃 시 페이지 모두 종료 후 로그인 페이지로 돌아가는 기능 추가

#### 2024-07-29
로그인 페이지 색상 및 디자인 미세변경

#### 2024-07-31
텍스트 필드 추출

### 2024-08

#### 2024-08-02
페이지 이동버튼 클릭시 이전 페이지 종료 및 버튼 이름 변경

#### 2024-08-03
페이지 이동 애니메이션 삭제
페이지 생성, 앱바에 연결

#### 2024-08-08
테이블 설계 추가 정리

#### 2024-08-11
이미지 선택 추가

#### 2024-08-13
다중 이미지 선택으로 변경
이미지를 리스트뷰로 출력
Flask 서버로 사진들을 전송

#### 2024-08-15
Flutter에서 업로드한 이미지를 AWS S3에 업로드
- ACL : public-read를 private으로 변경해야할지 고민

#### 2024-08-17
테이블 수정

#### 2024-08-19
posting 함수 구현

#### 2024-08-21
1. DB에 url을 저장할때 글자가 하나하나 분리되는 문제 해결
2. 해시태그를 추출하는 함수 추가

#### 2024-08-28
Flask 서버에서 Post를 가져오는 함수 추가
Post의 데이터 클래스와 Post 데이터를 가져오는 fetchPosts 함수 추가

### 2024-09

#### 2024-09-01
포스트 디자인 (초기)완료 및 유저 닉네임 추가

#### 2024-09-06
flask서버를 django로 변경하는 것이 추후 더 유리할 것으로 판단
django로 변경하기 위한 준비 시작

---

## 프로젝트 회고

이 프로젝트를 통해 다음을 경험했습니다:

1. **클라우드 서비스 활용**: AWS S3, Google Cloud SQL 등 클라우드 서비스 경험
2. **문제 해결 능력**: 다양한 에러를 해결하면서 디버깅 능력 향상
3. **전체 스택 개발**: 프론트엔드(Flutter)부터 백엔드(Flask), 데이터베이스까지 전체 개발
4. **버전 관리**: Git을 통한 체계적인 버전 관리와 개발 히스토리 관리
