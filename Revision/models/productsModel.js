const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{type:String,required:true},
    type:{type:String,required:true},
    date:{type:Date,default:Date.now()}
})

const product = mongoose.model("products",productSchema)

module.exports = product;