import mongoose ,{Document , Model} from "mongoose";
import { Message } from "../../types.js";


interface messageBluePrint  extends Message , Document {}

const messageSchema = new mongoose.Schema <messageBluePrint>({
    senderId: {type:String , required:true} ,
    receiverId : {type:String , required:true} ,
    content : {type : String , required : true} ,
    timeStamp : {type: Date , default :Date.now()}
});

const messageModel : Model <messageBluePrint> = mongoose.model("Messages", messageSchema);

export default messageModel