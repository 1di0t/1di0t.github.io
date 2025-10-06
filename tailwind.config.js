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
        // Light mode
        'bg-main': '#FDFBF7',
        'text-primary': '#1A1A1A',
        'accent-primary': '#E5774A',
        'text-secondary': '#887B74',
        'bg-subtle': '#F9F3EE',
        'border-subtle': '#EAE3DC',
        'accent-secondary': '#7E8569',
        // Dark mode
        'dark-bg-main': '#1A1A1A',
        'dark-text-primary': '#E8E6E3',
        'dark-accent-primary': '#E5774A',
        'dark-text-secondary': '#A8A8A8',
        'dark-bg-subtle': '#252525',
        'dark-border-subtle': '#3A3A3A',
      },
      fontFamily: {
        'sans': ['MaruBuri', 'ui-sans-serif', 'system-ui'],
        'mono': ['D2Coding', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
