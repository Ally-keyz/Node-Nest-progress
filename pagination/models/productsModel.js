const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    quantity:{type:String,required:true},
    price:{type:String,required:true},
    date:{type:Date,default:Date.now()}
});

const product = mongoose.model("products",productSchema);

module.exports = product;