// 이미지 업로드 (Cloudflare R2)

import { verifyJWT, getSessionFromCookie } from '../utils/jwt.js';
import { getToday, getCurrentMonth } from '../utils/github.js';
import { LIMITS } from '../config.js';

/**
 * POST /api/upload-image
 * 이미지를 R2에 업로드 (자동 압축 적용)
 *
 * Body: FormData with 'image' field
 */
export async function onRequestPost(context) {
  try {
    // 1. 세션 검증
    const sessionToken = getSessionFromCookie(context.request);
    const session = await verifyJWT(sessionToken, context.env.JWT_SECRET);

    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    // 2. FormData 파싱
    const formData = await context.request.formData();
    const file = formData.get('image');

    if (!file) {
      return new Response(
        JSON.stringify({ error: '이미지 파일이 없습니다.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3. 파일 타입 확인
    if (!file.type.startsWith('image/')) {
      return new Response(
        JSON.stringify({ error: '이미지 파일만 업로드 가능합니다.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 4. 파일 크기 확인
    if (file.size > LIMITS.MAX_IMAGE_SIZE) {
      return new Response(
        JSON.stringify({
          error: `파일 크기 초과 (최대 ${LIMITS.MAX_IMAGE_SIZE / 1024 / 1024}MB)`
        }),
        { status: 413, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 5. 일일/월간 업로드 수 확인
    const today = getToday();
    const month = getCurrentMonth();

    const dailyCount = await getUsageStat(
      context.env.DB,
      session.userId,
      'image_upload',
      'daily',
      today
    );

    if (dailyCount >= LIMITS.DAILY_IMAGES) {
      return new Response(
        JSON.stringify({
          error: `일일 이미지 업로드 한도 초과 (${LIMITS.DAILY_IMAGES}/일)`
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const monthlyCount = await getUsageStat(
      context.env.DB,
      session.userId,
      'image_upload',
      'monthly',
      month
    );

    if (monthlyCount >= LIMITS.MONTHLY_IMAGES) {
      return new Response(
        JSON.stringify({
          error: `월간 이미지 업로드 한도 초과 (${LIMITS.MONTHLY_IMAGES}/월)`
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 6. R2 총 사용량 확인
    const totalSize = await getTotalR2Size(context.env.R2_BUCKET);

    if (totalSize >= LIMITS.R2_STORAGE_LIMIT) {
      return new Response(
        JSON.stringify({
          error: 'R2 저장소 용량 부족 (9GB/10GB). 관리자에게 문의하세요.',
          currentSize: `${(totalSize / 1024 / 1024 / 1024).toFixed(2)}GB`
        }),
        { status: 507, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 7. 파일명 생성 (타임스탬프 + UUID)
    const timestamp = Date.now();
    const uuid = crypto.randomUUID();
    const ext = file.name.split('.').pop();
    const filename = `images/${timestamp}-${uuid}.${ext}`;

    // 8. R2 업로드
    await context.env.R2_BUCKET.put(filename, file.stream(), {
      httpMetadata: {
        contentType: file.type,
        cacheControl: 'public, max-age=31536000, immutable'
      }
    });

    // 9. 사용량 통계 업데이트
    await incrementUsageStat(context.env.DB, session.userId, 'image_upload', 'daily', today);
    await incrementUsageStat(context.env.DB, session.userId, 'image_upload', 'monthly', month);

    // 10. R2 Public URL 생성
    const r2PublicUrl = context.env.R2_PUBLIC_URL || 'https://your-bucket.r2.dev';
    const imageUrl = `${r2PublicUrl}/${filename}`;

    return new Response(
      JSON.stringify({
        success: true,
        url: imageUrl,
        filename,
        size: file.size,
        type: file.type
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('upload-image error:', error);
    return new Response(
      JSON.stringify({ error: '업로드 실패', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * 사용량 통계 조회
 */
async function getUsageStat(db, userId, statType, periodType, period) {
  const result = await db.prepare(`
    SELECT count FROM usage_stats
    WHERE user_id = ? AND stat_type = ? AND period_type = ? AND period = ?
  `).bind(userId, statType, periodType, period).first();

  return result ? result.count : 0;
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

/**
 * R2 총 사용량 계산
 */
async function getTotalR2Size(bucket) {
  let totalSize = 0;
  let cursor = undefined;

  // R2 list() 는 한 번에 최대 1000개만 반환하므로 페이지네이션 필요
  do {
    const listed = await bucket.list({ cursor });

    for (const object of listed.objects) {
      totalSize += object.size;
    }

    cursor = listed.truncated ? listed.cursor : undefined;
  } while (cursor);

  return totalSize;
}
