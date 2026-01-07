import express from "express";
import { createUserValidator, updateUserValidator } from "../validators/user.validator.js";
import { validate } from "../middlewares/validator.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { CreateUser, DeleteUser, GetAllUsers, GetUser, UpdateUser } from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter.post(
    "/",
    createUserValidator,
    validate,
    CreateUser
);

userRouter.get("/", GetAllUsers);

userRouter.get("/:id", GetUser);

userRouter.patch(
    "/",
    authenticateToken,
    updateUserValidator,
    validate,
    UpdateUser
);

userRouter.delete("/", authenticateToken, DeleteUser);
