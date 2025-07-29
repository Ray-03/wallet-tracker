/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './public/**/*.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F0FF',
          100: '#E1E1FF',
          200: '#C3C3FF',
          300: '#A5A5FF',
          400: '#8787FF',
          500: '#4B4AD2',
          600: '#3A3AB8',
          700: '#2A2A9E',
          800: '#1A1A84',
          900: '#0A0A6A',
        },
        secondary: '#F8F8F8',
        background: 'var(--color-background)',
        'background-soft': 'var(--color-background-soft)',
        'background-mute': 'var(--color-background-mute)',
        border: 'var(--color-border)',
        'border-hover': 'var(--color-border-hover)',
        heading: 'var(--color-heading)',
        text: 'var(--color-text)',
        indigo: 'var(--vt-c-indigo)',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
