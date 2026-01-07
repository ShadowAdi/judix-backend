import express, { NextFunction, Request, Response } from "express";
import { logger } from "../config/Logger.js";

export const healthRouter = express.Router();

healthRouter.get(
  "/",
  (request: Request, response: Response, next: NextFunction) => {
    logger.info(`API Is working`);
    response.status(200).json({
      message: `API Is working`,
      success: true,
    });
  }
);