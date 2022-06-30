const jwt = require("jsonwebtoken");
const User = require("../models/user");

const isAuth = async (req, res, next) => {
  try {
    const token = req.body.storedToken;

    if (!token) {
      return res.send({ error: "Please authenticate" });
    }

    const decoded = jwt.verify(token, "Pm1qWmxsbP");

    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      return res.status(404).send();
    }

    req.user = user;

    next();
  } catch (e) {
    res.send(e);
  }
};

module.exports = isAuth;
