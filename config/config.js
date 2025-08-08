module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiration: '24h',

  roles: {
    USER: 'user',
    PROVIDER: 'provider',
    ADMIN: 'admin'
  }
};