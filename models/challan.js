const mongoose = require("mongoose");

const challanSchema = mongoose.Schema({
  fees: {
    type: Number,
    required: true,
  },
  issueDate: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  mode: {
    type: Number,
    required: true,
  },
  challan: {
    type: "ObjectId",
    ref: "student",
  },
});

module.exports = mongoose.model("challan", challanSchema);
