/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./Views/**/*.ejs", // Ensure this includes your templates
    "./Views/partials/**/*.ejs",
    "./public/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        harrypotter: ["Cinzel", "serif"], // Ensure font name matches Google Fonts
        body: ["Poppins", "sans-serif"],
        header: ["Geist", "sans-serif"], // Make sure "Geist" is available
      },
    },
  },
  plugins: [],
};
