const settingConfig = {
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/url_shortener",
  POSTGRES: {
    enabled: process.env.POSTGRES_ENABLED === "true",
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    database: process.env.POSTGRES_DATABASE || "url_shortener",
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "password",
  },
};

export default settingConfig;