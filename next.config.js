const path = require("path");

module.exports = {
  images: {
    domains: ["firebasestorage.googleapis.com", "googleapis.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    // FIREBASE VARIABLES HERE FOR INITIALIZATION
    DEVELOPMENT_ENV_FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    DEVELOPMENT_ENV_FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    DEVELOPMENT_ENV_FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    DEVELOPMENT_ENV_FIREBASE_STORAGE_BUCKET:
      process.env.FIREBASE_STORAGE_BUCKET,
    DEVELOPMENT_ENV_FIREBASE_MESSAGING_SENDER_ID:
      process.env.FIREBASE_MESSAGING_SENDER_ID,
    DEVELOPMENT_ENV_FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    DEVELOPMENT_ENV_FIREBASE_MEASUREMENT_ID:
      process.env.FIREBASE_MEASUREMENT_ID,
    NEXT_PUBLIC_API_URL:
      process.env.NODE_ENV === "production"
        ? "https://responai-api.azurewebsites.net"
        : "http://localhost:3001",
  },
};
