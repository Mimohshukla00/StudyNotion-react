const User = require("../models/User.model");
const OTP = require("../models/OTP.model");
const otpGenerator = require("otp-generator");

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


exports.signUp=async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}