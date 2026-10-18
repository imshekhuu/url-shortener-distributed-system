const settingConfig = {
  MONGODB: {
    mongoURI:
      process.env.MONGO_URI || "mongodb://localhost:27017/url-shortener",
      port: parseInt(process.env.MONGO_PORT || "27017"),
  },
  POSTGRESQL: {
    host: process.env.POSTGRES_HOST || "localhost",
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
    database: process.env.POSTGRES_DB || "url_shortener",
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "password",
  },
  AUTH: {
    jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
    AccessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || "15m",
    RefreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || "7d",
    AccessTokenCookieName:
      process.env.ACCESS_TOKEN_COOKIE_NAME || "access_token",
    RefreshTokenCookieName:
      process.env.REFRESH_TOKEN_COOKIE_NAME || "refresh_token",
  },
  GOOGLE_AUTH: {
    clientId: process.env.GOOGLE_CLIENT_ID || "your_google_client_id",
    clientSecret:
      process.env.GOOGLE_CLIENT_SECRET || "your_google_client_secret",
    redirectUri:
      process.env.GOOGLE_REDIRECT_URI ||
      "http://localhost:3000/auth/google/callback",
  },
  REDIS: {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
  },
  REBBITMQ: {
    host: process.env.RABBITMQ_HOST || "localhost",
    port: parseInt(process.env.RABBITMQ_PORT || "5672"),
  },
};

export default settingConfig;
