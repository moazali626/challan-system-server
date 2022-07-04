const express = require("express");
const routes = require("./routes");
const Auth = require("../../middleware/auth");
const { signUpValidator, loginValidator } = require("./validator");
const serviceRouter = express.Router();

serviceRouter.post("/signup", signUpValidator, routes.signUpRoute);
serviceRouter.post("/login", loginValidator, routes.loginRoute);

module.exports = serviceRouter;
