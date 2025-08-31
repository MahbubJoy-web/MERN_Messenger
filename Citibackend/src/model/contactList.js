const mongoose = require('mongoose')

const contactList = new mongoose.Schema({
    adderId:{
        type: mongoose.Schema.ObjectId,
        ref : 'authallUser',
        required : true
    },
    addingUserId:{
        type: mongoose.Schema.ObjectId,
        ref : 'authallUser',
        required : true
    },
    LastMsg:{
        type: String,
        default: null
    }
},{timestamps:true})

module.exports = mongoose.model('contactUser' , contactList)