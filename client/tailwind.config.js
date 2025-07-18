/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 10s linear infinite',
      },
      colors: {
        cream: {
          100: '#FFFDD0',
          200: '#FAF3DD',
          300: '#F7E7CE',
          400: '#FAF0E6',
          500: '#FAEBD7',
        },
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      spacing: {
        '0.25': '1px',
        '0.75': '3px',
      },
    screens: {
      'xs': '393px', 
    },
      fontFamily: {
        hero: ['Poppins', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        product: ['Poppins', 'sans-serif'],
        price: ['Poppins', 'sans-serif'],
        button: ['Poppins', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'], // this makes Poppins the default font
      },
      fontSize: {
        hero: ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.1' }],     // 40px - 64px
        brand: ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1' }],
        sectionHeading: ['clamp(1.75rem, 4vw, 1.75rem)', { lineHeight: '1.2' }],  // 28px - 48px
        productTitle: ['clamp(1rem, 2vw, 1.5rem)', { lineHeight: '1.3' }],  // 16px - 24px
        price: ['clamp(0.875rem, 2vw, 1.25rem)', { lineHeight: '1.3' }],  // 14px - 20px
        button: ['clamp(0.875rem, 1vw, 1rem)', { lineHeight: '1.3' }],    // 14px - 16px
        body: ['clamp(0.875rem, 1vw, 1rem)', { lineHeight: '1.5' }],      // 14px - 16px 
        brandLabel: ['clamp(0.75rem, 1vw, 0.875rem)', { lineHeight: '1.3' }],
        iconSmall: ['clamp(0.875rem, 1vw, 1rem)'],      // 14px-16px
        iconMedium: ['clamp(1rem, 1.5vw, 1.5rem)'],     // 16px-24px
        iconLarge: ['clamp(1.5rem, 3vw, 2.5rem)'],      // 24px-40px
        'xs': '.75rem',     // 12px
        'sm': '.875rem',    // 14px
        'base': '1rem',     // 16px
        'lg': '1.125rem',   // 18px
        'xl': '1.25rem',    // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',      // 48px
      },
    },
  },
  plugins: [],
}

