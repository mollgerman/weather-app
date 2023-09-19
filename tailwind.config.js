/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      mid: '386px',
      sm: '640px',
      md: '768px',
      lg: '976px',
      xl: '1270px'
    },
    extend: {
      fontFamily: {
      sans: ['Comfortaa', 'cursive'],
      // sans: ['Inter', 'sans-serif'],
      serif: ['Quicksand', 'serif'],
    },
    },
  },
  plugins: [],
}