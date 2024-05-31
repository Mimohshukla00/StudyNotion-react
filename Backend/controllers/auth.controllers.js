const User = require("../models/User.model");
const OTP = require("../models/OTP.model");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// send otp

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    // check the user if exists
    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }
    // generate password
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP generated", otp);

    // check the otp is unique or not
    const result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    //payload of otp
    const payload = {
      email,
      otp,
    };
    //creation of otp entry
    const otpEntry = new OTP(payload);
    console.log(otpEntry);
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//signup >>>1-data fetch,2-validation  3-password matching,4-check user existan

exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      password,
      email,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    if (!firstName || !lastName || !password || !confirmPassword || !otp) {
      return res.status(403).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    //check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match",
      });
    }

    // check user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    // find most recent otp stored for the user
    const recentOtp = await User.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOtp);
    //check if otp is correct
    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Otp not found",
      });
    } else if (otp != recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Otp is incorrect",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // entry in db

    const profileDetails = await profileModel.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additonalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName},`,
    });
    // return response
    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "user cannot be regsitered",
    });
  }
};

exports.login = async (req, res) => {
  try {
    // get data from body
    const { email, password } = req.body;

    // validation data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    // user check exixting or not\
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User not found",
      });
    }

    // generate JWT after password matching

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const payload = {
        email: user.email,
        id: user._id,
        role: user.accountType,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;
      // create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "logged in successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "login failure,please try again ",
    });
  }
};

// // changed password
// const changePassword = async (req, res) => {
//   // get data from req.data
//   // get old password ,newpassword ,confirm pass
//   // validation
//   //update password in db
//   // send mail-password
//   // / return response

//   try {
//     const {}

//   } catch (error) {

//   }
// }
