const express=require('express');
const http=require('http');
const {Server}=require('socket.io');
const app=express();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:['http://localhost:3000'],
        methods:['GET','POST']
    }
});

const socketIdMap={};
export const getRecieverSocketId=(reciverId)=>{
    return socketIdMap[reciverId];
}

io.on('connection',(socket)=>{
    const userId=socket.handshake.query.userId;
    if(userId)
        socketIdMap[userId]=socket.id;

    io.emit("getOnlineUsers",Object.keys(socketIdMap));
    
    socket.on('disconnect',()=>{
        delete socketIdMap[userId];
        io.emit("getOnlineUsers",Object.keys(socketIdMap));
    })
})
export {io,server};