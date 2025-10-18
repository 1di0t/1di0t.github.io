// 사용량 제한 설정 (보수적)
export const LIMITS = {
  // 🔐 인증
  DAILY_LOGINS: 100,              // 일 100회 로그인
  LOGIN_SESSION_DAYS: 30,         // 세션 30일 유지

  // 📝 콘텐츠 작성
  DAILY_SAVES: 100,               // 일 100회 저장
  DAILY_IMAGES: 20,               // 일 20개 이미지
  MONTHLY_IMAGES: 200,            // 월 200개 이미지

  // 🖼️ 이미지
  MAX_IMAGE_SIZE: 2 * 1024 * 1024,           // 2MB/개
  MAX_IMAGE_SIZE_AFTER_COMPRESS: 500 * 1024, // 압축 후 500KB

  // 📊 전체
  DAILY_TOTAL_REQUESTS: 2000,     // 일 2000 요청

  // ⚠️ R2 저장소 (누적)
  R2_STORAGE_WARNING: 8 * 1024 * 1024 * 1024,  // 8GB 경고
  R2_STORAGE_LIMIT: 9 * 1024 * 1024 * 1024,    // 9GB 차단
};

// Cloudflare 무료 한도 (참고)
export const CLOUDFLARE_FREE_TIER = {
  FUNCTIONS_DAILY: 100000,        // 매일 초기화
  D1_READ_DAILY: 100000,          // 매일 초기화
  D1_WRITE_DAILY: 50000,          // 매일 초기화
  KV_READ_DAILY: 100000,          // 매일 초기화
  KV_WRITE_DAILY: 1000,           // 매일 초기화
  R2_CLASS_A_MONTHLY: 1000000,    // 매월 초기화
  R2_CLASS_B_MONTHLY: 10000000,   // 매월 초기화
  R2_STORAGE_TOTAL: 10 * 1024 * 1024 * 1024  // ⚠️ 누적 (초기화 안 됨)
};

// 허용된 사용자 (GitHub username)
// 환경 변수로 설정 가능하며, 없으면 기본값 사용
export const ALLOWED_USERS = ['1di0t']; // 기본값

// JWT 설정
export const JWT_CONFIG = {
  ALGORITHM: 'HS256',
  EXPIRES_IN: LIMITS.LOGIN_SESSION_DAYS * 24 * 60 * 60 // 30일 (초)
};

// 암호화 설정
export const CRYPTO_CONFIG = {
  ALGORITHM: 'AES-GCM',
  IV_LENGTH: 12,
  TAG_LENGTH: 16,
  KEY_LENGTH: 256
};
