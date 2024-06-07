const User = require("../models/User.model");
const mailSender = require("../utils/mailSender");
const bcrypt = require(bcrypt);

// reset password token
exports.resetPasswordToken = async (req, res) => {
  //get email from req.body
  //generate user for this email,email vaildation,
  //generate token
  // create url
  // send email containing the url
  // return response
  try {
    //get email from req.body
    const { email } = req.body.email;
    //check if email exists in db
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "email is not registered with us" });
    }
    // generate token
    const token = crypto.randomUUID();

    // update user by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
      
    );
    // create url
    const url = "https://localhost:3000/update-password/${token}";
    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset Link:${url}`
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong,while reseting password",
      success: false,
    });
  }
};

//reseting password
exports.resetPassword = async (req, res) => {
  //data fetch
  const { password, confirmPassword, token } = req.body;

  //validation
  if (!password || !confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Password is not matching" });
  }
  //get user details
  const userDetails = await User.findOne({ token: token });
  // if no entry-invalid token
  if (!userDetails) {
    return res.status(400).json({ success: false, message: "Invalid token" });
  }
  if (userDetails.resetPasswordExpires < Date.now()) {
    return res.status(400).json({ success: false, message: "Token expired" });
  }
  //token timvve check
  //hash password

  const hashedPassword = await bcrypt.hash(password, 10);

  //update password
  // return response
};
