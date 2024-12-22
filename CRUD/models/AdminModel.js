//Admin model
const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
    name:{type:String,required:true},
    title:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    documents:{type:mongoose.Schema.Types.ObjectId,ref:"documents"}
})

const Admin = mongoose.model("Admin",AdminSchema);

module.exports = Admin;