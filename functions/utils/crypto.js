// 암호화/복호화 유틸리티 (AES-256-GCM)

import { CRYPTO_CONFIG } from '../config.js';

/**
 * 문자열을 AES-GCM으로 암호화
 * @param {string} plaintext - 암호화할 텍스트
 * @param {string} secret - 암호화 키 (환경변수)
 * @returns {Promise<string>} Base64 인코딩된 암호문 (IV + 암호문 + Tag)
 */
export async function encrypt(plaintext, secret) {
  const encoder = new TextEncoder();

  // 키 생성
  const keyData = encoder.encode(secret);
  const key = await crypto.subtle.importKey(
    'raw',
    await crypto.subtle.digest('SHA-256', keyData),
    { name: CRYPTO_CONFIG.ALGORITHM },
    false,
    ['encrypt']
  );

  // IV 생성 (랜덤)
  const iv = crypto.getRandomValues(new Uint8Array(CRYPTO_CONFIG.IV_LENGTH));

  // 암호화
  const ciphertext = await crypto.subtle.encrypt(
    {
      name: CRYPTO_CONFIG.ALGORITHM,
      iv: iv,
      tagLength: CRYPTO_CONFIG.TAG_LENGTH * 8
    },
    key,
    encoder.encode(plaintext)
  );

  // IV + 암호문을 합쳐서 Base64로 인코딩
  const combined = new Uint8Array(iv.length + ciphertext.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(ciphertext), iv.length);

  return btoa(String.fromCharCode(...combined));
}

/**
 * AES-GCM으로 암호화된 문자열 복호화
 * @param {string} encryptedBase64 - Base64 인코딩된 암호문
 * @param {string} secret - 암호화 키 (환경변수)
 * @returns {Promise<string>} 복호화된 텍스트
 */
export async function decrypt(encryptedBase64, secret) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  // Base64 디코딩
  const combined = new Uint8Array(
    atob(encryptedBase64).split('').map(c => c.charCodeAt(0))
  );

  // IV와 암호문 분리
  const iv = combined.slice(0, CRYPTO_CONFIG.IV_LENGTH);
  const ciphertext = combined.slice(CRYPTO_CONFIG.IV_LENGTH);

  // 키 생성
  const keyData = encoder.encode(secret);
  const key = await crypto.subtle.importKey(
    'raw',
    await crypto.subtle.digest('SHA-256', keyData),
    { name: CRYPTO_CONFIG.ALGORITHM },
    false,
    ['decrypt']
  );

  // 복호화
  const plaintext = await crypto.subtle.decrypt(
    {
      name: CRYPTO_CONFIG.ALGORITHM,
      iv: iv,
      tagLength: CRYPTO_CONFIG.TAG_LENGTH * 8
    },
    key,
    ciphertext
  );

  return decoder.decode(plaintext);
}

/**
 * CSRF 토큰 생성
 * @param {string} sessionToken - 세션 토큰
 * @param {string} secret - 시크릿 키
 * @returns {Promise<string>} CSRF 토큰
 */
export async function generateCSRFToken(sessionToken, secret) {
  const encoder = new TextEncoder();
  const data = encoder.encode(sessionToken + secret);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
