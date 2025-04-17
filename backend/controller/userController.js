const User = require("../models/userModel");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.signup=async(req,resp)=>{
    try{
        const {fullName,userName,password,gender}=req.body;
        const check=await User.findOne({userName});
        if(check)
        {
            return resp.status(401).json({
                success:false,
                message:"UserName already Exist"
            })
        }
        const girl="https://avatar.iran.liara.run/public/girl";
        const boy="https://avatar.iran.liara.run/public/boy";
        const hashedPassword=bcrypt.hash(password,10);

        const newUser=await User.create({fullName,userName,gender,
            profilePhoto:gender=="male"?boy:girl,
            password:hashedPassword
        })
        return resp.status(200).json({
            success:true,
            message:"Signup Successful"
        })
    }
    catch(err){
        return resp.status(500).json({
            success:false,
            message:"Error in SIgnup"+err.message
        })
    }
}
exports.login=async(req,resp)=>{
    try{
        const {userName,password}=req.body;
        const check=await User.findOne({userName});
        if(!check)
        {
            return resp.status(401).json({
                success:false,
                message:"UserName Dont Exist"
            })
        }
        if(!bcrypt.compare(password,check.password)){
            return resp.status(401).json({
                success:false,
                message:"Password Dont Match"
            })
        }
        const data={
            id:check._id
        }
        const token= jwt.sign(data,"Shivam",{expiresIn:"1h"});

        return resp.status(200).json({
            success:true,
            message:"Login Successful",
            token
        })
    }
    catch(err){
        return resp.status(500).json({
            success:false,
            message:"Error in Login"+err.message
        })
    }
}

exports.getOtherUser=async(req,resp)=>{
    try{
        const myId=req.user.id;
        if(!myId) 
            return resp.status(401).json({
                success:false,
                message:"User Id missing",
            })
        
        const otherUser=await User.find({_id:{$ne:myId}});
        return resp.status(200).json({
            success:true,
            message:"User Fetched Successfully",
            otherUser
        })
        
    }
    catch(err){
        return resp.status(500).json({
            success:false,
            message:"Error in getOtherUser"+err.message
        })
    }
}