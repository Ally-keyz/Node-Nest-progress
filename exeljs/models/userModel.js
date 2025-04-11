const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:Email,required:true},
    password:{type:String,required:true}
});

const userModel = mongoose.model("User",userSchema);

module.exports = userModel;