//documents model
const mongoose = require("mongoose")

const documentsModel = mongoose.Schema({
    name:{type:string,required:true},
    quantity:{type:Number,required:true},
    price:{type:Number,required:true},
    Author:{type:mongoose.Schema.Types.ObjectId,ref:"Admin"}
})

const Documents = mongoose.model("documents",documentsModel);

module.exports = Documents;



