const mongoose = require("mongoose");

const classSchema = mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("class", classSchema);
