/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        main:'#2C1D79',
        second:'#472FC2',
        mainText:'#018AD9',
        aboutText:'#2E1E7D',
        mainWhite:'#FFFFFF',
        bgProcess:'#472FC2',
        bgWhite:'#F5F5F5',
        bg:'#E7E7E7'
      },
      gridTemplateColumns: {
        process: "repeat(auto-fit, minmax(500px, 1fr))",
      },
    },
  },
  plugins: [],
}
