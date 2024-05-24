const colors = require('tailwindcss/colors');

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
        3: '#A49A97',
        4: '#827A78',
        5: '#625B59',
      },
      'black': '#382E2D',
      'white': '#F8F6F6',
      'red': '#E96B67',
      'green': '#49C9B9',
    },
    extend: {
      colors: {
        'slate': colors.slate,
      },
    },
  },
  plugins: [],
};
