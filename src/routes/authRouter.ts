import express from "express";
import { validate } from "../middlewares/validator.js";
import { loginUserValidator } from "../validators/auth.validator.js";
import { GetMe, LoginUser } from "../controllers/auth.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

export const authRouter = express.Router();

authRouter.post(
    "/",
    loginUserValidator,
    validate,
    LoginUser
);

authRouter.get("/me", authenticateToken, GetMe);
