// tailwind.config.js
const colors = require("tailwindcss/colors");

module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      gray: colors.warmGray,
      blue: colors.lightBlue,
      red: colors.rose,
      yellow: colors.amber,
      green: colors.lime
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
