module.exports = {
  // allow overriding the DB URL via env var (useful for Docker or CI)
  url: process.env.MONGODB_URL || `mongodb://${process.env.MONGO_USER || 'myuser'}:${process.env.MONGO_PASS || 'mypassword'}@mongo:27017/MyDB`
};
