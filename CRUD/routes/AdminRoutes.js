//Admin authantication
const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken")
const Admin = require("../models/AdminModel")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const app = express()
const AuthController= require("../Controllers/auth")
const documents = require("../models/documents")

//load environment variables
dotenv.config()

//admin login

router.post("/login",async(req,res)=>{
    try {
        const{name , password} = req.body;

        if(!name || !password){
            return res.status(400).json({error:"All fields are required"})
        }
        const user = await Admin.findOne({ name });
        if(!user){
            return res.status(404).json({error:"User not found"});
        }
         const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({error:"Invalid credentials"})
        }
        const token = jwt.sign({id:user._id,name:user.name},process.env.JWT_KEY,{expiresIn:"1h"});
        res.status(200).json({message:"User Logged in",token:token})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.post("/register",AuthController)

router.put("/users/:id",async(req,res)=>{
    try {
        const updatedUser = await Admin.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updatedUser){
            return res.status(404).json({error:"User not found"})
        }
        res.status(200).json({message:"updating success",updatedUser})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.get("/users",async(req,res)=>{
    try {
        const users = await Admin.find().populate("documents").lean();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

router.post("/documents",async(req,res)=>{
    try {
        const {name,quantity,price,author,date} = req.body

        if(!name || !quantity || !price || !author){
            return res.status(400).json({error:"All fields are required"});
        }
        const newDoc = await new documents({
            name,
            quantity,
            price,
            author,
            date
        })
        const savedDoc = await newDoc.save()
        res.status(201).json({message:"Documents uploaded",savedDoc})
    } catch (error) {
        res.status(500).json({error:{error:error.message}})
    }
})

//find the author based on the id
router.post("/documents/author/:id",async(req,res)=>{
    try {
        const author = await Admin.findById(req.params.id);
        if(!author){
            return res.status(404).json({error:"Not found"});
        } 
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

module.exports = router