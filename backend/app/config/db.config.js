module.exports = {
  // allow overriding the DB URL via env var (useful for Docker or CI)
  url: process.env.MONGODB_URL || `mongodb://localhost:27017/MyDB`
};
