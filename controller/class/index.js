const { validationResult } = require("express-validator");
const _ = require("lodash");
const { httpStatusCode, message, exception } = require("../../constants");
const Class = require("../../models/class");

exports.addClass = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const validationErrors = validationResult(req);
      if (!_.isEmpty(validationErrors.errors)) {
        return reject({
          code: httpStatusCode.BAD_REQUEST,
          message: validationErrors.array(),
        });
      }

      //If above validation succeeds, add class account code will run

      const { addClass, classFees } = req.body;

      const Isduplicate = await Class.findOne({ className: addClass });

      if (Isduplicate) {
        return resolve({
          code: httpStatusCode.CONFLICT,
          message: message.CLASS_ALREADY_EXISTS,
        });
      }

      const result = await Class.create({
        className: addClass,
        fees: classFees,
      });

      if (result) {
        return resolve({
          code: httpStatusCode.OK,
          message: message.CLASS_CREATED,
        });
      }
    } catch (error) {
      //   Logger.error(error);
      return reject({
        code: httpStatusCode.INTERNAL_SERVER_ERROR,
        message: message.INTERNAL_SERVER_ERROR,
      });
    }
  });
};

exports.getClassName = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Class.find();
      if (result) {
        return resolve({
          classes: result,
          code: httpStatusCode.OK,
        });
      }
    } catch (error) {
      //   Logger.error(error);
      return reject({
        code: httpStatusCode.INTERNAL_SERVER_ERROR,
        message: message.INTERNAL_SERVER_ERROR,
      });
    }
  });
};
