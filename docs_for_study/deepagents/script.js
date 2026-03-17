/**
 * Deep Agents 인터랙티브 문서 — 스크립트
 */

(function () {
  'use strict';

  // ========== Mermaid 초기화 ==========
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  mermaid.initialize({
    startOnLoad: true,
    theme: currentTheme === 'dark' ? 'dark' : 'default',
    themeVariables: currentTheme === 'dark'
      ? { primaryColor: '#4263eb', primaryTextColor: '#c0caf5', lineColor: '#565f89', background: '#24283b' }
      : { primaryColor: '#4263eb', primaryTextColor: '#212529', lineColor: '#adb5bd' },
    flowchart: { curve: 'basis', padding: 20, useMaxWidth: false },
    sequence: { mirrorActors: false },
    securityLevel: 'loose',
  });

  // ========== 테마 토글 ==========
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('da-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('da-theme', next);
    updateThemeIcon(next);
    rerenderMermaid(next);
  });

  function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  function rerenderMermaid(theme) {
    mermaid.initialize({
      startOnLoad: false,
      theme: theme === 'dark' ? 'dark' : 'default',
      themeVariables: theme === 'dark'
        ? { primaryColor: '#4263eb', primaryTextColor: '#c0caf5', lineColor: '#565f89', background: '#24283b' }
        : { primaryColor: '#4263eb', primaryTextColor: '#212529', lineColor: '#adb5bd' },
      flowchart: { curve: 'basis', padding: 20, useMaxWidth: false },
      sequence: { mirrorActors: false },
      securityLevel: 'loose',
    });

    document.querySelectorAll('.mermaid').forEach((el, i) => {
      const code = el.getAttribute('data-original') || el.textContent;
      if (!el.getAttribute('data-original')) {
        el.setAttribute('data-original', code);
      }
      el.removeAttribute('data-processed');
      el.innerHTML = code;
    });

    mermaid.run();
  }

  // ========== 모바일 사이드바 ==========
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const mobileBtn = document.getElementById('mobileMenuBtn');

  mobileBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', closeSidebar);

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  }

  // 사이드바 링크 클릭 시 모바일에서 닫기
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) closeSidebar();
    });
  });

  // ========== IntersectionObserver: 섹션 가시성 애니메이션 ==========
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.section, .fade-in-up').forEach((el) => {
    sectionObserver.observe(el);
  });

  // ========== IntersectionObserver: 사이드바 현재 섹션 하이라이트 ==========
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const sections = [];

  navLinks.forEach((link) => {
    const id = link.getAttribute('data-section');
    const section = document.getElementById(id);
    if (section) sections.push({ id, el: section });
  });

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    },
    { threshold: 0.15, rootMargin: '-80px 0px -60% 0px' }
  );

  sections.forEach(({ el }) => navObserver.observe(el));

  function setActiveNav(id) {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('data-section') === id);
    });
  }

  // ========== 탭 시스템 ==========
  document.querySelectorAll('.tabs').forEach((tabContainer) => {
    const buttons = tabContainer.querySelectorAll('.tab-btn');
    const panels = tabContainer.querySelectorAll('.tab-panel');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');

        buttons.forEach((b) => b.classList.remove('active'));
        panels.forEach((p) => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPanel = tabContainer.querySelector(`[data-tab-panel="${target}"]`);
        if (targetPanel) targetPanel.classList.add('active');
      });
    });
  });

  // ========== 검색 ==========
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  let searchIndex = [];

  // 인덱스 빌드 (섹션별 텍스트)
  function buildSearchIndex() {
    const allSections = document.querySelectorAll('.section, .hero');
    allSections.forEach((section) => {
      const heading = section.querySelector('h2, h1');
      const title = heading ? heading.textContent.trim() : '';
      const text = section.textContent.trim();
      const id = section.id;

      if (id && title) {
        searchIndex.push({ id, title, text });
      }
    });
  }

  buildSearchIndex();

  let searchTimeout;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => performSearch(searchInput.value.trim()), 200);
  });

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim().length >= 2) {
      performSearch(searchInput.value.trim());
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      searchResults.classList.remove('active');
    }
  });

  // Ctrl+K 단축키
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === 'Escape') {
      searchResults.classList.remove('active');
      searchInput.blur();
    }
  });

  function performSearch(query) {
    if (query.length < 2) {
      searchResults.classList.remove('active');
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = searchIndex
      .map((item) => {
        const textLower = item.text.toLowerCase();
        const idx = textLower.indexOf(lowerQuery);
        if (idx === -1) return null;

        // 매칭 주변 컨텍스트 추출
        const start = Math.max(0, idx - 30);
        const end = Math.min(item.text.length, idx + query.length + 50);
        let context = item.text.substring(start, end).replace(/\s+/g, ' ').trim();
        if (start > 0) context = '...' + context;
        if (end < item.text.length) context += '...';

        // 매칭 하이라이트
        const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
        context = context.replace(regex, '<mark>$1</mark>');

        return { ...item, context, position: idx };
      })
      .filter(Boolean)
      .sort((a, b) => a.position - b.position)
      .slice(0, 8);

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-result-item"><div class="search-result-title">검색 결과 없음</div></div>';
    } else {
      searchResults.innerHTML = results
        .map(
          (r) => `
        <div class="search-result-item" data-target="${r.id}">
          <div class="search-result-title">${r.title}</div>
          <div class="search-result-context">${r.context}</div>
        </div>`
        )
        .join('');
    }

    searchResults.classList.add('active');

    // 결과 클릭 → 해당 섹션 스크롤
    searchResults.querySelectorAll('.search-result-item[data-target]').forEach((item) => {
      item.addEventListener('click', () => {
        const target = document.getElementById(item.getAttribute('data-target'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          searchResults.classList.remove('active');
          searchInput.value = '';
        }
      });
    });
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // ========== Back to Top 버튼 ==========
  const backToTop = document.getElementById('backToTop');

  window.addEventListener(
    'scroll',
    () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    },
    { passive: true }
  );

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ========== Details 애니메이션 보정 ==========
  document.querySelectorAll('details').forEach((detail) => {
    const content = detail.querySelector('.details-content');
    if (!content) return;

    detail.addEventListener('toggle', () => {
      if (detail.open) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(-8px)';
        requestAnimationFrame(() => {
          content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          content.style.opacity = '1';
          content.style.transform = 'translateY(0)';
        });
      }
    });
  });

  // ========== Mermaid 원본 저장 (다크/라이트 전환용) ==========
  window.addEventListener('load', () => {
    document.querySelectorAll('.mermaid[data-processed]').forEach((el) => {
      if (!el.getAttribute('data-original')) {
        // 이미 렌더링된 경우 원본을 저장할 수 없으므로 skip
      }
    });
  });
})();
