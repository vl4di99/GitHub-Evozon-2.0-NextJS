/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "1k4": "1440px",
        "1k5": "1500px",
        "1k9": "1920px",
        "2k": "2048px",
        "4k": "3840px",
        "1k4/6": { min: "1440px", raw: "(min-height: 700px)" },
      },
    },
  },
  plugins: [],
};
