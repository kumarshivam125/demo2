const Conversation=require('../models/conersationModel');
const Message=require('../models/messageModel');
const { getRecieverSocketId, io } = require('../socket/socket');

exports.sendMessage=async(req,resp)=>{
    try{ 
        const {message}=req.body;
        const senderId=req.user.id;
        const recieverId=req.params.id;
        let gotConversation=await Conversation.find({particapants:{$all:[senderId,recieverId]}});
        if(!gotConversation){
            gotConversation=await Conversation.create({particapants:[senderId,recieverId]});
        }
        const newMessage=await Message.create({senderId,recieverId,message});
        gotConversation.messages.push(newMessage._id);

        const recieverSocketId=getRecieverSocketId(recieverId);
        io.to(recieverSocketId).emit("newMessage",newMessage);

        return resp.status(200).json({
            success:true,
            message:"Message Sent",
            newMessage
        })
    }
    catch(err){
        return resp.status(500).json({
            success:false,
            message:"Error in sendMessage"+err.message
        })
    }
}

exports.getMessage=async(req,resp)=>{
    try{
        const senderId=req.user.id;
        const recieverId=req.params.id;

        const allMessages=await Conversation.find({particapants:{$all:[senderId,recieverId]}}).populate("messages");

        return resp.status(200).json({
            success:true,
            message:"All mesaaged Fetched",
            allMessages
        })
    }
    catch(err){
        return resp.status(500).json({
            success:false,
            message:"Error in getMessage"+err.message
        })
    }
}