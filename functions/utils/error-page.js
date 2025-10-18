// 사용자 친화적인 에러 페이지 생성

/**
 * 에러 페이지 HTML 생성
 * @param {Object} options - 에러 정보
 * @param {number} options.status - HTTP 상태 코드
 * @param {string} options.title - 에러 제목
 * @param {string} options.message - 에러 메시지
 * @param {string} options.details - 상세 정보 (선택)
 * @param {Array} options.solutions - 해결 방법 목록 (선택)
 * @param {string} options.backUrl - 돌아갈 URL (기본: /editor)
 */
export function createErrorPage({
  status = 500,
  title = '오류 발생',
  message = '예상치 못한 오류가 발생했습니다.',
  details = null,
  solutions = [],
  backUrl = '/editor'
}) {
  const solutionsHtml = solutions.length > 0
    ? `
      <div class="solutions">
        <h3>💡 해결 방법</h3>
        <ul>
          ${solutions.map(s => `<li>${s}</li>`).join('\n')}
        </ul>
      </div>
    `
    : '';

  const detailsHtml = details
    ? `
      <details class="error-details">
        <summary>기술 정보 (개발자용)</summary>
        <pre>${details}</pre>
      </details>
    `
    : '';

  return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${status} - ${title}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                       "Helvetica Neue", Arial, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .error-container {
          background: white;
          border-radius: 16px;
          padding: 40px;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.4s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .error-icon {
          font-size: 64px;
          text-align: center;
          margin-bottom: 20px;
        }

        .error-status {
          font-size: 24px;
          font-weight: 700;
          color: #dc3545;
          text-align: center;
          margin-bottom: 10px;
        }

        .error-title {
          font-size: 28px;
          font-weight: 700;
          color: #2d3748;
          text-align: center;
          margin-bottom: 20px;
        }

        .error-message {
          font-size: 16px;
          color: #4a5568;
          line-height: 1.6;
          text-align: center;
          margin-bottom: 30px;
        }

        .solutions {
          background: #f7fafc;
          border-left: 4px solid #4299e1;
          padding: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
        }

        .solutions h3 {
          font-size: 18px;
          color: #2d3748;
          margin-bottom: 15px;
        }

        .solutions ul {
          list-style: none;
          padding: 0;
        }

        .solutions li {
          font-size: 14px;
          color: #4a5568;
          line-height: 1.8;
          padding-left: 24px;
          position: relative;
          margin-bottom: 10px;
        }

        .solutions li:before {
          content: "→";
          position: absolute;
          left: 0;
          color: #4299e1;
          font-weight: bold;
        }

        .error-details {
          background: #2d3748;
          color: #e2e8f0;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 13px;
        }

        .error-details summary {
          cursor: pointer;
          font-weight: 600;
          margin-bottom: 10px;
          user-select: none;
        }

        .error-details summary:hover {
          color: #a0aec0;
        }

        .error-details pre {
          white-space: pre-wrap;
          word-break: break-word;
          margin-top: 10px;
          font-family: 'Courier New', monospace;
          font-size: 12px;
        }

        .actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: all 0.2s;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .btn-secondary {
          background: #e2e8f0;
          color: #2d3748;
        }

        .btn-secondary:hover {
          background: #cbd5e0;
        }

        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 14px;
          color: #718096;
        }

        .footer a {
          color: #4299e1;
          text-decoration: none;
        }

        .footer a:hover {
          text-decoration: underline;
        }

        @media (max-width: 600px) {
          .error-container {
            padding: 30px 20px;
          }

          .error-title {
            font-size: 24px;
          }

          .error-message {
            font-size: 14px;
          }
        }
      </style>
    </head>
    <body>
      <div class="error-container">
        <div class="error-icon">${getErrorIcon(status)}</div>
        <div class="error-status">HTTP ${status}</div>
        <h1 class="error-title">${title}</h1>
        <p class="error-message">${message}</p>

        ${solutionsHtml}
        ${detailsHtml}

        <div class="actions">
          <a href="${backUrl}" class="btn btn-primary">🏠 홈으로</a>
          <button onclick="history.back()" class="btn btn-secondary">← 뒤로 가기</button>
        </div>

        <div class="footer">
          문제가 계속되면
          <a href="https://github.com/1di0t/1di0t.github.io/issues" target="_blank">
            이슈 제보
          </a>
          해주세요
        </div>
      </div>

      <script>
        console.error('Error ${status}:', '${title}');
        ${details ? `console.error('Details:', \`${details}\`);` : ''}
      </script>
    </body>
    </html>
  `;
}

/**
 * 상태 코드별 아이콘
 */
function getErrorIcon(status) {
  const icons = {
    400: '⚠️',
    401: '🔒',
    403: '🚫',
    404: '🔍',
    429: '⏱️',
    500: '💥',
    503: '🔧'
  };
  return icons[status] || '❌';
}

/**
 * 일반적인 에러 응답 생성
 */
export function createErrorResponse(options) {
  const html = createErrorPage(options);
  return new Response(html, {
    status: options.status || 500,
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  });
}
