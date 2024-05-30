const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

// function to send email
async function sendVerificationEmail(email, otp) {
  try {
    // send email with otp
    const mailresponse = await mailSender(
      email,
      "verification Email from StudyNotion",
      otp
    );
    console.log("email send successfully", mailresponse);
  } catch (error) {
    console.log("error occured while sending email", error);
    throw error;
  }
}

OTPSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.Schema("OTP", OTPSchema);
