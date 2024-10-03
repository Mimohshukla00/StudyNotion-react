/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        richBlack: "#010203",
        richBlack700: "#2a2a2b",
      },
    },
  },
  plugins: [],
};
