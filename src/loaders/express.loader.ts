import compression from "compression";
import express, { Request, Response } from "express";
import path from "path";
import morgan from "morgan";

import { configs } from "../configs";
import { LogHelper } from "../core/logger";
import router from "../routers";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../configs/swagger";

class ExpressLoader {
  public app: express.Express;

  constructor(app: any) {
    this.app = app;
    this.configure();
  }

  private configure(): void {
    this.app.use(compression());
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    this.app.set("port", configs.port);

    this.app.use(
      morgan(LogHelper.createApiGraphqlToken, {
        skip: (req: Request) =>
          /(_ah\/health)|graphql|_next/.test(req.originalUrl),
      }),
    );

    this.app.use(
      "/public",
      express.static(path.join(__dirname, "../../public"))
    );

    this.app.use("/api", router);

    this.app.use("/api-docs", swaggerUi.serveWithOptions({
      cacheControl: false,
      maxAge: 0,
      setHeaders(res, path, stat) {
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Pragma', 'no-cache')
      },
    }), swaggerUi.setup(swaggerSpec));

  }
}

export default ExpressLoader;