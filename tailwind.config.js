/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        backgreen: "#00664F",
        textprimary: "#212523",
        textsecundary: "#BCC1CD"
      },
    },
  },
  plugins: [],
}