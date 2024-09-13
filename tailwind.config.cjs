/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // Defining white and cream shades for the background
        primary: "#FFFFFF", 
        secondary: "6EACDA", 
        tertiary: "#5585b5",  

        // Defining black colors for text
        "black-100": "#79c2d0",  // Pure black
        "black-200": "#53a8b6",  // Slightly lighter black (dark gray)
        
        // Optional: keeping the white text variant for contrast if needed
        "white-100": "#ffffff", 
      },
      boxShadow: {
        card: "0px 35px 120px -15px rgba(33, 30, 53, 0.4)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        // decide if i want bg image
      },
    },
  },
  plugins: [],
};
