const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/User.model");

// auth
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer", "");
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token is missing" });
    }
    // verify the token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = decoded;
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: false,
      error: "something went wrong while validating the token",
    });
  }
};

// is student
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType != "Student") {
      return res
        .status(401)
        .json({ success: false, message: "You are not a student" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: false,
      error: "User role is not verified ",
    });
  }
};
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType != "instructor") {
      return res
        .status(401)
        .json({ success: false, message: "You are not a instructor" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: false,
      error: "User role is not verified ",
    });
  }
};
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType != "admin") {
      return res
        .status(401)
        .json({ success: false, message: "You are not a instructor" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: false,
      error: "User role is not verified ",
    });
  }
};
