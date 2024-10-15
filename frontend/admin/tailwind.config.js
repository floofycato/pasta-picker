/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["Poppins", "sans-serif"],
    },

    extend: {
      // Colors used in the project
      colors: {
        primary: "#f9f9f9",
        primaryLight: "#e3f7fa",
        secondary: "#ff2403",
        tertiary: "#404040",
        gray: {
          10: "#EEEEEE",
          20: "#A2A2A2",
          30: "#7B7B7B",
          50: "#585858",
          90: "#141414",
        },
      },
      screens: {
        "3xl": "1680px",
        "4xl": "2200px",
      },
      backgroundImage: {
        "login-bg-img": "url('/src/assets/images/bg-img.jpg')",
      },
    },
  },
  plugins: [],
}
