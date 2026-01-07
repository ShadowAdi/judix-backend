import express from "express";
import { CorsConfig } from "./config/CorsConfig.js";
import { AppConnect } from "./config/AppConfig.js";


const app = express()

CorsConfig(app)
app.use(express.json())


AppConnect(app)