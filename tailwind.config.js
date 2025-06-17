/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores Autênticas Jéssica Santos
        'js-rose': {
          DEFAULT: '#E8B4A0',
          light: '#F2C4B3',
          dark: '#D49A85',
        },
        'js-beige': {
          DEFAULT: '#F5F1EB',
          light: '#FAF7F2',
          dark: '#E8E0D6',
        },
        'js-green': {
          DEFAULT: '#A8C4A2',
          light: '#B8D1B3',
          dark: '#8FB089',
        },
        'js-brown': {
          DEFAULT: '#8B6F47',
          light: '#A08660',
          dark: '#6D5535',
        },
        'js-neutral': {
          50: '#FDFCFA',
          100: '#F7F5F2',
          200: '#E8E4DF',
          300: '#D1C7BD',
          400: '#A69B8E',
          500: '#7A6F63',
          600: '#5D5349',
          700: '#453E36',
          800: '#2D2823',
          900: '#1A1714',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'premium': '0 4px 6px -1px rgba(232, 180, 160, 0.1), 0 2px 4px -1px rgba(232, 180, 160, 0.06), 0 0 0 1px rgba(245, 241, 235, 0.05)',
        'premium-lg': '0 20px 25px -5px rgba(232, 180, 160, 0.1), 0 10px 10px -5px rgba(232, 180, 160, 0.04), 0 0 0 1px rgba(245, 241, 235, 0.05)',
        'soft': '0 1px 3px 0 rgba(139, 111, 71, 0.1), 0 1px 2px 0 rgba(139, 111, 71, 0.06)',
        'soft-lg': '0 10px 15px -3px rgba(139, 111, 71, 0.1), 0 4px 6px -2px rgba(139, 111, 71, 0.05)',
      },
      backgroundImage: {
        'gradient-rose': 'linear-gradient(135deg, #F2C4B3 0%, #E8B4A0 100%)',
        'gradient-warm': 'linear-gradient(135deg, #F5F1EB 0%, #F2C4B3 100%)',
        'gradient-natural': 'linear-gradient(135deg, #B8D1B3 0%, #F5F1EB 100%)',
        'gradient-earth': 'linear-gradient(135deg, #A08660 0%, #E8B4A0 100%)',
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'pulse-soft': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.8',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}

