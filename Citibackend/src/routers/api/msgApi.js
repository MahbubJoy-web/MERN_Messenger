const express = require('express')
const { allUser, addToContact,  usercontactList } = require('../../Controllers/msgContoller')
const msgrouter = express.Router()

msgrouter.get('/allUser/:userID', allUser)
msgrouter.post('/addtocontact', addToContact)
msgrouter.get('/contactlist/:userID', usercontactList)

module.exports = msgrouter
