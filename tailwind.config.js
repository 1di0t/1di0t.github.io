/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_layouts/**/*.html',
    './_includes/**/*.html',
    './_posts/**/*.{md,html}',
    './_pages/**/*.{md,html}',
    './index.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode - Enhanced warm orange-focused palette from technical-blog
        'bg-main': '#fffbf5',
        'text-primary': '#2d2520',
        'accent-primary': '#ff6b35',
        'text-secondary': '#8b7355',
        'bg-subtle': '#fff4e6',
        'border-subtle': '#f4d9c6',
        'accent-secondary': '#d4a574',
        // Dark mode - Neutral dark background with orange accent
        'dark-bg-main': '#0f1419',
        'dark-text-primary': '#e6edf3',
        'dark-accent-primary': '#ff8c5a',
        'dark-text-secondary': '#8b949e',
        'dark-bg-subtle': '#1c2128',
        'dark-border-subtle': '#30363d',
        'dark-accent-secondary': '#3fb950',
      },
      fontFamily: {
        'sans': ['MaruBuri', 'ui-sans-serif', 'system-ui'],
        'mono': ['D2Coding', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        'lg': '0.5rem',
        'md': 'calc(0.5rem - 2px)',
        'sm': 'calc(0.5rem - 4px)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
