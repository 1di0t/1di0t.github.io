---
layout: post
title: "쿠키, 세션, 토큰, 캐시: 웹 데이터 저장 방식의 차이점과 활용법"
category: 웹개발 (Web)
tags:
  - cookie
  - session
  - token
  - cache
  - web-security
  - authentication
excerpt: 웹 개발에서 자주 사용되는 쿠키, 세션, 토큰, 캐시의 차이점과 각각의 특성, 보안 수준, 활용 방법에 대해 알아봅니다.
parent_category: study
learning_framework:
  stage: digestion
  pacer_type: procedural
  pacer_types:
    - procedural
    - evidence
---

## 서론: 왜 다양한 저장 방식이 필요한가?

웹 애플리케이션에서는 사용자 정보, 인증 상태, 임시 데이터 등을 다양한 방식으로 저장하고 관리합니다. 각 저장 방식은 **보안**, **성능**, **사용 목적**에 따라 다른 특성을 가지고 있습니다.

이 글에서는 웹 개발에서 자주 사용되는 **쿠키(Cookie)**, **세션(Session)**, **토큰(Token)**, **캐시(Cache)**의 차이점과 활용법을 알아보겠습니다.

---

## 쿠키 (Cookie)

### 정의

**쿠키**는 브라우저에 저장되는 작은 데이터 조각으로, 사용자가 수정할 수 있는 키-값 쌍입니다.

### 특징

- **저장 위치**: 클라이언트(브라우저)
- **수정 가능 여부**: 사용자가 수정 가능 ⚠️
- **보안 수준**: 낮음 (클라이언트에서 조작 가능)
- **만료 시간**: 설정 가능

### 사용 예시

```javascript
// 쿠키 설정
document.cookie = "username=JohnDoe; expires=Fri, 31 Dec 2025 23:59:59 GMT";

// 쿠키 읽기
console.log(document.cookie);
```

### 활용 사례

- 사용자 환경 설정 (언어, 테마 등)
- 장바구니 정보
- 광고 추적
- 비로그인 사용자 식별

### 보안 고려사항

⚠️ 쿠키는 클라이언트에서 수정 가능하므로, **중요한 정보나 인증 정보를 직접 저장하면 안 됩니다**.

---

## 세션 (Session)

### 정의

**세션**은 서버에 저장되는 사용자 상태 정보로, 클라이언트에는 세션 ID만 전달됩니다.

### 특징

- **저장 위치**: 서버
- **수정 가능 여부**: 사용자가 수정 불가능 ✅
- **보안 수준**: 높음
- **같은 아이디 중복 로그인**: 불가능 (기존 세션 무효화)

### 작동 원리

1. 사용자가 로그인하면 서버가 세션 생성
2. 서버는 고유한 세션 ID를 생성하여 클라이언트에 전달 (쿠키로 저장)
3. 클라이언트는 이후 요청 시 세션 ID를 함께 전송
4. 서버는 세션 ID로 사용자 정보 확인

### 사용 예시 (Node.js + Express)

```javascript
const session = require('express-session');

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

// 세션에 데이터 저장
app.post('/login', (req, res) => {
  req.session.user = { id: 1, name: 'JohnDoe' };
  res.send('로그인 성공');
});

// 세션에서 데이터 읽기
app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.send(`안녕하세요, ${req.session.user.name}님`);
  } else {
    res.send('로그인이 필요합니다');
  }
});
```

### 활용 사례

- 로그인 상태 유지
- 임시 데이터 저장 (장바구니, 폼 입력값 등)

### 단점

- 서버 메모리 사용 증가
- 같은 아이디로 여러 기기에서 동시 로그인 불가

---

## 토큰 (Token)

### 정의

**토큰**은 서버가 발급하는 암호화된 인증 정보로, **비밀키**를 사용하여 검증합니다.

### 특징

- **저장 위치**: 서버가 발급, 클라이언트가 저장
- **수정 가능 여부**: 수정 시 검증 실패 ✅
- **보안 수준**: 높음 (암호화 + 서명)
- **같은 아이디 중복 로그인**: 가능 (여러 토큰 발급 가능)

### 대표적인 토큰: JWT (JSON Web Token)

JWT는 **Header**, **Payload**, **Signature**로 구성됩니다.

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJKb2huRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### 사용 예시 (Node.js + jsonwebtoken)

```javascript
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'my-secret-key';

// 토큰 생성
app.post('/login', (req, res) => {
  const user = { id: 1, name: 'JohnDoe' };
  const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// 토큰 검증
app.get('/profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.send(`안녕하세요, ${decoded.name}님`);
  } catch (error) {
    res.status(401).send('유효하지 않은 토큰');
  }
});
```

### 활용 사례

- RESTful API 인증
- 모바일 앱 로그인
- 마이크로서비스 간 인증
- SSO (Single Sign-On)

### 장점

- 서버 메모리 사용 없음 (Stateless)
- 여러 기기에서 동시 로그인 가능
- 확장성 우수

---

## 캐시 (Cache)

### 정의

**캐시**는 한 번 받은 데이터를 클라이언트 또는 중간 서버에 저장하여 재사용하는 메커니즘입니다.

### 특징

- **저장 위치**: 클라이언트 또는 중간 서버
- **목적**: 성능 향상, 네트워크 트래픽 감소
- **유효 기간**: 설정 가능

### 종류

1. **브라우저 캐시**: HTML, CSS, JS, 이미지 등 정적 파일 저장
2. **CDN 캐시**: 전 세계 서버에 콘텐츠 분산 저장
3. **서버 캐시**: Redis, Memcached 등을 사용한 데이터 캐싱

### 사용 예시 (HTTP 헤더)

```http
Cache-Control: max-age=3600
```

### 활용 사례

- 정적 파일(이미지, CSS, JS) 캐싱
- API 응답 캐싱
- 데이터베이스 쿼리 결과 캐싱

---

## 비교 요약

| 항목 | 쿠키 | 세션 | 토큰 | 캐시 |
|------|------|------|------|------|
| **저장 위치** | 클라이언트 | 서버 | 클라이언트 | 클라이언트/서버 |
| **수정 가능** | ⚠️ 가능 | ❌ 불가 | ⚠️ 가능 (검증 실패) | ⚠️ 가능 |
| **보안 수준** | 낮음 | 높음 | 높음 | 낮음 |
| **중복 로그인** | - | ❌ 불가 | ✅ 가능 | - |
| **서버 부하** | 없음 | 있음 | 없음 | 감소 |
| **주요 용도** | 환경 설정 | 인증 상태 | API 인증 | 성능 최적화 |

---

## 결론

웹 개발에서는 **사용 목적과 보안 수준**에 따라 적절한 저장 방식을 선택해야 합니다:

- **쿠키**: 간단한 사용자 환경 설정
- **세션**: 전통적인 웹 애플리케이션 로그인
- **토큰**: 현대적인 API 기반 인증 (JWT)
- **캐시**: 성능 최적화 및 트래픽 감소

각 방식의 장단점을 이해하고, 상황에 맞게 활용하는 것이 중요합니다.

---

## 참고 자료

- [MDN Web Docs - HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [JWT.io](https://jwt.io/)
- [Redis Documentation](https://redis.io/docs/)
