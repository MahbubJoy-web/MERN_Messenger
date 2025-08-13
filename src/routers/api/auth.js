const express = require ('express')
const { registration, OtpVerification } = require('../../Controllers/authController')
const authRoute = express.Router()

authRoute.post('/registraion' , registration)
authRoute.post('/otpVerification' , OtpVerification)


module.exports = authRoute