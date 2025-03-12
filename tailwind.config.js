/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./views/**/*.ejs",
    "./views/partials/**/*.ejs",
    "./public/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        harrypotter: ["Cinzel", "serif"], // Harry Potter Style Font
        body: ["Poppins", "sans-serif"], // Clean Text Font
        header: ["Geist", "sans-serif"], //  Professional Header Font
        grotesk: ["Space Grotesk", "sans-serif"], //  Futuristic Font
      },
    },
  },
  plugins: [],
};
