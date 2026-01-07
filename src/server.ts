import express, { Request, Response } from "express";
import { CorsConfig } from "./config/CorsConfig.js";
import { AppConnect } from "./config/AppConfig.js";
import { CustomErrorHandler } from "./middlewares/CustomErrorHandler.js";
import { healthRouter } from "./routes/healthRouter.js";


const app = express()

CorsConfig(app)
app.use(express.json())

app.use("/api/v1",healthRouter)

app.use(CustomErrorHandler);

AppConnect(app)