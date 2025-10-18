// GitHub OAuth 로그인 시작

/**
 * GET /auth/login
 * GitHub OAuth 인증 페이지로 리다이렉트
 */
export async function onRequestGet(context) {
  const { GITHUB_CLIENT_ID } = context.env;

  if (!GITHUB_CLIENT_ID) {
    return new Response(
      JSON.stringify({
        error: 'GitHub OAuth 설정 오류',
        message: 'GITHUB_CLIENT_ID 환경변수가 설정되지 않았습니다.',
        solution: 'Cloudflare Pages 대시보드 > Settings > Environment Variables에서 GITHUB_CLIENT_ID를 설정하세요.',
        docs: 'https://github.com/settings/developers'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
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
