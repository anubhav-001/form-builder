/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#050816",
        surface: "#0B1020",
        accent: "#1E88E5",
        muted: "#4B5563",
        border: "#1F2933",
        error: "#EF4444"
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
