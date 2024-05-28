import express from "express";
import { LogHelper, Logger } from "./core/logger";
import ExpressLoader from "./loaders/express.loader";
import ApolloServerLoader from "./graphql";
import TelegramLoader from "./loaders/telegram.loader";


class Server {
  constructor() {
    this.setupApp();
  }

  setupApp() {
    const { app } = new ExpressLoader(express());

    LogHelper.getHeading(" --------- Welcome to 🐒🐒🐒 MONKEY-KING.JS 🍌🍌🍌 ---------");
    Logger.info("🐵🐵🐵 Load Source Successfully 🐵🐵🐵 \n");

    const apolloLoader = new ApolloServerLoader(app);
    apolloLoader.startGraphql();

    const telegramLoader = new TelegramLoader();
    telegramLoader.runMain();


    app.listen(app.get("port"), () => {
      LogHelper.logString(
        `\n🚀 Graphql is running in ${app.get("env")} mode at`,
        `http://localhost:${app.get("port")}/graphql \n`,
      );

      LogHelper.logString(
        `\n🚀 Apis Services is running in ${app.get("env")} mode at`,
        `http://localhost:${app.get("port")}/api-docs \n`,
      );
      console.log("  Press CTRL-C to stop\n");
    });


  }
}

// Usage
new Server();
import "./init";
import "./scheduler";
import { env } from "process";import { configs } from "./configs";

