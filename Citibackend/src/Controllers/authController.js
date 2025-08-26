const { generateOTPNumber, getTimeAfter3Minutes } = require("../helpers/allGenarator")
const { emailRegex, passwordRegex } = require("../helpers/allRegex");
const { sendOTPEmail } = require("../helpers/otpSender");
const authSchema = require("../model/authSchema")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;
const nodemailer = require("nodemailer");
const { otpVerificationTemplate } = require("../helpers/otpTemplate");
const express = require("express");
const cloudinary = require ('cloudinary').v2 
const fs = require('fs');

   // Configuration Cloudinary
    cloudinary.config({ 
        cloud_name: 'dlycbhpqw', 
        api_key: '446375346324896', 
        api_secret: 'n0YpcXgiAtby59lrAQT8lwcs7Os' // Click 'View API Keys' above to copy your API secret
    });


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
    if(!emailRegex.test(email)) return res.status(401).send('Invaild Email')
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
    })
    
    saveModel.save()
    .then(() => {

      const UserInfo = {
        'userId' : saveModel.id,
        'firstName' : saveModel.firstName,
        'lastName' : saveModel.lastName,
        'email' : saveModel.email,
        'avater' : saveModel.avater,
        'phone' : saveModel.phone,
        'gender' : saveModel.gender
      }

      res.status(201).send({UserInfo : UserInfo})
      sendOTPEmail(email, otpVerificationTemplate(lastName, otp))
    });
    
}
// ================otp verify by button ============== //


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

  dbOtp.save()

}

// ===========Resend OTP Controller =========== //
const resnedOtp = async (req, res) =>{
    const {email} = req.body

    if(!email) return res.status(401).send('Email is required')

    const existUser = await authSchema.findOne({email})
    
    if(!existUser) return res.status(401).send('User not found')
    
    const otp = generateOTPNumber()

    existUser.otp = otp
    existUser.expireOtpTime = getTimeAfter3Minutes()
    existUser.isVerified = false
    existUser.save()
    .then(()=>{
      sendOTPEmail(email, otpVerificationTemplate(existUser.lastName, otp))
    })

    res.send('OTP Resend')

}

// ==================Login Controller =============== //
const Login = async (req, res)=>{
  const { email , password} = req.body

  if(!email || !password) return res.status(401).send('Email and Password are required')

  const dbUser = await authSchema.findOne({email})

  if(!dbUser) return res.status(401).send('User Not Found')
  
  if(dbUser.isVerified == false) return res.status(401).send('Please Verify the your Email')
  
  const bcryptpass = await bcrypt.compare(password , dbUser.password)

  if(!bcryptpass) return res.status(401).send('Wrong Password') 

  const JwtToken = jwt.sign({ email: dbUser.email }, process.env.jwtToken_code, { expiresIn: '1h' });
  
  const UserInfo = {
    'userId' : dbUser.id,
    'firstName' : dbUser.firstName,
    'lastName' : dbUser.lastName,
    'email' : dbUser.email,
    'avater' : dbUser.avater,
    'phone' : dbUser.phone,
    'gender' : dbUser.gender
  }

      res.status(201).send({UserInfo : UserInfo , accessToken : JwtToken})
}

// ================ Update Profile ================ //
const updateProfile = async (req , res) =>{
    const { currentUserId, firstName, lastName, email, avater, phone,gender } = req.body

    const existUser = await authSchema.findOne({_id: currentUserId})

    //  Email Update Handle 
    if (email && email !== existUser.email) {
      if (!emailRegex.test(email)) return res.status(401).send('Invalid Email');

      const emailExist = await authSchema.findOne({ email });
      if (emailExist) return res.status(401).send('Email already in use');

      // OTP Generate
      const otp = generateOTPNumber();

      // replace DB Data
      existUser.email = email.trim();
      existUser.otp = otp;
      existUser.expireOtpTime = getTimeAfter3Minutes();
      existUser.isVerified = false;

      // sent OTP Email 
   await sendOTPEmail(email, otpVerificationTemplate(lastName || existUser.lastName, otp));
}

       // Upload an image
       if(req.file){
     await cloudinary.uploader
       .upload(
           req.file.path, {
               public_id: Date.now(),
           }
       )
       .then((data)=>{
         existUser.avater = data.url 
         fs.unlink(req.file.path, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
            } else {
              console.log('File deleted successfully');
            }
          })

       })
       .catch((error) => {
           console.log(error);
       });  

      }
      // Update other fields
      existUser.firstName = firstName? firstName.trim() : existUser.firstName
      existUser.lastName = lastName? lastName.trim() : existUser.lastName
      existUser.gender = gender? gender : existUser.gender
      existUser.phone = phone? phone : existUser.phone

      existUser.save()
      res.send(existUser)

}

module.exports = {registration , OtpVerification , resnedOtp , Login, updateProfile} 