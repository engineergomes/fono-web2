import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        archivo: ['Archivo', 'sans-serif'],
        hindVadodara: ['Hind Vadodara', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      backgroundColor: {
        lightBlue: '#45B3DF',
        lightPurple: '#BFA5CD',
        darkBlue: 'rgba(35,54,104,1)',
        lightYellow: 'rgba(255, 200, 91, 1)',
        strongYellow: '#FFBD59',
        lightGreen: '#d9ecda',
      },
      colors: {
        lightBlue: '#45B3DF',
        lightPurple: '#BFA5CD',
        darkBlue: 'rgba(35,54,104,1)',
        lightYellow: '#FFC85B',
        lightGray: '#70747F',
        strongYellow: '#FFBD59',
        lightGreen: '#d9ecda',
      },
    },
  },
  plugins: [],
};

export default config;
