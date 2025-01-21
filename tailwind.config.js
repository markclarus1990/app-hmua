/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        peach: {
          50: "#d6aaa1  ",
          100: "#ffcbbd",
          200: "#ffbca2",
          300: "#FFA071",
          400: "#FFA07A", // Vibrant peach
          500: "#FF7F50", // Coral peach
          600: "#FF6347", // Deep coral peach
        },
      },
    },
    screens: {
      xs: "300px", // Customize this value as needed
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
