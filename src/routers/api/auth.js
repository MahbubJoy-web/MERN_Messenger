const express = require ('express')
const { registration, OtpVerification, resnedOtp, Login, updateProfile,  } = require('../../Controllers/authController')
const tokenVerification = require('../../middleware/tokenVerification')
const authRoute = express.Router()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

authRoute.post('/registraion' , registration)
authRoute.post('/otpVerification' , OtpVerification)
authRoute.post('/resendOtp' , resnedOtp)
authRoute.post('/login' , Login)
authRoute.post('/updateProfile', tokenVerification, upload.single('avatar'), updateProfile)


module.exports = authRoute