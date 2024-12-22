
const jwt = require("jsonwebtoken")
const Admin = require("../models/AdminModel")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")

   Register = async (req,res)=>{
    
    try {
        const{name,title,email,password} = req.body;
        if(!name || !title || !email || !password){
            return res.status(400).json({error:"All fields are required"});
        }
        const existingUser = await Admin.findOne({email:req.body.email})
        if(existingUser){
            return res.status(400).json({error:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await new Admin({
            name,
            title,
            email,
            password:hashedPassword
        })
        const savedUser = await newUser.save()
        res.status(200).json({message:"User registered",savedUser});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
module.exports =Register;