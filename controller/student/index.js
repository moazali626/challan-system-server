const { validationResult } = require("express-validator");
const _ = require("lodash");
const { httpStatusCode, message, exception } = require("../../constants");
const User = require("../../models/user");
const Student = require("../../models/student");

/**
 * POST /auth/signup
 * User Sign Up.
 */
exports.addStudent = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const validationErrors = validationResult(req);
      if (!_.isEmpty(validationErrors.errors)) {
        return reject({
          code: httpStatusCode.BAD_REQUEST,
          message: validationErrors.array(),
        });
      }

      //If above validation succeeds, add student code will run

      const { firstName, lastName, className, mode } = req.body;
      console.log(req.body);

      const result = await Student.create({
        firstName,
        lastName,
        className,
        mode,
      });

      if (!result) {
        return resolve({
          code: httpStatusCode.BAD_REQUEST,
          message: message.STUDENT_NOT_ADDED,
        });
      }
      return resolve({
        code: httpStatusCode.OK,
        message: message.STUDENT_ADDED,
      });
    } catch (error) {
      //   Logger.error(error);
      return reject({
        code: httpStatusCode.INTERNAL_SERVER_ERROR,
        message: message.INTERNAL_SERVER_ERROR,
      });
    }
  });
};
