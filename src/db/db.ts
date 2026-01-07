import mongoose from "mongoose";
import { logger } from "../config/Logger.js";
import { DB_URL } from "../config/DotenvConfig.js";

export const DBConnect = async () => {
  if (!DB_URL) {
    logger.error(`Cant Connect To Db URL Does not exist`);
    console.log(`Cant Connect To Db URL Does not exist`);
    return;
  }
  try {
    await mongoose
      .connect(DB_URL!)
      .then(() => {
        logger.info(`Connected Successfully`);
        console.log(`Connected Successfully`);
      })
      .catch((err) => {
        logger.error(`Failed to connect to DB: ${err}`);
        console.error(`Failed to connect to DB: ${err}`);
      });
  } catch (err) {
    logger.error(`Failed to connect to DB: ${err}`);
    console.error(`Failed to connect to DB: ${err}`);
    return;
  }
};