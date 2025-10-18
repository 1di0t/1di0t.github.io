// AutoBlog Editor - Main Application

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const editorScreen = document.getElementById('editor-screen');
const titleInput = document.getElementById('post-title');
const markdownInput = document.getElementById('markdown-input');
const markdownPreview = document.getElementById('markdown-preview');
const saveBtn = document.getElementById('save-btn');
const uploadImageBtn = document.getElementById('upload-image-btn');
const logoutBtn = document.getElementById('logout-btn');
const settingsBtn = document.getElementById('settings-btn');
const statsBtn = document.getElementById('stats-btn');

// Modals
const imageModal = document.getElementById('image-modal');
const settingsModal = document.getElementById('settings-modal');
const statsModal = document.getElementById('stats-modal');

// Initialize
checkAuth();

// Check if user is logged in
async function checkAuth() {
  // Check if session cookie exists
  const hasCookie = document.cookie.includes('session=');

  if (hasCookie) {
    showEditorScreen();
  } else {
    showLoginScreen();
  }
}

function showLoginScreen() {
  loginScreen.classList.remove('hidden');
  editorScreen.classList.add('hidden');
}

function showEditorScreen() {
  loginScreen.classList.add('hidden');
  editorScreen.classList.remove('hidden');

  // Check if GitHub token is set
  checkGitHubToken();
}

async function checkGitHubToken() {
  try {
    const response = await fetch('/api/usage-stats');
    if (response.status === 400) {
      const data = await response.json();
      if (data.error && data.error.includes('Token')) {
        // Token not set, show settings modal
        showModal(settingsModal);
      }
    }
  } catch (error) {
    console.error('Token check failed:', error);
  }
}

// Markdown Preview (real-time)
markdownInput.addEventListener('input', () => {
  const markdown = markdownInput.value;
  markdownPreview.innerHTML = marked.parse(markdown);
});

// Save Draft
saveBtn.addEventListener('click', async () => {
  const title = titleInput.value.trim();
  const content = markdownInput.value.trim();

  if (!title || !content) {
    alert('제목과 내용을 입력하세요.');
    return;
  }

  saveBtn.disabled = true;
  saveBtn.textContent = '저장 중...';

  try {
    const response = await fetch('/api/save-draft', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });

    const data = await response.json();

    if (response.ok) {
      alert(`저장 완료!\n\nGitHub: ${data.filename}`);

      // Clear form
      titleInput.value = '';
      markdownInput.value = '';
      markdownPreview.innerHTML = '';
    } else {
      alert(`저장 실패: ${data.error}`);
    }
  } catch (error) {
    alert(`오류: ${error.message}`);
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = '💾 저장';
  }
});

// Upload Image
uploadImageBtn.addEventListener('click', () => {
  showModal(imageModal);
});

document.getElementById('image-upload-btn').addEventListener('click', async () => {
  const fileInput = document.getElementById('image-file');
  const file = fileInput.files[0];

  if (!file) {
    alert('이미지 파일을 선택하세요.');
    return;
  }

  const progress = document.getElementById('image-progress');
  progress.classList.remove('hidden');

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      // Insert markdown image syntax
      const imageMarkdown = `![${file.name}](${data.url})`;
      insertAtCursor(markdownInput, imageMarkdown);

      hideModal(imageModal);
      alert('이미지 업로드 완료!');
    } else {
      alert(`업로드 실패: ${data.error}`);
    }
  } catch (error) {
    alert(`오류: ${error.message}`);
  } finally {
    progress.classList.add('hidden');
    fileInput.value = '';
  }
});

document.getElementById('image-cancel-btn').addEventListener('click', () => {
  hideModal(imageModal);
});

// Settings (GitHub Token)
settingsBtn.addEventListener('click', () => {
  showModal(settingsModal);
});

document.getElementById('save-token-btn').addEventListener('click', async () => {
  const token = document.getElementById('github-token').value.trim();
  const message = document.getElementById('token-message');

  if (!token || !token.startsWith('ghp_')) {
    message.textContent = '올바른 GitHub Personal Access Token을 입력하세요.';
    message.style.color = 'red';
    return;
  }

  message.textContent = '저장 중...';
  message.style.color = 'blue';

  try {
    const response = await fetch('/api/save-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });

    const data = await response.json();

    if (response.ok) {
      message.textContent = '✅ Token이 안전하게 저장되었습니다.';
      message.style.color = 'green';

      setTimeout(() => {
        hideModal(settingsModal);
        document.getElementById('github-token').value = '';
        message.textContent = '';
      }, 2000);
    } else {
      message.textContent = `❌ 저장 실패: ${data.error}`;
      message.style.color = 'red';
    }
  } catch (error) {
    message.textContent = `❌ 오류: ${error.message}`;
    message.style.color = 'red';
  }
});

document.getElementById('settings-cancel-btn').addEventListener('click', () => {
  hideModal(settingsModal);
});

// Usage Stats
statsBtn.addEventListener('click', async () => {
  showModal(statsModal);

  const statsContent = document.getElementById('stats-content');
  statsContent.innerHTML = '로딩 중...';

  try {
    const response = await fetch('/api/usage-stats');
    const data = await response.json();

    if (response.ok) {
      statsContent.innerHTML = renderStats(data);
    } else {
      statsContent.innerHTML = `<p style="color: red;">오류: ${data.error}</p>`;
    }
  } catch (error) {
    statsContent.innerHTML = `<p style="color: red;">오류: ${error.message}</p>`;
  }
});

document.getElementById('stats-close-btn').addEventListener('click', () => {
  hideModal(statsModal);
});

// Logout
logoutBtn.addEventListener('click', async () => {
  if (!confirm('로그아웃하시겠습니까?')) return;

  await fetch('/auth/logout', { method: 'POST' });
  window.location.href = '/';
});

// Helper Functions
function showModal(modal) {
  modal.classList.remove('hidden');
}

function hideModal(modal) {
  modal.classList.add('hidden');
}

function insertAtCursor(textarea, text) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;

  textarea.value = value.substring(0, start) + text + value.substring(end);
  textarea.selectionStart = textarea.selectionEnd = start + text.length;
  textarea.focus();

  // Trigger preview update
  markdownInput.dispatchEvent(new Event('input'));
}

function renderStats(data) {
  return `
    <div class="stats-section">
      <h3>오늘의 사용량 (${data.daily.date})</h3>
      ${renderProgressBar('로그인', data.daily.logins, data.daily.limits.logins)}
      ${renderProgressBar('저장', data.daily.saves, data.daily.limits.saves)}
      ${renderProgressBar('이미지 (일)', data.daily.images, data.daily.limits.images)}
      ${renderProgressBar('총 요청', data.daily.total_requests, data.daily.limits.total_requests)}
    </div>

    <div class="stats-section">
      <h3>이번 달 사용량 (${data.monthly.month})</h3>
      ${renderProgressBar('이미지', data.monthly.images, data.monthly.limits.images)}
    </div>

    <div class="stats-section">
      <h3>R2 저장소 (누적)</h3>
      ${renderProgressBar('사용량', `${data.r2.sizeGB}GB`, `${data.r2.limitGB}GB`, data.r2.percentage)}
      ${data.r2.warning ? '<p style="color: orange;">⚠️ 저장소 사용량이 80%를 넘었습니다.</p>' : '<p style="color: green;">✅ 안전</p>'}
    </div>
  `;
}

function renderProgressBar(label, current, max, percentage) {
  const pct = percentage || (parseInt(current) / parseInt(max) * 100);
  const color = pct > 80 ? 'red' : pct > 50 ? 'orange' : 'green';

  return `
    <div class="stat-item">
      <label>${label}</label>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${pct}%; background: ${color};">
          <span>${current} / ${max}</span>
        </div>
      </div>
    </div>
  `;
}
