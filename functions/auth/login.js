// GitHub OAuth 로그인 시작

import { createErrorResponse } from '../utils/error-page.js';

/**
 * GET /auth/login
 * GitHub OAuth 인증 페이지로 리다이렉트
 */
export async function onRequestGet(context) {
  const { GITHUB_CLIENT_ID } = context.env;

  // 디버깅: 사용 가능한 환경변수 확인
  console.log('Available env keys:', Object.keys(context.env || {}));
  console.log('GITHUB_CLIENT_ID exists:', !!GITHUB_CLIENT_ID);

  if (!GITHUB_CLIENT_ID) {
    return createErrorResponse({
      status: 500,
      title: 'GitHub OAuth 설정 오류',
      message: 'GitHub OAuth App이 올바르게 구성되지 않았습니다.',
      solutions: [
        'Cloudflare Pages 대시보드 → Settings → Environment Variables로 이동',
        'GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, JWT_SECRET 환경 변수 추가',
        '환경 변수 추가 후 반드시 재배포 필요',
        '<a href="https://github.com/settings/developers" target="_blank">GitHub OAuth App 생성 방법</a>'
      ],
      details: `Available env keys: ${Object.keys(context.env || {}).join(', ')}\n\nNote: 환경변수는 배포 후에만 적용됩니다.`,
      backUrl: '/'
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
