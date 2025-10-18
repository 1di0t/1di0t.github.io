// GitHub OAuth 로그인 시작

/**
 * GET /auth/login
 * GitHub OAuth 인증 페이지로 리다이렉트
 */
export async function onRequestGet(context) {
  const { GITHUB_CLIENT_ID } = context.env;

  if (!GITHUB_CLIENT_ID) {
    return new Response('GitHub OAuth가 설정되지 않았습니다. 환경변수를 확인하세요.', {
      status: 500
    });
  }

  // GitHub OAuth URL 생성
  const authUrl = new URL('https://github.com/login/oauth/authorize');
  authUrl.searchParams.set('client_id', GITHUB_CLIENT_ID);
  authUrl.searchParams.set('scope', 'user:email');
  authUrl.searchParams.set('redirect_uri', `${getBaseUrl(context.request)}/auth/callback`);

  // GitHub 인증 페이지로 리다이렉트
  return Response.redirect(authUrl.toString(), 302);
}

/**
 * 요청에서 Base URL 추출
 */
function getBaseUrl(request) {
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}
