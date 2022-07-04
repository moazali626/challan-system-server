const { check } = require("express-validator");

/**
 * Generate Challan Fields
 */

exports.generateChallanValidator = [
  check("className")
    .trim()
    .notEmpty()
    .withMessage("Class Name is required!")
    .isLength({ max: 50 })
    .withMessage("Maximum 50 characters allowed!"),
];

exports.updateStatusValidator = [
  check("challanId")
    .trim()
    .notEmpty()
    .withMessage("Challan Id is required!")
    .isLength({ min: 24, max: 24 })
    .withMessage("Maximum 50 characters allowed!"),
  check("status").trim().notEmpty().withMessage("Status is required!"),
];
