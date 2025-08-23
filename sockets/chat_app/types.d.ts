
export interface User {
    Id : string,
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