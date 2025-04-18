const mongoose=require("mongoose");
//difine schema
const rentschema= new mongoose.Schema({
    name:{type:String, required:true},
    borrower:{type:String,required:true},
    stutas:{type:String,required:true},
    date_rent:{type:String,required:true},
})
const  rentModel=mongoose.model("Renting",rentschema);

module.exports = rentModel; 


