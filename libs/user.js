const User = require("../models/user");
// const Logger = require("../logger");

exports.findOneUser = (obj) => {
  return new Promise((resolve) => {
    try {
      User.findOne(obj, (err, user) => {
        if (err) {
          //   Logger.error(err);
          return resolve(null);
        }
        return resolve(user ? user : null);
      });
    } catch (error) {
      //   Logger.error(error);
      return resolve(null);
    }
  });
};
