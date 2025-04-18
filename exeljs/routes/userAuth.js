const express = require("express");
const router  = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Users = require("../models/userModel");

//configure the environment variables
dotenv.config();

//lets do a route to handle the user registration
router.post("/register",async(req,res)=>{
    try {
        const {name , email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({error:"Please provide all the fields"});
        }
        const existingUser = await Users.findOne({email:email});
        if(existingUser){
            return res.status(400).json({error:"User already exist"});
        }
        const hashedPassword  = await bcrypt.hash(password,10)
        
        const newUser = new Users({
            name:name,
            email:email,
            password:hashedPassword
        });
        const savedUser = await newUser.save();
        if(!savedUser){
            return res.status(404).json({error:"Failed to save the user"});
        }
        return res.status(200).json({message:"User registered successfully",savedUser});
    } catch (error) {
        return res.status(500).json({error:`Internal server error ${error.message}`});
    }
});

//login route which also uses jwt to for authentication and authorisation
router.post("/login",async(req,res)=>{
    try {
        const{email,password} = req.body;
        if(!email ||!password){
            return res.status(400).json({error:"Please provide all fields"});
        }
        const existingUser = await Users.findOne({email:email});
        if(!existingUser){
            return res.status(404).json({error:"Email not found"});
        }
        const existingPassword = existingUser.password
        if(!existingPassword){
            return res.status(500).json({error:"Database comflict"});
        }
        
        const isMatch = await bcrypt.compare(password, existingPassword);
        console.log(isMatch)
        if(!isMatch){
            return res.status(403).json({error:"Incorect passwords please try again"})
        }
        const token = jwt.sign({id:existingUser._id,email:existingUser.email},process.env.JWT_KEY,{expiresIn:"1h"});
        if(!token){
            return res.status(500).json({error:"Failed to generate the user token"});
        }
        return res.status(200).json({message:"Logged in successfully",token:token});
    } catch (error) {
        return res.status(500).json({error:"Internal server error"});
    }
});

//route for updating users
router.put("/update/:id",async(req,res)=>{
    try {
        const id  = req.params.id;
        const body  = req.body;
        if(!id || ! body){
            return res.status(400).json({error:"please provide all fields"});
        }
        const updatedUser  = await Users.findByIdAndUpdate(id,body,{new:true});
        if(!updatedUser){
            return res.status(500).json({error:"failed to update the users"});
        }
        return res.status(200).json({message:"User updated successfully",updatedUser:updatedUser});
    } catch (error) {
        return res.status(500).json({error:`Internal server error: ${error.message}`});
    }
});

//route for deleting all the users
router.delete("/delete/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        if(!id){
            return res.status(400).json({error:"PLease provide an id"});
        }
        const deletedUser = await Users.findByIdAndDelete(id);
        if(!deletedUser){
            return res.status(500).json({error:"Failed to delete the user"});
        }
        return res.status(200).json({message:"User deleted successfully",deletedUser:deletedUser});
    } catch (error) {
        return res.status(500).json({error:`Internal server error ${error.message}`});
    }
});

// route to fetch all the users
router.get("/",async(req,res)=>{
    try {
        const users = await Users.find();
        if(!users){
            return res.status(404).json({error:"No users found"});
        }
        return res.status(200).json({message:"Users retrieved successfully",users:users});
    } catch (error) {
        return res.status(500).json({error:`Internal server error ${error.message}`});
    }
});


module.exports = router;
