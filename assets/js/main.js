// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const themeToggleIcon = document.getElementById('theme-toggle-icon');
  const themeToggleText = document.getElementById('theme-toggle-text');
  const html = document.documentElement;

  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';

  if (currentTheme === 'dark') {
    html.classList.add('dark');
    themeToggleIcon.textContent = '☀️';
    themeToggleText.textContent = '라이트모드';
  }

  // Toggle dark mode
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      html.classList.toggle('dark');

      if (html.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        themeToggleIcon.textContent = '☀️';
        themeToggleText.textContent = '라이트모드';
      } else {
        localStorage.setItem('theme', 'light');
        themeToggleIcon.textContent = '🌙';
        themeToggleText.textContent = '다크모드';
      }
    });
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');

  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', function() {
      sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideSidebar = sidebar.contains(event.target);
      const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);

      if (!isClickInsideSidebar && !isClickOnMenuBtn && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
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
  const codeBlocks = document.querySelectorAll('.highlight');

  codeBlocks.forEach((codeBlock) => {
    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);

    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-button';
    copyButton.textContent = '복사';

    copyButton.addEventListener('click', async () => {
      const code = codeBlock.querySelector('pre').textContent;

      try {
        await navigator.clipboard.writeText(code);
        copyButton.textContent = '✓ 복사됨!';
        copyButton.classList.add('bg-green-500');

        setTimeout(() => {
          copyButton.textContent = '복사';
          copyButton.classList.remove('bg-green-500');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
        copyButton.textContent = '복사 실패';

        setTimeout(() => {
          copyButton.textContent = '복사';
        }, 2000);
      }
    });

    wrapper.appendChild(copyButton);
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
  document.body.appendChild(script);
}
