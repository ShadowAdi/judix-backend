import express from "express";
import { validate } from "../middlewares/validator.js";
import { loginUserValidator } from "../validators/auth.validator.js";
import { LoginUser } from "../controllers/auth.controller.js";

export const authRouter = express.Router();

authRouter.post(
    "/",
    loginUserValidator,
    validate,
    LoginUser
);
