import { Express } from "express";
import { logger } from "./Logger.js";
import { DBConnect } from "../db/db.js";

export const AppConnect = (app: Express) => {
  const port = Number(process.env.PORT) || 8080;

  try {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
      logger.info(`Server started on port ${port}`);
    });

    DBConnect();
  } catch (error) {
    logger.error("Error starting the server", error);
    console.error("Error starting the server", error);
  }
};
