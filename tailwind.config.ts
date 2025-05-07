import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Colors
      colors: {
        primary: {
          DEFAULT: '#0070f3',
          dark: '#0051a2',
          light: '#3291ff',
        },
        secondary: {
          DEFAULT: '#7928ca',
          dark: '#4c2889',
          light: '#8a63d2',
        },
        // Add more custom colors here
      },
      // Typography
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-montserrat)'],
      },
      // Spacing
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      // Container
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      // Breakpoints
      screens: {
        'xs': '475px',
        // ... other breakpoints are inherited from default
      },
    },
  },
  plugins: [],
}

export default config 