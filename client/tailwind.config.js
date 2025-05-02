/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        GoogleSansDisplay: ["GoogleSansDisplay", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
}

