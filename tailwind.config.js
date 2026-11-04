/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: { center: true },
    extend: {
      colors: {
        ink: 'rgb(var(--c-ink-rgb) / <alpha-value>)',
        charcoal: 'rgb(var(--c-charcoal-rgb) / <alpha-value>)',
        text: 'rgb(var(--c-text-rgb) / <alpha-value>)',
        muted: 'rgb(var(--c-muted-rgb) / <alpha-value>)',
        line: 'rgb(var(--c-line-rgb) / <alpha-value>)',
        paper: 'rgb(var(--c-paper-rgb) / <alpha-value>)',
        mist: 'rgb(var(--c-mist-rgb) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--c-accent-rgb) / <alpha-value>)',
          ink: 'rgb(var(--c-accent-ink-rgb) / <alpha-value>)',
          soft: 'rgb(var(--c-accent-soft-rgb) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['"Figtree Variable"', 'Figtree', 'system-ui', 'sans-serif'],
        display: ['"Figtree Variable"', 'Figtree', 'system-ui', 'sans-serif'],
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
