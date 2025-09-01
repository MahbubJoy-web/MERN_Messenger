const mongoose = require('mongoose')

const contactList = new mongoose.Schema({
    adderId:{
        type: mongoose.Schema.ObjectId,
        ref : 'allUser',
        required : true
    },
    addingUserId:{
        type: mongoose.Schema.ObjectId,
        ref : 'allUser',
        required : true
    },
    LastMsg:{
        type: String,
        default: null
    }
},{timestamps:true})

module.exports = mongoose.model('contactUser' , contactList)