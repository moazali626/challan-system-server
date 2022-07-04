const { check } = require("express-validator");

/**
 * Add Student Fields
 */

exports.addStudentValidator = [
  check("firstName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("First name is required!")
    .isLength({ max: 50 })
    .withMessage("Maximum 50 characters allowed!"),
  check("lastName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Last name is required!")
    .isLength({ max: 50 })
    .withMessage("Maximum 50 characters allowed!"),
  check("className").notEmpty().withMessage("Class name is required!"),
  check("mode").notEmpty().withMessage("Mode is is required!"),
];
