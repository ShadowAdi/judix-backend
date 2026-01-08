import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { body, param } = require("express-validator");
import mongoose, { Types } from "mongoose";

export const createCaseValidator = [
  body("title")
    .exists().withMessage("Title is required")
    .isString().withMessage("Title must be a string")
    .trim()
    .notEmpty().withMessage("Title cannot be empty"),

  body("description")
    .optional()
    .isString().withMessage("Description must be a string")
    .trim(),

  body("clientName")
    .exists().withMessage("Client name is required")
    .isString().withMessage("Client name must be a string")
    .trim()
    .notEmpty().withMessage("Client name cannot be empty"),

  body("clientEmail")
    .optional()
    .isEmail().withMessage("Invalid client email")
    .normalizeEmail(),

  body("caseType")
    .optional()
    .isIn(["civil", "criminal", "contract", "corporate", "other"])
    .withMessage("Invalid case type"),

  body("status")
    .optional()
    .isIn(["draft", "active", "closed"])
    .withMessage("Invalid status"),

  body("filedAt")
    .exists().withMessage("Filed date is required")
    .isISO8601().withMessage("Filed date must be a valid date")
    .toDate(),
];

export const updateCaseValidator = [
  param("id")
    .custom((value:Types.ObjectId) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid case id"),

  body("title")
    .optional()
    .isString().withMessage("Title must be a string")
    .trim()
    .notEmpty().withMessage("Title cannot be empty"),

  body("description")
    .optional()
    .isString().withMessage("Description must be a string")
    .trim(),

  body("clientName")
    .optional()
    .isString().withMessage("Client name must be a string")
    .trim()
    .notEmpty().withMessage("Client name cannot be empty"),

  body("clientEmail")
    .optional()
    .isEmail().withMessage("Invalid client email")
    .normalizeEmail(),

  body("caseType")
    .optional()
    .isIn(["civil", "criminal", "contract", "corporate", "other"])
    .withMessage("Invalid case type"),

  body("status")
    .optional()
    .isIn(["draft", "active", "closed"])
    .withMessage("Invalid status"),

  body("filedAt")
    .optional()
    .isISO8601().withMessage("Filed date must be a valid date")
    .toDate(),

  body("isArchived")
    .optional()
    .isBoolean().withMessage("isArchived must be boolean"),
];

