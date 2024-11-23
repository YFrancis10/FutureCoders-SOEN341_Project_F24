/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this covers your components
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth-bg': "url('./src/images/concordia.jpg')", // Replace with your image path
      },
    },
  },
  plugins: [],
};

