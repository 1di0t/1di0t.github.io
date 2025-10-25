// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const themeIconSun = document.getElementById('theme-icon-sun');
  const themeIconMoon = document.getElementById('theme-icon-moon');
  const html = document.documentElement;

  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';

  if (currentTheme === 'dark') {
    html.classList.add('dark');
    document.body.classList.add('dark');
    if (themeIconSun) themeIconSun.classList.remove('hidden');
    if (themeIconMoon) themeIconMoon.classList.add('hidden');
  }

  // Function to update utterances theme
  function updateUtterancesTheme(theme) {
    const iframe = document.querySelector('iframe.utterances-frame');
    if (iframe) {
      const utterancesTheme = theme === 'dark' ? 'github-dark' : 'github-light';
      iframe.contentWindow.postMessage(
        { type: 'set-theme', theme: utterancesTheme },
        'https://utteranc.es'
      );
    }
  }

  // Initialize utterances theme on load
  function initUtterancesTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const checkIframe = setInterval(() => {
      const iframe = document.querySelector('iframe.utterances-frame');
      if (iframe) {
        clearInterval(checkIframe);
        // Wait for iframe to be fully loaded
        setTimeout(() => {
          updateUtterancesTheme(currentTheme);
        }, 500);
      }
    }, 100);

    // Clear interval after 10 seconds if iframe not found
    setTimeout(() => clearInterval(checkIframe), 10000);
  }

  // Call init function if on a page with comments
  if (document.querySelector('script[src*="utteranc.es"]')) {
    initUtterancesTheme();
  }

  // Toggle dark mode
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      html.classList.toggle('dark');
      document.body.classList.toggle('dark');

      if (html.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        if (themeIconSun) themeIconSun.classList.remove('hidden');
        if (themeIconMoon) themeIconMoon.classList.add('hidden');
        updateUtterancesTheme('dark');
      } else {
        localStorage.setItem('theme', 'light');
        if (themeIconSun) themeIconSun.classList.add('hidden');
        if (themeIconMoon) themeIconMoon.classList.remove('hidden');
        updateUtterancesTheme('light');
      }
    });
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
  const sidebar = document.querySelector('.sidebar-width');

  // Function to open sidebar
  function openSidebar() {
    sidebar.classList.remove('-translate-x-full');
    sidebar.classList.add('translate-x-0');
  }

  // Function to close sidebar
  function closeSidebar() {
    sidebar.classList.remove('translate-x-0');
    sidebar.classList.add('-translate-x-full');
  }

  if (mobileMenuBtn && sidebar) {
    // Open sidebar on hamburger button click
    mobileMenuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      openSidebar();
    });

    // Close sidebar on close button click
    if (sidebarCloseBtn) {
      sidebarCloseBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeSidebar();
      });
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideSidebar = sidebar.contains(event.target);
      const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);

      if (!isClickInsideSidebar && !isClickOnMenuBtn && sidebar.classList.contains('translate-x-0')) {
        closeSidebar();
      }
    });

    // Swipe to close sidebar
    let touchStartX = 0;
    let touchEndX = 0;

    sidebar.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sidebar.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      // If swiped left more than 50px, close sidebar
      if (swipeDistance < -50 && sidebar.classList.contains('translate-x-0')) {
        closeSidebar();
      }
    }
  }

  // Font Size Toggle (Mobile Only)
  const fontSizeToggle = document.getElementById('font-size-toggle');
  if (fontSizeToggle) {
    const fontSizes = ['font-small', 'font-medium', 'font-large', 'font-xlarge'];
    let currentSizeIndex = parseInt(localStorage.getItem('fontSizeIndex')) || 1; // Default to medium

    // Apply saved font size
    document.body.classList.remove(...fontSizes);
    document.body.classList.add(fontSizes[currentSizeIndex]);

    fontSizeToggle.addEventListener('click', function() {
      // Remove current font size class
      document.body.classList.remove(fontSizes[currentSizeIndex]);

      // Cycle to next size
      currentSizeIndex = (currentSizeIndex + 1) % fontSizes.length;

      // Apply new font size
      document.body.classList.add(fontSizes[currentSizeIndex]);

      // Save to localStorage
      localStorage.setItem('fontSizeIndex', currentSizeIndex);

      // Visual feedback
      const sizeNames = ['작게', '보통', '크게', '매우 크게'];
      const tooltip = document.createElement('div');
      tooltip.textContent = `폰트: ${sizeNames[currentSizeIndex]}`;
      tooltip.className = 'fixed top-20 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity';
      document.body.appendChild(tooltip);

      setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => tooltip.remove(), 300);
      }, 1500);
    });
  }

  // Generate Table of Contents
  const tocContent = document.getElementById('toc-content');
  if (tocContent) {
    const headings = document.querySelectorAll('.prose h2, .prose h3, .prose h4');

    if (headings.length > 0) {
      const tocList = document.createElement('ul');
      tocList.className = 'space-y-2';

      headings.forEach((heading, index) => {
        // Add ID to heading if it doesn't have one
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${heading.id}`;
        a.textContent = heading.textContent;
        a.className = 'block hover:text-accent-primary transition-colors';

        // Indent based on heading level
        const level = parseInt(heading.tagName.substring(1));
        li.style.marginLeft = `${(level - 2) * 1}rem`;

        li.appendChild(a);
        tocList.appendChild(li);
      });

      tocContent.appendChild(tocList);

      // Smooth scroll to section
      tocContent.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    } else {
      // Hide TOC if no headings
      const tocElement = tocContent.closest('.toc');
      if (tocElement) {
        tocElement.style.display = 'none';
      }
    }
  }

  // Code Copy Button
  const codeBlocks = document.querySelectorAll('.highlighter-rouge');

  codeBlocks.forEach((codeBlock) => {
    // Skip if copy button already exists
    if (codeBlock.querySelector('.copy-code-button')) {
      return;
    }

    // Find the highlight element
    const highlightElement = codeBlock.querySelector('.highlight');
    if (!highlightElement) return;

    // Create copy button with icon
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-button';

    // Create icon and text
    const copyIcon = `
      <svg class="h-4 w-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
      </svg>
    `;
    const checkIcon = `
      <svg class="h-4 w-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
    `;

    copyButton.innerHTML = copyIcon + '<span>복사</span>';

    copyButton.addEventListener('click', async () => {
      const code = highlightElement.querySelector('pre').textContent;

      try {
        await navigator.clipboard.writeText(code);
        copyButton.innerHTML = checkIcon + '<span>복사됨!</span>';
        copyButton.classList.add('copied');

        setTimeout(() => {
          copyButton.innerHTML = copyIcon + '<span>복사</span>';
          copyButton.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
        copyButton.innerHTML = copyIcon + '<span>복사 실패</span>';

        setTimeout(() => {
          copyButton.innerHTML = copyIcon + '<span>복사</span>';
        }, 2000);
      }
    });

    // Append to the highlighter-rouge container
    codeBlock.appendChild(copyButton);
  });

  // Add line numbers to code blocks (if not already present)
  document.querySelectorAll('.highlight pre code').forEach((block) => {
    if (!block.classList.contains('has-line-numbers')) {
      const lines = block.textContent.split('\n');
      const lineNumbersWrapper = document.createElement('span');
      lineNumbersWrapper.className = 'line-numbers-rows';

      lines.forEach(() => {
        const lineNumber = document.createElement('span');
        lineNumbersWrapper.appendChild(lineNumber);
      });

      block.appendChild(lineNumbersWrapper);
      block.classList.add('has-line-numbers');
    }
  });

  // Reading progress bar (optional)
  const article = document.querySelector('article.post');
  if (article) {
    const progressBar = document.createElement('div');
    progressBar.className = 'fixed top-0 left-0 w-full h-1 bg-accent-primary z-50 transform origin-left scale-x-0 transition-transform';
    progressBar.id = 'reading-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = scrolled / documentHeight;

      progressBar.style.transform = `scaleX(${progress})`;
    });
  }
});

// 🎬 2025 Scroll Animations - Intersection Observer for Reveal Effects
document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer for scroll reveal animations
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Apply reveal animation to elements with 'reveal' class
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach((el, index) => {
    // Initial state
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    revealObserver.observe(el);
  });

  // Parallax effect for hero sections (exclude sidebar)
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroElements = document.querySelectorAll('.glass-strong:not(.sidebar-width)');

    heroElements.forEach(hero => {
      const rect = hero.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    });
  });

  // Add smooth scale animation to cards on scroll
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'scale(1)';
      }
    });
  }, {
    threshold: 0.2
  });

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.95)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardObserver.observe(card);
  });

  // Enhanced theme toggle with smooth transition
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      // Add ripple effect on click
      const ripple = document.createElement('span');
      ripple.className = 'absolute inset-0 rounded-xl';
      ripple.style.background = 'radial-gradient(circle, rgba(217, 119, 87, 0.3) 0%, transparent 70%)';
      ripple.style.animation = 'ripple 0.6s ease-out';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  }

  // Add CSS for ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      from {
        transform: scale(0);
        opacity: 1;
      }
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});

// Image lazy loading enhancement
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src || img.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/lazysizes@5.3.2/lazysizes.min.js';
  script.integrity = 'sha384-3gT/vsepWkfz/ff7PpWNUeMzeWoH3cDhm/A8jM7ouoAK0/fP/9bcHHR5kHq2nf+e';
  script.crossOrigin = 'anonymous';
  document.body.appendChild(script);
}
