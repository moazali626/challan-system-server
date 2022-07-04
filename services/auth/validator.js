const { check } = require("express-validator");

/**
 * Login fields
 */
exports.loginValidator = [
  check("email")
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Please provide a valid email address!")
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required!"),
  check("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Password is required!"),
];

/**
 * Sign up fields
 */
exports.signUpValidator = [
  check("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Name is required!")
    .isLength({ max: 50 })
    .withMessage("Maximum 50 characters allowed!"),
  check("email")
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Please provide a valid email address!")
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required!"),
  check("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 8, max: 40 })
    .withMessage("Password must be between 8-40 characters long!"),
];
