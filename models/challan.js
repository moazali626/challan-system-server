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
    required: true,
    type: "ObjectId",
    ref: "student",
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
});

module.exports = mongoose.model("challan", challanSchema);
