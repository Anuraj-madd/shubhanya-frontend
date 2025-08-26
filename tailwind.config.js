/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1CC5DC',
        secondary: '#415A77',
        background: '#F5F7FA',
        text: '#1B1B1B',
      },
    },
  },
  plugins: [],
};
