/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: { center: true },
    extend: {
      colors: {
        ink: 'var(--c-ink)',
        charcoal: 'var(--c-charcoal)',
        text: 'var(--c-text)',
        muted: 'var(--c-muted)',
        line: 'var(--c-line)',
        paper: 'var(--c-paper)',
        mist: 'var(--c-mist)',
        accent: {
          DEFAULT: 'var(--c-accent)',
          ink: 'var(--c-accent-ink)',
          soft: 'var(--c-accent-soft)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        eyebrow: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.14em' }],
      },
      borderRadius: { DEFAULT: '2px', sm: '2px', md: '4px' },
      maxWidth: { site: '1360px' },
      transitionTimingFunction: { brand: 'cubic-bezier(.2,.7,.2,1)' },
    },
  },
  plugins: [],
};
