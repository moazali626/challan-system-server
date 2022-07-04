const { addStudent } = require("../../../controller/student/index");

exports.addStudentRoute = async (req, res) => {
  try {
    const resp = await addStudent(req);
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
};
