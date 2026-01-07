import express, { Request, Response } from "express";
import { CorsConfig } from "./config/CorsConfig.js";
import { AppConnect } from "./config/AppConfig.js";


const app = express()

CorsConfig(app)
app.use(express.json())

app.get("/", (request: Request, response: Response) => {
    return response.status(200).json({
        "message": "API are working",
        "success": true
    })
})

AppConnect(app)