const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((error) => {
      console.log(error);
      console.log("DB connection failed");
      process.exit(1);
    });
};
