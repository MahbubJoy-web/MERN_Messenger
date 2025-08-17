const express = require ('express')
const { registration, OtpVerification, resnedOtp, Login,  } = require('../../Controllers/authController')
const authRoute = express.Router()

authRoute.post('/registraion' , registration)
authRoute.post('/otpVerification' , OtpVerification)
authRoute.post('/resendOtp' , resnedOtp)
authRoute.post('/login' , Login)


module.exports = authRoute