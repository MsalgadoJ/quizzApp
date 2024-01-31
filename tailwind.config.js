/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'bg-start-sm': "url('/start-bg-sm.png')",
        'bg-start-lg': "url('/start-bg-lg.png')",
        'bg-start-xl': "url('/start-bg-xl.png')",
        'bg-quizz-sm': "url('/quizz-bg-sm.png')",
        'bg-quizz-lg': "url('/q-bg-lg.png')",
        'bg-quizz-xl': "url('/q-bg-xl.png')",
        'bg-final-sm': "url('/f-bg-sm.png')",
        'bg-final-lg': "url('/f-bg-lg.png')",
        'bg-final-xl': "url('/f-bg-xl.png')",
      },
      keyframes: {
        score: {
          '0%, 100%': {
            transform: 'translateY(0px)',
            transform: 'scale(1)',
            color: '#18181b',
          },
          '50%': {
            transform: 'translateY(-5px)',
            color: '#059669',
            transform: 'scale(1.5)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-5px)',
          },
        },
        floatButton: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-5px)',
          },
        },
        pulseOnce: {
          '0%': {
            opacity: '0%',
          },
          '50%': {
            opacity: '50%',
          },
          '100%': {
            opacity: '100%',
          },
        },
      },
      animation: {
        score: 'score cubic-bezier(0.4, 0, 0.6, 1) 0.6s',
        float: 'float 1.7s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        floatButton: 'floatButton 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        pulseOnce: 'pulseOnce cubic-bezier(0.4, 0, 0.6, 1) 2s',
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
