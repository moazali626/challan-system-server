const express = require("express");
const serviceRouter = express.Router();

serviceRouter.use("/auth", require("../services/auth"));

module.exports = serviceRouter;
