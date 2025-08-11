const express = require('express')
const authRoute = require('./api/auth')
const routers = express.Router()


routers.use('/auth' , authRoute)

module.exports = routers