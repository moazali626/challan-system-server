const express = require("express");
const routes = require("./routes/index");
const Auth = require("../../middleware/auth");
const { generateChallanValidator } = require("./validator");
const { updateStatusValidator } = require("./validator");
const serviceRouter = express.Router();

serviceRouter.post(
  "/generate-challan",
  generateChallanValidator,
  routes.generateChallanRoute
);
serviceRouter.get("/display-challan", routes.displayChallanRoute);
serviceRouter.post(
  "/update-challan",
  updateStatusValidator,
  routes.updateChallanRoute
);

module.exports = serviceRouter;
