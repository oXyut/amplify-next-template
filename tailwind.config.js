/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        status: {
          success: {
            light: '#22c55e',  // green-500
            dark: '#4ade80',   // green-400
          },
          danger: {
            light: '#ef4444',  // red-500
            dark: '#f87171',   // red-400
          }
        },
        priority: {
          critical: {
            border: '#ef4444', // red-500
            bg: '#ef4444',
            text: '#ffffff',
          },
          high: {
            border: '#f97316', // orange-500
            bg: '#f97316',
            text: '#ffffff',
          },
          medium: {
            border: '#eab308', // yellow-500
            bg: '#eab308',
            text: '#ffffff',
          },
          low: {
            border: '#3b82f6', // blue-500
            bg: '#3b82f6',
            text: '#ffffff',
          },
        },
      },
    },
  },
  plugins: [],
} 