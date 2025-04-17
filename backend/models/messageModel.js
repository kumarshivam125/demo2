const mongoose=require('mongoose');

const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
    },
    message:{
        type:String
    }
})
const Message=mongoose.model('Message',messageSchema);
module.exports=Message;