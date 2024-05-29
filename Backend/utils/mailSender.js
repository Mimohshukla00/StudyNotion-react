const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: "StudyNotion||StudyHUB-Mimoh",

      to: `${email}`,
      subject: `${title}`,
      html: `<h1>${body}</h1>`,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = mailSender;
