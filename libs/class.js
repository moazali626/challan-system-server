const Class = require("../models/class");
// const Logger = require("../logger");

exports.findOneClass = (obj) => {
  return new Promise((resolve) => {
    try {
      Class.findOne(obj, (err, user) => {
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
