const {Server} = require("socket.io");
const express = require("express");
const app = express() ;
const http = require("http");

const server = http.createServer(app);
const io = new Server(server,{
    cors : {
        origin : "http://localhost:5173" ,
        methods : ["POST","GET"]
    }
});

const getSocketId = (id)=>{
    return userSocketMap[id]
}


const userSocketMap = {} ;

io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId ;
    if(userId){
        userSocketMap[userId] = socket.id;
        console.log(userSocketMap)
        console.log(`User Connected with USER_ID: ${userId} and SOCKET_ID : ${socket.id}`)
    }
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    socket.on("disconnect",()=>{
        if(userId){
            delete userSocketMap[userId];
            console.log(`User Dis-Connected with USER_ID: ${userId} and SOCKET_ID : ${socket.id}`)
        }
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})

module.exports = {io,app,server,getSocketId}