// const Logger = require("../../logger");
const { validationResult } = require("express-validator");
const _ = require("lodash");
const { httpStatusCode, message, exception } = require("../../constants");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * POST /auth/signup
 * User Sign Up.
 */
exports.signUp = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const validationErrors = validationResult(req);
      if (!_.isEmpty(validationErrors.errors)) {
        return reject({
          code: httpStatusCode.BAD_REQUEST,
          message: validationErrors.array(),
        });
      }

      //If above validation succeeds, create account code will run

      const { name, email, password } = req.body;

      //check if user already exists
      const isRegistered = await User.findOne({ email });

      if (isRegistered) {
        return reject({
          code: httpStatusCode.CONFLICT,
          message: message.USER_ALREADY_EXISTS,
        });
      }

      //hashing the password

      const hashedPassword = await bcrypt.hash(password, 10);

      //creating a new user
      const user = await User.create({
        name,
        email: email,
        password: hashedPassword,
      });

      //creating token
      const token = jwt.sign({ _id: user._id.toString() }, "Pm1qWmxsbP", {
        expiresIn: "1h",
      });

      user.token = token;
      await user.save();

      return resolve({
        code: httpStatusCode.OK,
        message: message.USER_REGISTERED,
      });
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
  return new Promise(async (resolve, reject) => {
    try {
      const validationErrors = validationResult(req);
      if (!_.isEmpty(validationErrors.errors)) {
        return reject({
          code: httpStatusCode.BAD_REQUEST,
          message: validationErrors.array(),
        });
      }

      //If above validation succedds, login account code will run

      const { email, password } = req.body;

      //check if user exists
      const user = await User.findOne({ email });

      if (!user) {
        return reject({
          code: httpStatusCode.NOT_FOUND,
          message: message.USER_NOT_FOUND,
        });
      }

      //match password
      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return resolve({
          code: httpStatusCode.UNAUTHORIZED,
          message: exception.INVALID_PASSWORD,
        });
      }

      //creating token

      const token = jwt.sign({ _id: user._id.toString() }, "Pm1qWmxsbP", {
        expiresIn: "1h",
      });

      user.token = token;

      await user.save();

      return resolve({
        code: httpStatusCode.OK,
        message: message.USER_LOGGEDIN,
      });
    } catch (error) {
      Logger.error(error);
      return reject({
        code: httpStatusCode.INTERNAL_SERVER_ERROR,
        message: message.INTERNAL_SERVER_ERROR,
      });
    }
  });
};
