const { generateOTPNumber, getTimeAfter3Minutes } = require("../helpers/allGenarator")
const { emailRegex, passwordRegex } = require("../helpers/allRegex")
const authSchema = require("../model/authSchema")
const bcrypt = require('bcrypt');
const saltRounds = 10;

const registration = async (req,res)=>{
    const {firstName, lastName, email, gender, phone, password} = req.body

    if(!firstName || !lastName || !email || !gender || !phone || !password) return res.status(401).send('fill the all input')
    if(!emailRegex.test(email)) return res.status(401).send('invaild Email')
    if(!passwordRegex.test(password)) return res.status(401).send('Password must be at least 8 characters and include at least one uppercase letter and one number')

    let avater = ""

    if(gender == "male") avater ='https://uxwing.com/wp-content/themes/uxwing/download/business-professional-services/man-waiter-icon.png'
    if(gender == "female") avater ='https://uxwing.com/wp-content/themes/uxwing/download/business-professional-services/businesswoman-icon.png'

    const hashPassword = await bcrypt.hash(password, saltRounds)

    const otp = generateOTPNumber()

    const saveModel = new authSchema({
        firstName : firstName.trim(),
        lastName : lastName.trim(),
        email,
        gender,
        phone,
        password : hashPassword,
        avater ,
        otp,
        expireOtpTime : getTimeAfter3Minutes()
    }).save()

    res.send('user Register')
    
}

module.exports = {registration} 