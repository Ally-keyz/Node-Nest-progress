

export interface User {
    Id : string ,
    userName : string ,
    isActive : boolean
}

export interface Message {
    senderId : string,
    receiverId : string ,
    content : string,
    timeStamp : Date
}

export interface Chat {
   users : [User , User] ,
   message : Message[]
}

export interface serverToClientEvents {
    "active_users" : (activeUsers: User[])=> void ;
    "incoming-message" : (message : Message) => void ;
    "typing" : (socketId:string)=> void ;
}

export interface clientToServerEvents {
    "newUser" : (userName : string) => void ;
    "message" : (data : Message) => void ;
    "typing"  : (receiverId : string) => void ;
}