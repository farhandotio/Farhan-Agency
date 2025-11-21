import { body, validationResult } from "express-validator";

export async function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export const registerValidationRules = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("fullname.firstName").notEmpty().withMessage("First name is required"),
  body("fullname.lastName").notEmpty().withMessage("Last name is required"),
  validate,
];

export const loginValidationRules = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").notEmpty().withMessage("Password is required"),
  validate,
];

export const createServiceValidation = [
  body("slug").trim().notEmpty().withMessage("Slug is required"),
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("heroDescription").optional().isString(),
  body("heroImageUrl").optional().isString(),
  validate,
];

export const updateServiceValidation = [
  body("slug").optional().trim().notEmpty(),
  body("title").optional().trim().notEmpty(),
  body("heroDescription").optional().isString(),
  validate,
];
