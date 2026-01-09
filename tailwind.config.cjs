/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // New color theme
        background: "#F9FAFB",
        "text-primary": "#0F172A",
        "text-secondary": "#64748B",
        accent: "#2563EB",
        "accent-light": "#DBEAFE",
        
        // Legacy colors (keeping for backward compatibility)
        primary: "#FFFFFF", 
        secondary: "6EACDA", 
        tertiary: "#5585b5",  
        "black-100": "#79c2d0",
        "black-200": "#53a8b6",
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
