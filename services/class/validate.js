const { check } = require("express-validator");

/**
 * Add Student Fields
 */

exports.addClassValidator = [
  check("addClass")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Class Name is required!")
    .isLength({ max: 50 })
    .withMessage("Maximum 50 characters allowed!"),
  check("classFees")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Class Fees is required!")
    .isLength({ max: 50 })
    .withMessage("Maximum 50 characters allowed!"),
];
