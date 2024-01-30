/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'bg-mobile': "url('/quizz.png')",
        'bg-mobile-quizz': "url('/quizz-sm.png')",
      },
      keyframes: {
        home: {
          '0%, 100%': { color: '#18181b' },
          '50%': { color: '#fdf4ff' },
        },
      },
      animation: {
        home: 'home cubic-bezier(0.4, 0, 0.6, 1) 2s',
      },
    },
  },
  plugins: [],
}

// animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

// @keyframes pulse {
//   0%, 100% {
//     opacity: 1;
//   }
//   50% {
//     opacity: .5;
//   }
// }
