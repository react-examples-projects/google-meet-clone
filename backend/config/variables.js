require("dotenv").config();

const SERVER = {
  PORT: process.env.API_PORT || 6000,
  DEV: process.env.DEV || false,
  API: {
    IS_PRODUCTION: process.env.NODE_ENV === "production",
    ALLOWED_DOMAINS: [
      "http://localhost:3000",
      "http://localhost:5000",
      "https://google-meet-delta.vercel.app",
    ],
    RATE_LIMITS: {
      windowMs: 10 * 60 * 1000, // 10 minutes
      max: 200, // limit each IP to 200 requests per windowMs
    },
  },
};

const TWILIO = {
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY: process.env.TWILIO_API_KEY,
  TWILIO_API_SECRET: process.env.TWILIO_API_SECRET,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
};

module.exports = {
  SERVER,
  TWILIO,
};
