// 사용량 통계 조회

import { verifyJWT, getSessionFromCookie } from '../utils/jwt.js';
import { getToday, getCurrentMonth } from '../utils/github.js';
import { LIMITS, CLOUDFLARE_FREE_TIER } from '../config.js';

/**
 * GET /api/usage-stats
 * 사용자의 사용량 통계 반환
 */
export async function onRequestGet(context) {
  try {
    // 1. 세션 검증
    const sessionToken = getSessionFromCookie(context.request);
    const session = await verifyJWT(sessionToken, context.env.JWT_SECRET);

    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    // 2. 오늘/이번 달
    const today = getToday();
    const month = getCurrentMonth();

    // 3. D1에서 사용량 통계 조회
    const stats = await context.env.DB.prepare(`
      SELECT stat_type, period_type, period, count
      FROM usage_stats
      WHERE user_id = ? AND (
        (period_type = 'daily' AND period = ?) OR
        (period_type = 'monthly' AND period = ?)
      )
    `).bind(session.userId, today, month).all();

    // 4. 통계 데이터 정리
    const dailyStats = {};
    const monthlyStats = {};

    for (const stat of stats.results) {
      if (stat.period_type === 'daily') {
        dailyStats[stat.stat_type] = stat.count;
      } else if (stat.period_type === 'monthly') {
        monthlyStats[stat.stat_type] = stat.count;
      }
    }

    // 5. R2 사용량 조회
    const r2Size = await getTotalR2Size(context.env.R2_BUCKET);

    // 6. 응답 데이터 구성
    const response = {
      daily: {
        date: today,
        logins: dailyStats.login || 0,
        saves: dailyStats.save || 0,
        images: dailyStats.image_upload || 0,
        total_requests: dailyStats.total || 0,
        limits: {
          logins: LIMITS.DAILY_LOGINS,
          saves: LIMITS.DAILY_SAVES,
          images: LIMITS.DAILY_IMAGES,
          total_requests: LIMITS.DAILY_TOTAL_REQUESTS
        }
      },
      monthly: {
        month: month,
        images: monthlyStats.image_upload || 0,
        limits: {
          images: LIMITS.MONTHLY_IMAGES
        }
      },
      r2: {
        size: r2Size,
        sizeGB: (r2Size / 1024 / 1024 / 1024).toFixed(2),
        limit: LIMITS.R2_STORAGE_LIMIT,
        limitGB: 10,
        percentage: ((r2Size / LIMITS.R2_STORAGE_LIMIT) * 100).toFixed(1),
        warning: r2Size >= LIMITS.R2_STORAGE_WARNING
      },
      limits: {
        functions_daily: CLOUDFLARE_FREE_TIER.FUNCTIONS_DAILY,
        r2_storage: CLOUDFLARE_FREE_TIER.R2_STORAGE_TOTAL
      }
    };

    return new Response(
      JSON.stringify(response),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('usage-stats error:', error);
    return new Response(
      JSON.stringify({ error: '통계 조회 실패', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * R2 총 사용량 계산
 */
async function getTotalR2Size(bucket) {
  let totalSize = 0;
  let cursor = undefined;

  do {
    const listed = await bucket.list({ cursor });

    for (const object of listed.objects) {
      totalSize += object.size;
    }

    cursor = listed.truncated ? listed.cursor : undefined;
  } while (cursor);

  return totalSize;
}
