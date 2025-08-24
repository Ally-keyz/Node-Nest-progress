import express from 'express'
import { Socket , Server} from 'socket.io'
import http from 'http'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userModel from './models/UserSchema.js'
import { clientToServerEvents, serverToClientEvents, User } from '../types.js'
import messageModel from './models/MessagesSchema.js'

const app = express();
const server = http.createServer(app)
const io = new Server<clientToServerEvents , serverToClientEvents >(server ,{
    cors:{ 
        origin:"*" 
         }
});

// middle ware for parsing origins
app.use(cors());
//configure dotenv
dotenv.config();
// weare going to be using mongo db for data storage
mongoose.connect('mongodb+srv://manzialpe:loloChat@cluster0.ax8rtc6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=> console.log('Connected to mongo'))
.catch((error) => console.error(error.message));

const activeUsers : User[]  = [] 

// handle socket connections and messaging

io.on('connection',(socket)=>{
    console.log(`User with socketId : 
        ${socket.id} connected`);                                        
    socket.on('newUser' , async(username:string)=>{
        const newUser = new userModel({
            Id:socket.id,
            userName: username ,
            isActive:true
        })
        activeUsers.push(newUser)
        await newUser.save()
        io.emit('active_users' , activeUsers)
        console.log(activeUsers);
    });
    
    socket.on('message',async(data :{receiverId: string , content: string})=>{
         const newMessage = new messageModel({
            receiverId: data.receiverId,
            senderId: socket.id,
            content: data.content,
         });
         io.to(data.receiverId).emit('incoming-message', newMessage)
         console.log(newMessage);
         await newMessage.save();
    });
    socket.on("typing",(receiverId:string)=>{
        io.to(receiverId).emit('typing',socket.id)
        console.log('socket user is typing :', socket.id);
    });

    socket.on('disconnect',()=>{
        const userIndex = activeUsers.findIndex( u => u.Id === socket.id)
        if (userIndex !== -1){
            activeUsers.splice(userIndex , 1)
        }
        console.log('user disconected: ',socket.id)
    })
})

const PORT = 5000
server.listen(PORT,()=>{
    console.log(`Server connected on port ${PORT}...`);
});
