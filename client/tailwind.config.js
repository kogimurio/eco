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
        hero: ['clamp(2rem, 4vw, 2.25rem)', { lineHeight: '1.1' }],    
        brand: ['clamp(2rem, 4vw, 2rem)', { lineHeight: '1.1' }],
        sectionHeading: ['clamp(1.5rem, 1.5vw, 1.5rem)', { lineHeight: '1.2' }], 
        productTitle: ['clamp(1rem, 1.25vw, 1.25rem)', { lineHeight: '1.3' }],  
        price: ['clamp(0.875rem, 2vw, 1.25rem)', { lineHeight: '1.3' }],  
        button: ['clamp(0.875rem, 1vw, 1rem)', { lineHeight: '1.3' }],    
        body: ['clamp(0.875rem, 1vw, 1rem)', { lineHeight: '1.5' }],   
        brandLabel: ['clamp(0.75rem, 1vw, 0.875rem)', { lineHeight: '1.3' }],
        iconSmall: ['clamp(0.875rem, 1vw, 1rem)'],     
        iconMedium: ['clamp(1rem, 1.5vw, 1.5rem)'],     
        iconLarge: ['clamp(1.5rem, 3vw, 2.5rem)'],   
        'xs': '.75rem',     
        'sm': '.875rem',    
        'base': '1rem',     
        'lg': '1.125rem',  
        'xl': '1.25rem',    
        '2xl': '1.5rem',    
        '3xl': '1.875rem',  
        '4xl': '2.25rem',   
        '5xl': '3rem',    
      },
    },
  },
  plugins: [],
}

