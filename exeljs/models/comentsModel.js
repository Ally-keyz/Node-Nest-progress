const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId,ref:"User",required:true},
    bookId:{type:mongoose.Types.ObjectId,ref:"Books"},
    commentText:{type:String,required:true},
    createdAt:{type:String,required:true}
});

const commentModel = mongoose.model( "Comments", commentSchema)

module.exports = commentModel;