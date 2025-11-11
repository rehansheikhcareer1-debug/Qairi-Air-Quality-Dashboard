/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aqi-good': '#00e400',
        'aqi-moderate': '#ffff00',
        'aqi-unhealthy-sensitive': '#ff7e00',
        'aqi-unhealthy': '#ff0000',
        'aqi-very-unhealthy': '#8f3f97',
        'aqi-hazardous': '#7e0023',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
