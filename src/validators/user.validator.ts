import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { body } = require("express-validator");

export const createUserValidator = [
    body("username")
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3, max: 30 }).withMessage("Username must be 3–30 characters")
        .trim(),

    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 3 }).withMessage("Password must be at least 8 characters"),

    body("bio")
        .optional()
        .isLength({ max: 200 }).withMessage("Bio cannot exceed 200 characters")
        .trim(),
];

export const updateUserValidator = [
  body("username")
    .optional()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be 3–30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores")
    .trim(),

  body("bio")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Bio cannot exceed 200 characters")
    .trim(),
];
