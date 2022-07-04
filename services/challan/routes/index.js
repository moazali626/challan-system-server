const { generateChallan } = require("../../../controller/challan/index.js");
const { displayChallan } = require("../../../controller/challan/index");
const { updateChallan } = require("../../../controller/challan/index");

exports.generateChallanRoute = async (req, res) => {
  try {
    const resp = await generateChallan(req);
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
};

exports.displayChallanRoute = async (req, res) => {
  try {
    const resp = await displayChallan();
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
};

exports.updateChallanRoute = async (req, res) => {
  try {
    const resp = await updateChallan(req);
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
};
