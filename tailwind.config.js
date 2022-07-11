module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      boxShadow: {
        'shadowbox': '2px 15px 20px  rgba(0, 0, 0, 0.1)',
      },
      screens: {
        sm: { min: '0px', max: '767px' },
        md: { min: '768px', max: '1023px' },
        lg: { min: '1024px' },
      },
      backgroundImage: {
        'hero-img': "url('/public/images/movie-login.jpg')"
      }

    },
  },
  plugins: [],
}
