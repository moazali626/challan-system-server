const express = require("express");
const routes = require("./routes/index");
const Auth = require("../../middleware/auth");
const { addStudentValidator } = require("./validator");
const serviceRouter = express.Router();

serviceRouter.post("/add-student", addStudentValidator, routes.addStudentRoute);

module.exports = serviceRouter;
