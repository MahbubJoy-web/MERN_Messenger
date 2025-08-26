const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "mahbubhasan1322@gmail.com",
    pass: "ckdt rrda vqqb rsqi",
  },
});

const sendOTPEmail = async ( email, template) => {
  const info = await transporter.sendMail({
    from: 'Chatting App',
    to: email,
    subject: "OTP Verification Code",
    text: "Hello world?",
    html: template,
  });

  console.log("Message sent:", info.messageId);
};

module.exports = { sendOTPEmail };