// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: [
    require('@tailwindcss/postcss'), // Gunakan @tailwindcss/postcss untuk Tailwind v4
    require('autoprefixer')
  ]
}
