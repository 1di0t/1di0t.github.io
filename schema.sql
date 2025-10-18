-- D1 Database Schema for AutoBlog Editor
-- 사용량: 3개 테이블, 예상 < 1MB

-- 1. 사용자 테이블 (단일 사용자)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  github_id INTEGER NOT NULL UNIQUE,
  github_username TEXT NOT NULL,
  email TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. 암호화된 GitHub Token 저장
CREATE TABLE IF NOT EXISTS user_tokens (
  user_id INTEGER PRIMARY KEY,
  encrypted_token TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. 사용량 통계 (일일/월간)
CREATE TABLE IF NOT EXISTS usage_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  stat_type TEXT NOT NULL,  -- 'login', 'save', 'image_upload'
  period_type TEXT NOT NULL, -- 'daily', 'monthly'
  period TEXT NOT NULL,      -- '2025-10-19' or '2025-10'
  count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, stat_type, period_type, period)
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_usage_stats_lookup
  ON usage_stats(user_id, stat_type, period_type, period);

-- 초기 사용자 생성 (선택사항)
-- INSERT INTO users (github_id, github_username) VALUES (YOUR_GITHUB_ID, '1di0t');
