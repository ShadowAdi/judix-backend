import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { body } = require("express-validator");

export const loginUserValidator = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required"),
];
