/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0A0A0A",
        primary: {
          DEFAULT: "#00E5FF",
          glow: "rgba(0, 229, 255, 0.4)",
        },
        secondary: {
          DEFAULT: "#7000FF",
          glow: "rgba(112, 0, 255, 0.4)",
        },
        accent: {
          DEFAULT: "#FF007A",
          glow: "rgba(255, 0, 122, 0.4)",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px var(--tw-shadow-color), 0 0 10px var(--tw-shadow-color)' },
          '100%': { boxShadow: '0 0 20px var(--tw-shadow-color), 0 0 30px var(--tw-shadow-color)' },
        }
      }
    },
  },
  plugins: [],
}
