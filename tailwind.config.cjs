/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth-bg': "url('/path/to/your/image.jpg')", 
      },
    },
  },
  plugins: [],
};

