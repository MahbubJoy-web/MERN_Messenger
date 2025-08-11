const mongoose = require('mongoose')

dbConection = ()=>{
    mongoose.connect(process.env.dbLink)
    .then(()=>console.log('db connected'))
    .catch((err)=>console.log('db faild' (err)) )
}


module.exports = {dbConection}