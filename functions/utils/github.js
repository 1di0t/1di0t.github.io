// GitHub API 유틸리티

/**
 * GitHub API 호출
 * @param {string} endpoint - API 엔드포인트 (예: '/user')
 * @param {string} token - GitHub Personal Access Token
 * @param {Object} options - fetch 옵션
 * @returns {Promise<Object>} API 응답
 */
export async function githubAPI(endpoint, token, options = {}) {
  const url = endpoint.startsWith('http')
    ? endpoint
    : `https://api.github.com${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'AutoBlog-Editor',
      ...options.headers
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`GitHub API Error: ${response.status} - ${error.message || response.statusText}`);
  }

  return await response.json();
}

/**
 * GitHub 파일 생성/수정
 * @param {string} token - GitHub Token
 * @param {string} owner - 저장소 소유자
 * @param {string} repo - 저장소 이름
 * @param {string} path - 파일 경로
 * @param {string} content - 파일 내용
 * @param {string} message - 커밋 메시지
 * @param {string} branch - 브랜치 (기본: main)
 * @returns {Promise<Object>} API 응답
 */
export async function createOrUpdateFile(token, owner, repo, path, content, message, branch = 'main') {
  // 기존 파일 확인 (SHA 필요)
  let sha = null;
  try {
    const existing = await githubAPI(
      `/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
      token
    );
    sha = existing.sha;
  } catch (error) {
    // 파일이 없으면 새로 생성
  }

  // 파일 생성/수정
  const body = {
    message,
    content: btoa(unescape(encodeURIComponent(content))), // UTF-8 → Base64
    branch
  };

  if (sha) {
    body.sha = sha; // 기존 파일 수정 시 SHA 필요
  }

  return await githubAPI(
    `/repos/${owner}/${repo}/contents/${path}`,
    token,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
  );
}

/**
 * GitHub OAuth 토큰으로 사용자 정보 가져오기
 * @param {string} accessToken - GitHub OAuth Access Token
 * @returns {Promise<Object>} 사용자 정보
 */
export async function getGitHubUser(accessToken) {
  return await githubAPI('/user', accessToken);
}

/**
 * GitHub OAuth Access Token 교환
 * @param {string} code - OAuth 인증 코드
 * @param {string} clientId - GitHub OAuth App Client ID
 * @param {string} clientSecret - GitHub OAuth App Client Secret
 * @returns {Promise<string>} Access Token
 */
export async function exchangeCodeForToken(code, clientId, clientSecret) {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code
    })
  });

  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(`GitHub OAuth Error: ${data.error_description || data.error}`);
  }

  return data.access_token;
}

/**
 * 파일명을 slug로 변환
 * @param {string} title - 파일 제목
 * @returns {string} slug
 */
export function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s가-힣-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환
 * @returns {string} 오늘 날짜
 */
export function getToday() {
  return new Date().toISOString().split('T')[0];
}

/**
 * 현재 년월을 YYYY-MM 형식으로 반환
 * @returns {string} 현재 년월
 */
export function getCurrentMonth() {
  return new Date().toISOString().slice(0, 7);
}
