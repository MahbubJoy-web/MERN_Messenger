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
// =================add to contact List================== //

const addToContact = async (req , res)=>{
    try{
        const {adderId , addingUserId} = req.body
    
        if(!adderId) return res.status(404).send('Please Add Anybody to Contact')
        if(!addingUserId) return res.status(404).send('Please Adding Anybody to Contact')
        
        const existContact = await contactList.findOne({ 
            adderId: adderId, 
            addingUserId: addingUserId 
        });
        const secendexistContact = await contactList.findOne({ 
            adderId: addingUserId, 
            addingUserId: adderId 
        });
    
        if(existContact || secendexistContact){
            return res.status(400).send('user is already in your contact list')
        }
        await new contactList({adderId , addingUserId}).save()
    
        res.status(200).send('User Added to Contact')
    }
    catch(err){
        res.status(500).send('Something Went wrong')
    }
}

// ============= get Contact list Api ============== //
const usercontactList = async (req, res)=>{
    const currentUserId = req.params.userID

    
    const allUserList = await contactList.find({$or: [{adderId : currentUserId} , {addingUserId : currentUserId}]}).populate('adderId' , 'firstName lastName email avater').populate('adderId' , 'firstName lastName email avater')
    
    res.send(allUserList)

}

module.exports = {allUser , addToContact ,usercontactList}