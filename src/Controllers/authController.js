const { generateOTPNumber, getTimeAfter3Minutes } = require("../helpers/allGenarator")
const { emailRegex, passwordRegex } = require("../helpers/allRegex");
const { sendOTPEmail } = require("../helpers/otpSender");
const authSchema = require("../model/authSchema")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require("nodemailer");
const { otpVerificationTemplate } = require("../helpers/otpTemplate");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "mahbubhasan1322@gmail.com",
    pass: "ckdt rrda vqqb rsqi",
  },
});


// =============Registration Controller =============== //
const registration = async (req,res)=>{
    const {firstName, lastName, email, gender, phone, password} = req.body

    if(!firstName || !lastName || !email || !gender || !phone || !password) return res.status(401).send('fill the all input')
    if(!emailRegex.test(email)) return res.status(401).send('invaild Email')
    if(!passwordRegex.test(password)) return res.status(401).send('Password must be at least 8 characters and include at least one uppercase letter and one number')

     const existUser = await authSchema.findOne({email})

     if(existUser) return res.status(406).send('User already exist')

    let avater = ""

    if(gender == "male") avater ='https://uxwing.com/wp-content/themes/uxwing/download/business-professional-services/man-waiter-icon.png'
    if(gender == "female") avater ='https://uxwing.com/wp-content/themes/uxwing/download/business-professional-services/businesswoman-icon.png'

    const hashPassword = await bcrypt.hash(password, saltRounds)

    const otp = generateOTPNumber()

    const saveModel = new authSchema({
        firstName : firstName.trim(),
        lastName : lastName.trim(),
        email,
        gender,
        phone,
        password : hashPassword,
        avater ,
        otp,
        expireOtpTime : getTimeAfter3Minutes()
    }).save()
    .then(() => {
      sendOTPEmail(email, otpVerificationTemplate(lastName, otp))
    });

    res.send('user Register')
    
}

// ===============OTP Verification Controller================ //

const OtpVerification = async (req, res) =>{
  const { otp } = req.body

  if(!otp) return res.status(401).send('OTP is required')
  if(otp.toString().length !== 6) return res.status(401).send('OTP must be 6 digits')
  if(isNaN(otp)) return res.status(401).send('OTP must be a number')
  
  const dbOtp = await authSchema.findOne({otp})

  if(!dbOtp) return res.status(401).send('Invaild OTP')
  
  if(dbOtp.expireOtpTime < Date.now()) return res.status(401).send('OTP Expired')
    dbOtp.isVerified = true
  dbOtp.otp = null
  dbOtp.expireOtpTime = null

  res.send('OTP Verified')

}

module.exports = {registration , OtpVerification} 