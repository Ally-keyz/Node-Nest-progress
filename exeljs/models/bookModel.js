const mongoose = require("mongoose");

//define the schema
const bookSchema = new mongoose.Schema({
    name:{type:String,required:true},
    author:{type:String, required:true},
    suplier:{type:String, required:true},
    quantity:{type:Number,required:true},
    date:{type:Date,required:true}
});

const bookModel = mongoose.model("Books",bookSchema);

module.exports = bookModel;