const express = require('express')
const authRoute = require('./api/auth')
const msgrouter = require('./api/msgApi')
const routers = express.Router()


routers.use('/auth' , authRoute)
routers.use('/msg' , msgrouter)


module.exports = routers