import dotenv from "dotenv";
dotenv.config();
console.log("smtp password:", process.env.SMTP_PASSWORD);
export default {
  port: process.env.PORT || 4000,
  origin: process.env.ORIGIN?.split(",") || ["http://localhost:5173"],
  useHTTP2: process.env.USE_HTTP2 === "true",
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  EMAIL_NAME: process.env.EMAIL_NAME,
  EMAIL_FROM: process.env.EMAIL_FROM,
  MONGODB_URL: `${process.env.MONGODB_URL_BASE}?retryWrites=true&w=majority`,
  secret: process.env.SECRET,
  NOW_PAYMENTS_API_KEY: process.env.NOW_PAYMENTS_API_KEY,
  BACKEND_DOMAIN: process.env.BACKEND_DOMAIN,
};
