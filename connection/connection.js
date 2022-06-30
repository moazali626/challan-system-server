const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/challan_system", {
      useNewUrlParser: true,
      //   useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("Database connection established");
  } catch (e) {
    console.log(e);
  }
};

module.exports = connection;
