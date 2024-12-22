//documents model
const mongoose = require("mongoose")

const documentsModel = mongoose.Schema({
    name:{type:String,required:true},
    quantity:{type:Number,required:true},
    price:{type:Number,required:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:"Admin"},
    date: { type: Date, default: Date.now }
})

const Documents = mongoose.model("documents",documentsModel);

module.exports = Documents;



