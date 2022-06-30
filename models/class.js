const mongoose = require("mongoose");

const classSchema = mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("class", classSchema);
