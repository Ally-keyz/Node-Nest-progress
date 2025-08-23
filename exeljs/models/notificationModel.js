const mongoose = require("mongoose")

//we are going to create the notifications schema
const notificationSchema = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId,ref:"User" , required:true},
    message:{type:String,required:true},
    readStatus:{type:Boolean,default:false}
})

//then we have to create the model

const notificationsModel = mongoose.model("Notifications",notificationSchema)

module.exports = notificationsModel