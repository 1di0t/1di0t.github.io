// GitHub OAuth 콜백 처리

import { ALLOWED_USERS } from '../config.js';
import { exchangeCodeForToken, getGitHubUser } from '../utils/github.js';
import { generateJWT, createSessionCookie } from '../utils/jwt.js';

/**
 * GET /auth/callback
 * GitHub OAuth 콜백 처리 및 세션 생성
 */
export async function onRequestGet(context) {
  const { searchParams } = new URL(context.request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  console.log('=== OAuth Callback Started ===');
  console.log('Code exists:', !!code);
  console.log('Error:', error);

  // OAuth 에러 처리
  if (error) {
    console.error('OAuth error:', error);
    return new Response(`GitHub OAuth Error: ${error}`, { status: 400 });
  }

  if (!code) {
    console.error('No authorization code');
    return new Response('Authorization code가 없습니다.', { status: 400 });
  }

  try {
    console.log('Step 1: Exchanging code for token...');
    // 1. GitHub Access Token 교환
    const accessToken = await exchangeCodeForToken(
      code,
      context.env.GITHUB_CLIENT_ID,
      context.env.GITHUB_CLIENT_SECRET
    );
    console.log('Step 1: ✅ Token received');

    // 2. 사용자 정보 가져오기
    console.log('Step 2: Fetching user info...');
    const user = await getGitHubUser(accessToken);
    console.log('Step 2: ✅ User:', user.login);

    // 3. 허용된 사용자 확인
    console.log('Step 3: Checking allowed users...');
    // 환경 변수가 있으면 우선 사용, 없으면 config.js의 기본값 사용
    const allowedUsers = context.env.ALLOWED_USERS
      ? context.env.ALLOWED_USERS.split(',').map(u => u.trim())
      : ALLOWED_USERS;
    console.log('Allowed users:', allowedUsers);

    if (!allowedUsers.includes(user.login)) {
      console.error('Step 3: ❌ User not allowed:', user.login);
      return new Response(
        `접근 거부: ${user.login}은(는) 허용되지 않은 사용자입니다.`,
        { status: 403 }
      );
    }
    console.log('Step 3: ✅ User allowed');

    // 4. D1에 사용자 저장/업데이트
    console.log('Step 4: Saving user to DB...');
    await context.env.DB.prepare(`
      INSERT INTO users (github_id, github_username, email, last_login)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(github_id) DO UPDATE SET
        last_login = CURRENT_TIMESTAMP,
        email = excluded.email
    `).bind(user.id, user.login, user.email).run();
    console.log('Step 4: ✅ User saved');

    // 5. 사용자 ID 가져오기
    console.log('Step 5: Fetching user ID...');
    const dbUser = await context.env.DB.prepare(
      'SELECT id FROM users WHERE github_id = ?'
    ).bind(user.id).first();
    console.log('Step 5: ✅ User ID:', dbUser.id);

    // 6. JWT 세션 생성
    console.log('Step 6: Generating JWT...');
    const sessionPayload = {
      userId: dbUser.id,
      githubId: user.id,
      username: user.login
    };

    const sessionToken = await generateJWT(sessionPayload, context.env.JWT_SECRET);
    console.log('Step 6: ✅ JWT generated');

    // 7. 에디터 페이지로 리다이렉트 (세션 쿠키 포함)
    console.log('Step 7: Redirecting to /editor...');
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/editor',
        'Set-Cookie': createSessionCookie(sessionToken)
      }
    });

  } catch (error) {
    console.error('OAuth callback error:', error);
    return new Response(
      `인증 실패: ${error.message}`,
      { status: 500 }
    );
  }
}
