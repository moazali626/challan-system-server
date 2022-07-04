const { signUp } = require("../../../controller/auth/index");

exports.signUpRoute = async (req, res) => {
  try {
    const resp = await signUp(req);
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
};

// exports.loginRoute = async (req, res) => {
//   try {
//     const resp = await login(req);
//     res.json(resp);
//   } catch (err) {
//     res.json(err);
//   }
// };
