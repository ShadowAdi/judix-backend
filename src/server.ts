import express, { Request, Response } from "express";
import { CorsConfig } from "./config/CorsConfig.js";
import { AppConnect } from "./config/AppConfig.js";
import { CustomErrorHandler } from "./middlewares/CustomErrorHandler.js";
import { healthRouter } from "./routes/healthRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { caseRouter } from "./routes/caseRouter.js";


const app = express()

CorsConfig(app)
app.use(express.json())

app.use("/api/v1/health", healthRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/case", caseRouter)

app.use(CustomErrorHandler);

AppConnect(app)