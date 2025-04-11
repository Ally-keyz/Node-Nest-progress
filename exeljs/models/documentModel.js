const mongoose = require("mongoose");

const documentShema = new mongoose.Schema({
    date:{type:Date,default:Date.now()},
    type:{type:String,required:true},
    user:{type:mongoose.Types.ObjectId,ref:"User"}
});

const documentModel = mongoose.model("Documents",documentShema);

module.exports = documentModel