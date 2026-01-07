import express from "express";
import { validate } from "../middlewares/validator.js";
import { CreateCase, DeleteCase, GetAllCases, GetCase, GetUserCases, UpdateCase } from "../controllers/case.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { createCaseValidator, updateCaseValidator } from "../validators/case.validator.js";

export const caseRouter = express.Router();

caseRouter.post(
    "/",
    createCaseValidator,
    validate,
    authenticateToken,
    CreateCase
);

caseRouter.get("/", GetAllCases);

caseRouter.get("/user/", authenticateToken, GetUserCases);

caseRouter.get("/user/:id", authenticateToken, GetCase);

caseRouter.patch(
    "/:id",
    authenticateToken,
    updateCaseValidator,
    validate,
    UpdateCase
);

caseRouter.delete("/:id", authenticateToken, DeleteCase);
