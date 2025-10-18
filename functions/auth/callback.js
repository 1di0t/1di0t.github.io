// GitHub OAuth 콜백 처리

import { ALLOWED_USERS } from '../config.js';
import { exchangeCodeForToken, getGitHubUser } from '../utils/github.js';
import { generateJWT, createSessionCookie } from '../utils/jwt.js';
import { createErrorResponse } from '../utils/error-page.js';

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
    const errorDescriptions = {
      'access_denied': '사용자가 권한 승인을 거부했습니다.',
      'unauthorized_client': 'OAuth App이 올바르게 구성되지 않았습니다.'
    };
    return createErrorResponse({
      status: 400,
      title: 'GitHub 인증 실패',
      message: errorDescriptions[error] || `GitHub OAuth 오류: ${error}`,
      solutions: [
        '브라우저를 새로고침하고 다시 로그인을 시도하세요',
        'GitHub 계정에 로그인되어 있는지 확인하세요',
        '문제가 계속되면 관리자에게 문의하세요'
      ],
      details: `OAuth error parameter: ${error}`,
      backUrl: '/'
    });
  }

  if (!code) {
    console.error('No authorization code');
    return createErrorResponse({
      status: 400,
      title: '인증 코드 없음',
      message: 'GitHub에서 인증 코드를 받지 못했습니다.',
      solutions: [
        'GitHub 로그인을 다시 시도하세요',
        '브라우저 쿠키가 활성화되어 있는지 확인하세요',
        '시크릿 모드를 사용 중이라면 일반 모드에서 시도하세요'
      ],
      backUrl: '/'
    });
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
      return createErrorResponse({
        status: 403,
        title: '접근 거부',
        message: `죄송합니다. "${user.login}" 계정은 이 에디터를 사용할 권한이 없습니다.`,
        solutions: [
          '허가된 GitHub 계정으로 로그인하세요',
          '접근 권한이 필요하다면 관리자에게 문의하세요',
          `허용된 사용자: ${allowedUsers.join(', ')}`
        ],
        details: `Allowed users: ${JSON.stringify(allowedUsers)}\nRequested user: ${user.login}`,
        backUrl: '/'
      });
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
    const cookieHeader = createSessionCookie(sessionToken);
    console.log('Set-Cookie header:', cookieHeader);

    // HTML 리다이렉트 사용 (쿠키가 확실히 설정되도록)
    // HttpOnly 쿠키는 JS에서 접근 불가하므로 서버 측 확인만 로깅
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>로그인 중...</title>
          <script>
            console.log('✅ OAuth callback successful');
            console.log('⏳ Redirecting to /editor...');
            // HttpOnly 쿠키는 document.cookie에 보이지 않음 (보안상 정상)
            setTimeout(() => {
              window.location.href = '/editor';
            }, 100);
          </script>
        </head>
        <body style="font-family: system-ui; text-align: center; padding: 50px;">
          <h2>✅ 로그인 성공!</h2>
          <p>에디터로 이동 중...</p>
        </body>
      </html>
    `;

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Set-Cookie': cookieHeader
      }
    });

  } catch (error) {
    console.error('OAuth callback error:', error);

    // 에러 타입별 처리
    const errorMessage = error.message || '알 수 없는 오류';
    let solutions = [
      '페이지를 새로고침하고 다시 로그인을 시도하세요',
      '문제가 계속되면 아래 기술 정보를 캡처해서 이슈로 제보해주세요'
    ];

    // D1 데이터베이스 에러
    if (errorMessage.includes('DB') || errorMessage.includes('database')) {
      solutions.unshift('데이터베이스 연결 오류입니다. 잠시 후 다시 시도하세요');
    }
    // GitHub API 에러
    else if (errorMessage.includes('GitHub') || errorMessage.includes('API')) {
      solutions.unshift('GitHub API 연결 오류입니다. GitHub 상태를 확인하세요');
    }
    // JWT 생성 에러
    else if (errorMessage.includes('JWT') || errorMessage.includes('token')) {
      solutions.unshift('세션 생성 오류입니다. 환경 변수 설정을 확인하세요');
    }

    return createErrorResponse({
      status: 500,
      title: '인증 처리 실패',
      message: '로그인 처리 중 서버 오류가 발생했습니다.',
      solutions,
      details: `Error: ${errorMessage}\n\nStack: ${error.stack || 'No stack trace'}`,
      backUrl: '/'
    });
  }
}
