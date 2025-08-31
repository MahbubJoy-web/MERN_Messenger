const express = require('express')
const { allUser, addToContact } = require('../../Controllers/msgContoller')
const msgrouter = express.Router()

msgrouter.get('/allUser/:userID', allUser)
msgrouter.post('/contactlist', addToContact)

module.exports = msgrouter
