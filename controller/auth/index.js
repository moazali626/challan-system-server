// const Logger = require("../../logger");
const { validationResult } = require("express-validator");
const _ = require("lodash");
const { httpStatusCode, message, exception } = require("../../constants");
const SignUp = require("../../libs/Signup");
const login = require("../../libs/Login");

/**
 * POST /auth/signup
 * User Sign Up.
 */
exports.signUp = (req) => {
  return new Promise((resolve, reject) => {
    try {
      const validationErrors = validationResult(req);
      if (!_.isEmpty(validationErrors.errors)) {
        return reject({
          code: httpStatusCode.BAD_REQUEST,
          message: validationErrors.array(),
        });
      }
      // your sign up function from libs or helper functions
      const signUpFun = async () => {
        const result = await SignUp(req);

        if (result === 409) {
          return reject({
            code: httpStatusCode.CONFLICT,
            message: message.USER_ALREADY_EXISTS,
          });
        } else if (result === 200) {
          return resolve({
            code: httpStatusCode.OK,
            message: message.USER_REGISTERED,
          });
        }
      };
      signUpFun();
    } catch (error) {
      Logger.error(error);
      return reject({
        code: httpStatusCode.INTERNAL_SERVER_ERROR,
        message: message.INTERNAL_SERVER_ERROR,
      });
    }
  });
};

/**
 * POST /auth/login
 * User Log In
 */

exports.login = (req) => {
  return new Promise((resolve, reject) => {
    try {
      const validationErrors = validationResult(req);
      if (!_.isEmpty(validationErrors.errors)) {
        return reject({
          code: httpStatusCode.BAD_REQUEST,
          message: validationErrors.array(),
        });
      }
      // your sign up function from libs or helper functions
      const loginFun = async () => {
        const result = await login(req);

        if (result === 404) {
          return reject({
            code: httpStatusCode.NOT_FOUND,
            message: message.USER_NOT_FOUND,
          });
        } else if (result === 401) {
          return resolve({
            code: httpStatusCode.UNAUTHORIZED,
            message: exception.INVALID_PASSWORD,
          });
        }
      };
      loginFun();
    } catch (error) {
      Logger.error(error);
      return reject({
        code: httpStatusCode.INTERNAL_SERVER_ERROR,
        message: message.INTERNAL_SERVER_ERROR,
      });
    }
  });
};
