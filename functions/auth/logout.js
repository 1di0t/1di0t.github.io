// 로그아웃

import { clearSessionCookie } from '../utils/jwt.js';

/**
 * POST /auth/logout
 * 세션 쿠키 삭제 및 로그아웃
 */
export async function onRequestPost(context) {
  return new Response(null, {
    status: 302,
    headers: {
      'Location': '/',
      'Set-Cookie': clearSessionCookie()
    }
  });
}
