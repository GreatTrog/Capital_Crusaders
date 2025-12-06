/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './index.tsx', './App.tsx', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Nunito', 'sans-serif'], display: ['Fredoka', 'sans-serif'] },
      colors: {
        brand: { light: '#a5b4fc', DEFAULT: '#6366f1', dark: '#4338ca' },
        accent: { yellow: '#fcd34d', green: '#4ade80', red: '#f87171', blue: '#60a5fa' },
      },
      animation: {
        'bounce-short': 'bounce-short 0.5s ease-in-out 1',
        shake: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        pop: 'pop 0.3s ease-out forwards',
      },
      keyframes: {
        'bounce-short': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shake: {
          '10%,90%': { transform: 'translate3d(-1px,0,0)' },
          '20%,80%': { transform: 'translate3d(2px,0,0)' },
          '30%,50%,70%': { transform: 'translate3d(-4px,0,0)' },
          '40%,60%': { transform: 'translate3d(4px,0,0)' },
        },
        pop: { '0%': { transform: 'scale(0.8)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
      },
    },
  },
  plugins: [],
};


