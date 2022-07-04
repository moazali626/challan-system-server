const { httpStatusCode } = require("../constants");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return httpStatusCode.NOT_FOUND;
    }

    //match password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      console.log("returning");
      return httpStatusCode.UNAUTHORIZED;
    }

    //creating token

    const token = jwt.sign({ _id: user._id.toString() }, "Pm1qWmxsbP", {
      expiresIn: "1h",
    });

    user.token = token;

    await user.save();

    //send user details
    // res.send(user);
  } catch (e) {
    // res.send(e);
  }
};

module.exports = login;
