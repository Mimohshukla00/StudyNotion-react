const User = require("../models/User.model");
const mailSender = require("../utils/mailSender");

// reset password token
exports.resetPasswordToken = async (req, res) => {
  const url = "https://localhost:3000/update-password/${token}";
};
