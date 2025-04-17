const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
    },
    userName:{
        type:String,
    },
    password:{
        type:String,
    },
    gender:{
        type:String,
        enum:["male","female"]
    },
    profilePhoto:{
        type:String,
    },
})
const User=mongoose.model('User',userSchema);
module.exports=User;