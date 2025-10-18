// Cloudflare Pages Functions 미들웨어
// Rate Limiting 및 보안 헤더 적용

import { LIMITS } from './config.js';
import { getToday } from './utils/github.js';

/**
 * 모든 Functions 요청에 대해 실행되는 미들웨어
 */
export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // 정적 파일 및 에디터 페이지는 제한 제외
  if (path.startsWith('/assets/') ||
      path.startsWith('/editor/') ||
      path === '/editor' ||
      path === '/') {
    return await next();
  }

  // 1. Rate Limiting (IP 기반)
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const today = getToday();

  // 전체 요청 수 확인 (일일)
  const totalKey = `ratelimit:total:${today}`;
  const totalCount = await env.KV.get(totalKey);

  if (totalCount && parseInt(totalCount) >= LIMITS.DAILY_TOTAL_REQUESTS) {
    return new Response(
      JSON.stringify({
        error: '일일 요청 한도 초과',
        limit: LIMITS.DAILY_TOTAL_REQUESTS,
        resetAt: getTomorrowMidnight()
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '86400'
        }
      }
    );
  }

  // IP별 Rate Limiting (DDoS 방어)
  const ipKey = `ratelimit:ip:${ip}:${today}`;
  const ipCount = await env.KV.get(ipKey);

  if (ipCount && parseInt(ipCount) > 100) {
    return new Response(
      JSON.stringify({
        error: 'IP별 일일 요청 한도 초과 (100/일)',
        resetAt: getTomorrowMidnight()
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '86400'
        }
      }
    );
  }

  // 카운터 증가
  await env.KV.put(totalKey, (parseInt(totalCount || 0) + 1).toString(), {
    expirationTtl: 86400 // 24시간
  });

  await env.KV.put(ipKey, (parseInt(ipCount || 0) + 1).toString(), {
    expirationTtl: 86400
  });

  // 2. CORS 헤더 (필요시)
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': url.origin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  // 3. 보안 헤더 추가
  const response = await next();

  const newHeaders = new Headers(response.headers);
  newHeaders.set('X-Content-Type-Options', 'nosniff');
  newHeaders.set('X-Frame-Options', 'DENY');
  newHeaders.set('X-XSS-Protection', '1; mode=block');
  newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}

/**
 * 다음 날 자정 타임스탬프 반환 (UTC)
 */
function getTomorrowMidnight() {
  const tomorrow = new Date();
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  tomorrow.setUTCHours(0, 0, 0, 0);
  return tomorrow.toISOString();
}
