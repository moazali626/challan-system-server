const User = require("../models/user");
const bcrypt = require("bcrypt");
const { httpStatusCode } = require("../constants");
const jwt = require("jsonwebtoken");

const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if user already exists
    const isRegistered = await User.findOne({ email });

    if (isRegistered) {
      return httpStatusCode.CONFLICT;
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

    return { code: httpStatusCode.OK, token: token };
  } catch (e) {
    // res.send(e);
  }
};

module.exports = SignUp;
