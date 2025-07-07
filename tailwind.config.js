/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './themes/twda_v5/layouts/**/*.html',
    './themes/twda_v5/assets/js/**/*.js',
    './content/**/*.md',
    './layouts/**/*.html',
    './assets/js/**/*.js'
  ],
  plugins: [
    require('@tailwindcss/typography')
  ]
};

