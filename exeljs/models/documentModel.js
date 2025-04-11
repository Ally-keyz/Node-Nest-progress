const mongoose = require("mongoose");

const documentShema = new mongoose.Schema({
    name:{type:String,required:true},
    code:{type:String,required:true},
    quantityIn:{type:Number,required:true},
    quantityOut:{type:Number,required:true},
    balance:{type:Number,required:true}
});

const documentModel = mongoose.model("Documents",documentShema);

module.exports = documentModel