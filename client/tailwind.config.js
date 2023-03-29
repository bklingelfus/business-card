/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge:["./src/**/*.{js,jsx,ts,tsx}",'./public/index.html'],
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}",'./public/index.html'],
  theme: {
    extend: {
      colors:{
      },
    },
    screens:{
      'sm': {'max':'440px'},      
      'md': {'max':'868px'},
    },
  },
  variants:{
    extend:{}
  },
  plugins: [],
}
