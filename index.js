const exp = require("constants");
const express = require("express");
const app = express();
require("dotenv").config();
const database = require("./config/database");

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db connection
database.connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
