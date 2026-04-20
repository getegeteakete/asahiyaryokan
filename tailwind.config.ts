import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        kinari: {
          DEFAULT: '#ede5d3',
          light: '#f4eedd',
        },
        washi: '#e8dfc9',
        sumi: {
          DEFAULT: '#1a1512',
          soft: '#3a332c',
        },
        clay: '#8b7f6b',
        shu: {
          DEFAULT: '#9a2f26',
          deep: '#7a241c',
        },
        kin: {
          DEFAULT: '#a98646',
          light: '#c9a86b',
        },
        ai: '#1d3b4f',
      },
      fontFamily: {
        mincho: ['var(--font-mincho)', 'serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
      },
      animation: {
        fadeUp: 'fadeUp 1.4s ease-out',
        bounce: 'bounce 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
