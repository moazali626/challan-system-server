const { getClassName } = require("../../../controller/class/index");
const { addClass } = require("../../../controller/class/index");

exports.addClassRoute = async (req, res) => {
  try {
    const resp = await addClass(req);
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
};

exports.getClassNameRoute = async (req, res) => {
  try {
    const resp = await getClassName();
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
};
