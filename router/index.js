const express = require("express");
const serviceRouter = express.Router();

serviceRouter.use("/auth", require("../services/auth"));
serviceRouter.use("/student", require("../services/student"));
serviceRouter.use("/class", require("../services/class"));
serviceRouter.use("/challan", require("../services/challan"));

module.exports = serviceRouter;
