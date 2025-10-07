// 검색 기능 구현 (Lunr.js)
(function() {
  let searchIndex = null;
  let searchData = null;
  let searchModal = null;
  let searchInput = null;
  let searchResults = null;

  // 검색 인덱스 초기화
  async function initializeSearch() {
    try {
      const response = await fetch('/search.json');
      searchData = await response.json();

      // Lunr.js 인덱스 생성
      searchIndex = lunr(function() {
        this.ref('url');
        this.field('title', { boost: 10 });
        this.field('category', { boost: 5 });
        this.field('subcategory', { boost: 5 });
        this.field('tags', { boost: 3 });
        this.field('excerpt', { boost: 2 });
        this.field('content');

        searchData.forEach(function(doc) {
          this.add(doc);
        }, this);
      });

      console.log('검색 인덱스 초기화 완료:', searchData.length, '개 포스트');
    } catch (error) {
      console.error('검색 인덱스 로딩 실패:', error);
    }
  }

  // 검색 수행
  function performSearch(query) {
    if (!searchIndex || !query.trim()) {
      return [];
    }

    try {
      const results = searchIndex.search(query);
      return results.map(result => {
        const post = searchData.find(p => p.url === result.ref);
        return {
          ...post,
          score: result.score
        };
      });
    } catch (error) {
      console.error('검색 오류:', error);
      return [];
    }
  }

  // 검색 결과 표시
  function displayResults(results, query) {
    if (!searchResults) return;

    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="text-center py-8 text-secondary">
          <p>"${escapeHtml(query)}"에 대한 검색 결과가 없습니다.</p>
        </div>
      `;
      return;
    }

    const resultsHtml = results.map(result => {
      const date = new Date(result.date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const categoryBadge = result.category
        ? `<span class="inline-block px-2 py-1 text-xs rounded bg-muted text-secondary mr-2">${escapeHtml(result.category)}</span>`
        : '';

      const subcategoryBadge = result.subcategory
        ? `<span class="inline-block px-2 py-1 text-xs rounded bg-muted text-secondary">${escapeHtml(result.subcategory)}</span>`
        : '';

      return `
        <a href="${result.url}" class="block p-4 border border-border rounded-lg hover:border-primary hover-warm transition-all mb-4">
          <h3 class="text-lg font-semibold mb-2">${highlightMatch(result.title, query)}</h3>
          <div class="flex items-center gap-2 text-xs text-secondary mb-2">
            ${categoryBadge}
            ${subcategoryBadge}
            <span>${date}</span>
          </div>
          <p class="text-sm text-secondary line-clamp-2">${highlightMatch(result.excerpt, query)}</p>
        </a>
      `;
    }).join('');

    searchResults.innerHTML = `
      <div class="mb-4 text-sm text-secondary">
        ${results.length}개의 검색 결과
      </div>
      ${resultsHtml}
    `;
  }

  // HTML 이스케이프
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
  }

  // 검색어 하이라이트
  function highlightMatch(text, query) {
    if (!text || !query) return escapeHtml(text);

    const escapedText = escapeHtml(text);
    const words = query.toLowerCase().split(/\s+/);
    let highlighted = escapedText;

    words.forEach(word => {
      if (word.length > 1) {
        const regex = new RegExp(`(${word})`, 'gi');
        highlighted = highlighted.replace(regex, '<mark class="bg-accent/30 text-foreground rounded px-1">$1</mark>');
      }
    });

    return highlighted;
  }

  // 모달 생성
  function createSearchModal() {
    const modal = document.createElement('div');
    modal.id = 'search-modal';
    modal.className = 'fixed inset-0 z-50 hidden';
    modal.innerHTML = `
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" id="search-overlay"></div>
      <div class="absolute top-0 left-0 right-0 max-w-3xl mx-auto mt-20 bg-background border border-border rounded-lg shadow-2xl overflow-hidden">
        <div class="p-4 border-b border-border">
          <div class="flex items-center gap-3">
            <svg class="h-5 w-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              type="text"
              id="search-input"
              placeholder="검색어를 입력하세요..."
              class="flex-1 bg-transparent outline-none text-lg"
              autocomplete="off"
            />
            <button id="search-close" class="p-2 hover:bg-muted rounded-md transition-colors">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        <div id="search-results" class="max-h-[60vh] overflow-y-auto p-4">
          <div class="text-center py-8 text-secondary">
            <p>검색어를 입력해주세요.</p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    return modal;
  }

  // 모달 열기
  function openSearchModal() {
    if (!searchModal) {
      searchModal = createSearchModal();
      searchInput = document.getElementById('search-input');
      searchResults = document.getElementById('search-results');

      // 이벤트 리스너
      document.getElementById('search-close').addEventListener('click', closeSearchModal);
      document.getElementById('search-overlay').addEventListener('click', closeSearchModal);

      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query.length >= 2) {
          const results = performSearch(query);
          displayResults(results, query);
        } else {
          searchResults.innerHTML = `
            <div class="text-center py-8 text-secondary">
              <p>검색어를 입력해주세요.</p>
            </div>
          `;
        }
      });

      // ESC 키로 닫기
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !searchModal.classList.contains('hidden')) {
          closeSearchModal();
        }
      });
    }

    searchModal.classList.remove('hidden');
    searchInput.focus();
    searchInput.value = '';
    searchResults.innerHTML = `
      <div class="text-center py-8 text-secondary">
        <p>검색어를 입력해주세요.</p>
      </div>
    `;

    // 검색 인덱스가 없으면 초기화
    if (!searchIndex) {
      initializeSearch();
    }
  }

  // 모달 닫기
  function closeSearchModal() {
    if (searchModal) {
      searchModal.classList.add('hidden');
    }
  }

  // 초기화
  document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
      searchButton.addEventListener('click', openSearchModal);
    }

    // 단축키 (Ctrl/Cmd + K)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
      }
    });
  });
})();
