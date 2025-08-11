const express = require ('express')
const { registration } = require('../../Controllers/authController')
const authRoute = express.Router()

authRoute.post('/registraion' , registration)


module.exports = authRoute