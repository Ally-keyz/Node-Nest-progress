// simple wesockets server
const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const server = http.createServer(app);
const cors = require("cors")
const io = new Server(server,{
  cors:{
    origin:"*"
  }
})

// handle socket connection
io.on("connection",(socket)=>{
    console.log("connected to a sockets server")

    //handle sending messages
    socket.on("send_message",(data)=>{
      console.log(data);
      // send data to all users
      io.emit(data);
    })
    socket.on("disconnect",()=>{
      console.log("a user disconnected")
    })
})

// handling rooms in sockets
io.on("connection",(socket)=>{
  console.log("connection established");
  socket.on("join_room",(room)=>{
    socket.join(room);
    console.log(`user:${socket.id} joined room:${room}`)
    socket.to(room).emit("user:",socket.id,"joined")
  })

  // handle sending messages
  socket.on("send_message",(data)=>{
    const { room , message } = data;
    io.to(room).emit(`sender:${socket.id} message:${message}`)
    console.log(`user:${socket.id} sent ,message:${message} to room:${room}`)
  })
})


const PORT = 5000;

server.listen(PORT,()=>{
  console.log(`listening on port ${PORT}`);
})

module.exports = app;
