// GitHub Personal Access Token 저장 (암호화)

import { verifyJWT, getSessionFromCookie } from '../utils/jwt.js';
import { encrypt } from '../utils/crypto.js';
import { githubAPI } from '../utils/github.js';

/**
 * POST /api/save-token
 * GitHub Personal Access Token을 암호화하여 D1에 저장
 *
 * Body: { "token": "ghp_..." }
 */
export async function onRequestPost(context) {
  try {
    // 1. 세션 검증
    const sessionToken = getSessionFromCookie(context.request);
    const session = await verifyJWT(sessionToken, context.env.JWT_SECRET);

    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    // 2. 요청 본문 파싱
    const { token } = await context.request.json();

    if (!token || !token.startsWith('ghp_')) {
      return new Response(
        JSON.stringify({ error: '올바른 GitHub Personal Access Token 형식이 아닙니다.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3. Token 유효성 검증 (GitHub API 테스트)
    try {
      await githubAPI('/user', token);
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'GitHub Token이 유효하지 않습니다.', details: error.message }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 4. 암호화 (AES-256-GCM)
    const encryptedToken = await encrypt(token, context.env.ENCRYPTION_KEY);

    // 5. D1에 저장
    await context.env.DB.prepare(`
      INSERT INTO user_tokens (user_id, encrypted_token, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(user_id) DO UPDATE SET
        encrypted_token = excluded.encrypted_token,
        updated_at = CURRENT_TIMESTAMP
    `).bind(session.userId, encryptedToken).run();

    return new Response(
      JSON.stringify({ success: true, message: 'GitHub Token이 안전하게 저장되었습니다.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('save-token error:', error);
    return new Response(
      JSON.stringify({ error: '서버 오류', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
