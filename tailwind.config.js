/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#0EA5E9',
          600: '#3B82F6',
          700: '#06B6D4',
        },
        accent: {
          500: '#8B5CF6',
          600: '#A855F7',
        },
        success: '#10B981',
        danger: '#EF4444',
      },
    },
  },
  plugins: [],
}