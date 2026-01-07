import express from "express";
import { createUserValidator, updateUserValidator } from "../validators/user.validator.js";
import { validate } from "../middlewares/validator.js";
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
    "/:id",
    updateUserValidator,
    validate,
    UpdateUser
);

userRouter.delete("/:id", DeleteUser);
