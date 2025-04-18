const mongoose = require(mongoose)

const returningSchema = new mangoose.Schema({
    book_id:{type:mongoose.Types.ObjectId ,ref:"Renting", required:true},
    name_of_borrower:{type:String, required:true},
    status:{type:String, required:true},
    Date_rent:{type:string, required:true},
    Date_returned:{type:string, required:true},
});

const returningModel = mongoose.model( "returning", returningSchema)

module.exports = returningModel;