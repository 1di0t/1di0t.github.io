// JWT 유틸리티 (HS256)

import { JWT_CONFIG } from '../config.js';

/**
 * JWT 생성
 * @param {Object} payload - JWT 페이로드
 * @param {string} secret - JWT 시크릿
 * @returns {Promise<string>} JWT 토큰
 */
export async function generateJWT(payload, secret) {
  const header = {
    alg: JWT_CONFIG.ALGORITHM,
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const claims = {
    ...payload,
    iat: now,
    exp: now + JWT_CONFIG.EXPIRES_IN
  };

  const encodedHeader = base64urlEncode(JSON.stringify(header));
  const encodedPayload = base64urlEncode(JSON.stringify(claims));
  const signature = await sign(`${encodedHeader}.${encodedPayload}`, secret);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * JWT 검증 및 디코딩
 * @param {string} token - JWT 토큰
 * @param {string} secret - JWT 시크릿
 * @returns {Promise<Object|null>} 페이로드 또는 null (검증 실패)
 */
export async function verifyJWT(token, secret) {
  if (!token) return null;

  try {
    const [encodedHeader, encodedPayload, providedSignature] = token.split('.');

    // 서명 검증
    const expectedSignature = await sign(`${encodedHeader}.${encodedPayload}`, secret);
    if (providedSignature !== expectedSignature) {
      return null;
    }

    // 페이로드 디코딩
    const payload = JSON.parse(base64urlDecode(encodedPayload));

    // 만료 시간 확인
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null;
    }

    return payload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

/**
 * HMAC-SHA256 서명 생성
 */
async function sign(data, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(data)
  );

  return base64urlEncode(signature);
}

/**
 * Base64url 인코딩
 */
function base64urlEncode(input) {
  let str;
  if (typeof input === 'string') {
    str = btoa(unescape(encodeURIComponent(input)));
  } else {
    str = btoa(String.fromCharCode(...new Uint8Array(input)));
  }
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * Base64url 디코딩
 */
function base64urlDecode(input) {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  return decodeURIComponent(escape(atob(base64)));
}

/**
 * 쿠키에서 세션 토큰 추출
 * @param {Request} request - HTTP 요청
 * @returns {string|null} 세션 토큰
 */
export function getSessionFromCookie(request) {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {});

  return cookies['session'] || null;
}

/**
 * 세션 쿠키 생성
 * @param {string} token - JWT 토큰
 * @returns {string} Set-Cookie 헤더 값
 */
export function createSessionCookie(token) {
  const maxAge = JWT_CONFIG.EXPIRES_IN;
  // SameSite=Lax: OAuth 리다이렉트 시에도 쿠키 전송 허용
  return `session=${token}; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}; Path=/`;
}

/**
 * 세션 쿠키 삭제
 * @returns {string} Set-Cookie 헤더 값
 */
export function clearSessionCookie() {
  return 'session=; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Path=/';
}
