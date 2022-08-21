export const configuration = () => ({
  APP_ENV: process.env.APP_ENV,
  PORT: parseInt(process.env.PORT, 10) || 3333,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
});
