/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        s500: { max: "500px" },
        s950: { max: "950px" },
        s1240: { max: "1240px" },
        s1000: { max: "1000px" },
        s700: { max: "700px" },
      },
    },
  },
  plugins: [],
};
