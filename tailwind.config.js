/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        primary: "#11998e",
        secondary: "#38ef7d",
      },
      boxShadow: {
        sdprimary: "10px 15px 30px rgba(211, 211, 211, 0.4)",
      },
    },
  },
  plugins: [],
};
