const express = require("express");
const routes = require("./routes/index");
const Auth = require("../../middleware/auth");
const { addClassValidator } = require("./validate");
const serviceRouter = express.Router();

serviceRouter.post("/add-class", addClassValidator, routes.addClassRoute);
serviceRouter.get("/get-class-name", routes.getClassNameRoute);

module.exports = serviceRouter;
