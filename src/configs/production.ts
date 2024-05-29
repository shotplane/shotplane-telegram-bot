import base from "./base";

export default {
  ...base,
  env: "production",
  maindb: process.env["MONGODB_URI"],
  app1db: process.env["APP1_DB_URI"],
  adminAccount: process.env["ADMIN_ACCOUNT"],
  adminPrivateKey: process.env["ADMIN_PRIVATE_KEY"],
  telegramBotKey: process.env["TELEGRAM_BOT_KEY"],
  telegramApiRoot: process.env["TELEGRAM_API_ROOT"],
  debug: false,
};
