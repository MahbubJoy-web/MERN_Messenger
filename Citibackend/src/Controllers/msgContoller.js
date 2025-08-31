const { send } = require("vite");
const authSchema = require("../model/authSchema");
const contactList = require("../model/contactList");


// ================All user ================ //
const allUser = async (req,res)=>{
try{
    const currentUserId =(req.params.userID)
    
    const DBUserData = await authSchema.find({})
    
    const allUserInfo = DBUserData.map((item)=>{
    
       const userData ={}
    
       if(item._id != currentUserId){
           userData.userID = item._id,
           userData.firstName = item.firstName,
           userData.lastName = item.lastName,
           userData.email = item.email,
           userData.avater = item.avater
           return userData
       }
    })
    
    res.send(allUserInfo)

}
catch(err){
    return res.send(err)
}  
}
// =================contact List================== //

const addToContact = async (req , res)=>{
    const {adderId , addingUserId} = req.body

    if(!adderId) return res.status(404).send('Please Add Anybody to Contact')
    if(!addingUserId) return res.status(404).send('Please Adding Anybody to Contact')

        await new contactList({adderId , addingUserId}).save()

    res.status(200).send('User Added to Contact')
}

module.exports = {allUser , addToContact}