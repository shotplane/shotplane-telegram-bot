import mongoose, { Connection, ConnectOptions } from "mongoose";
import MongoTransport from "winston-mongodb";
import { LogHelper } from "../core/logger";

class DatabaseLoader {
  private connection: Connection | null = null;
  private dbUri: string = null;

  constructor(dbUri: string) {
    if (typeof dbUri !== "string") {
      throw new Error("Invalid database URI");
    }

    this.dbUri = dbUri;
    this.connection = mongoose.createConnection(this.dbUri, {
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });
    // LogHelper.getHeading("----- Db Connected -----");
  }

  public getConnection() {
    return this.connection;
  }

  public transportLog = () => new MongoTransport.MongoDB({
    db: this.dbUri,
    collection: "errorlog",
    level: "error",
    tryReconnect: true,
    options: { useUnifiedTopology: true },
  });
}

export default DatabaseLoader;
