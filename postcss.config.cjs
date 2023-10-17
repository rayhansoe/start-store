module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      ...(process.env.PROD === 'production' ? { cssnano: {} } : {})
    }
  }