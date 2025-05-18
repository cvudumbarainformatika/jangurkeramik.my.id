/** @type {import('tailwindcss').Config} */

// const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    // "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/**/*.{vue,js,ts,jsx,tsx,html}",
    "./index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1976D2',
        primaryDark: '#1565C0',
        secondary: '#26A69A',
        accent: '#9C27B0',
        dark: '#1D1D1D',
        positive: '#21BA45',
        negative: '#C10015',
        info: '#31CCEC',
        warning: '#F2C037'
      }
    },
    screens: { // Perbaikan: 'screen' -> 'screens'
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    }
  },
  plugins: [],
  important: true
}
