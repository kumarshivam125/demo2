const mongoose=require('mongoose');

const dbConnect=async()=>{
    mongoose.connect('mongodb://localhost:27017/chatApp')
    .then(()=>console.log("Database connection started"))
    .catch((err)=>console.log("Error in DB Connection",err))
}

module.exports=dbConnect;
