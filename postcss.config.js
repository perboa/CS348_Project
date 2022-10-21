const tailwindcss = require("tailwindcss");
module.exports = {
  parser: 'sugarss',
  plugins: [
    'postcss-import': {},
    tailwindcss("./tailwind.config.js"),
    require("autoprefixer")
  ],
}