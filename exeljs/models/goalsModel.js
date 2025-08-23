const mongoose=require("mongoose");
//define schema
const rentschema= new mongoose.Schema({
     type:{type:String,required:true},
     book:{type:String,required:true},
     durration:{type:String,required:true},
     achieved:{type:Boolean,default:false},
     userId:{type:mongoose.Types.ObjectId,ref:"User",required:true},
     date:{type:Date,default:Date.now(),required:true}
})
const  rentModel=mongoose.model("Goals",rentschema);

module.exports = rentModel; 


