/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      'teal': '#49C9B9',
      'blue': '#437BC0',
      'salmon': '#E96B67',
      'yellow': '#F5923C',
      'grey': {
        1: '#E8E3E2',
        2: '#C6BAB7',
      },
      'black': '#382E2D',
      'white': '#F8F6F6',
    },
    extend: {},
  },
  plugins: [],
};

