// Draft 저장 (GitHub API로 직접 커밋)

import { verifyJWT, getSessionFromCookie } from '../utils/jwt.js';
import { decrypt } from '../utils/crypto.js';
import { createOrUpdateFile, slugify, getToday } from '../utils/github.js';

/**
 * POST /api/save-draft
 * 마크다운 초안을 GitHub _drafts/ 폴더에 커밋
 *
 * Body: { "title": "제목", "content": "내용" }
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
    const { title, content } = await context.request.json();

    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: '제목과 내용은 필수입니다.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3. 암호화된 GitHub Token 가져오기
    const tokenRow = await context.env.DB.prepare(
      'SELECT encrypted_token FROM user_tokens WHERE user_id = ?'
    ).bind(session.userId).first();

    if (!tokenRow) {
      return new Response(
        JSON.stringify({ error: 'GitHub Token이 설정되지 않았습니다. 먼저 Token을 저장하세요.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 4. 복호화
    const githubToken = await decrypt(tokenRow.encrypted_token, context.env.ENCRYPTION_KEY);

    // 5. 파일 경로 생성
    const today = getToday();
    const slug = slugify(title);
    const filename = `_drafts/${today}-${slug}.md`;

    // 6. GitHub API로 파일 생성/수정
    const owner = context.env.GITHUB_OWNER || '1di0t';
    const repo = context.env.GITHUB_REPO || '1di0t.github.io';

    await createOrUpdateFile(
      githubToken,
      owner,
      repo,
      filename,
      content,
      `draft: ${title}`,
      'main'
    );

    // 7. 사용량 통계 업데이트
    await incrementUsageStat(context.env.DB, session.userId, 'save', 'daily', today);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Draft가 GitHub에 저장되었습니다.',
        filename,
        url: `https://github.com/${owner}/${repo}/blob/main/${filename}`
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('save-draft error:', error);
    return new Response(
      JSON.stringify({ error: '저장 실패', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * 사용량 통계 증가
 */
async function incrementUsageStat(db, userId, statType, periodType, period) {
  await db.prepare(`
    INSERT INTO usage_stats (user_id, stat_type, period_type, period, count, updated_at)
    VALUES (?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
    ON CONFLICT(user_id, stat_type, period_type, period) DO UPDATE SET
      count = count + 1,
      updated_at = CURRENT_TIMESTAMP
  `).bind(userId, statType, periodType, period).run();
}
