/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Cores do tema claro
        light: {
          background: "#ffffff",
          background2: "#f1f5f9",
          surface: "#f8f9fa",
          text: {
            primary: "#202124",
            secondary: "#5f6368",
            tertiary: "#757575",
          },
          border: "#e8eaed",
        },
        // Cores do tema escuro
        dark: {
          background: "#121212",
          background2: "#1e1e1e",
          surface: "#1e1e1e",
          text: {
            primary: "#ffffff",
            secondary: "#e8eaed",
            tertiary: "#9aa0a6",
          },
          border: "#2c2c2c",
        },
      },
    },
  },
  plugins: [],
};
