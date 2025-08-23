const mongoose  = require("mongoose")

// we have then to create the schema
const achivementSchema = new mongoose.Schema({
    type:{type:String,default:"None",required:true},
    userId:{type:mongoose.Types.ObjectId,ref:"User",required:true},
    dateAchived:{type:Date,default:Date.now(),required:true}

})

const achivementModel = mongoose.model("Achivements",achivementSchema)

module.exports = achivementModel