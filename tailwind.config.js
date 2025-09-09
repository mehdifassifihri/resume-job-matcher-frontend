/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          50: '#F3F0FF',
          100: '#E5DBFF',
          200: '#D1BFFF',
          300: '#B794FF',
          400: '#9F7AEA',
          500: 'var(--color-primary)',
          600: '#6B21A8',
          700: '#581C87',
          800: '#3B0764',
          900: '#2E1065',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: 'var(--color-accent)',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
        },
        neutral: {
          bg: 'var(--color-background)',
          surface: 'var(--color-surface)',
          'surface-alt': 'var(--color-surface-alt)',
          border: 'var(--color-border)',
          'text-primary': 'var(--color-text-primary)',
          'text-secondary': 'var(--color-text-secondary)',
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        info: 'var(--color-info)',
      },
      backgroundColor: {
        'theme-bg': 'var(--color-background)',
        'theme-surface': 'var(--color-surface)',
        'theme-surface-alt': 'var(--color-surface-alt)',
      },
      textColor: {
        'theme-primary': 'var(--color-text-primary)',
        'theme-secondary': 'var(--color-text-secondary)',
      },
      borderColor: {
        'theme-border': 'var(--color-border)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
        poppins: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'theme-transition': 'themeTransition 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        themeTransition: {
          '0%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}