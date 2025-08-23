const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    readingGoals:{type:mongoose.Types.ObjectId,ref:"Goals"},
    finishedBooks:{type:mongoose.Types.ObjectId,ref:"Books"},
    currentBook:{type:mongoose.Types.ObjectId,ref:"currentBooks"}
});

const userModel = mongoose.model("User",userSchema);

module.exports = userModel;