const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  mode: {
    type: Number,
    required: true,
    enum: [1, 2, 4],
  },
});

module.exports = mongoose.model("student", studentSchema);
