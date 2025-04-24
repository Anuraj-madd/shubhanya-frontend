/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust based on your project structure
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0D1B2A",   // Deep navy - backgrounds, navbar
          secondary: "#1B263B", // Dark slate - cards, footer
          accent1: "#415A77",   // Dusty blue - buttons, borders
          accent2: "#778DA9",   // Steel blue - subtle elements
          highlight: "#9F2BEE", // Purple - for wifi wave theme, emphasis
          cta: "#1CC5DC",       // Teal/cyan - call to actions, success
          text: {
            light: "#E0E1DD",   // Light text for dark backgrounds
            dark: "#1B1B1B",    // Dark text for light backgrounds
          },
          background: "#F5F7FA", // Light background color
        },
      },
    },
  },
  plugins: [],
};
