module.exports = {
    secretOrKey: process.env.SECRET_KEY,
    isProduction: process.env.NODE_ENV === 'production'
  }
