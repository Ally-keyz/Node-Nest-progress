const mongoose = require("mongoose");

//define the schema
const bookSchema = new mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String, required:true},
    genre:{type:String, required:true},
    coverImage:{type:Number,required:true},
    pdfFilePath:{type:String,required:true},
    summary:{type:String,required:true},
    totalPages:{type:String,required:true},
    user:{type:mongoose.Types.ObjectId,ref:"User"},
    date:{type:Date,required:true}
});

const bookModel = mongoose.model("Books",bookSchema);

module.exports = bookModel;