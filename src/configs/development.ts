import base from "./base";

export default {
  ...base,
  env: "development",
  maindb: process.env["MONGODB_URI"],
  app1db: process.env["APP1_DB_URI"],
  adminAccount: process.env["ADMIN_ACCOUNT"],
  adminPrivateKey: process.env["ADMIN_PRIVATE_KEY"],
  telegramBotKey: process.env["TELEGRAM_BOT_KEY"],
  debug: true,
};
