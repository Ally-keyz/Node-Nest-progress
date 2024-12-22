//user routes for crud operations
const express = require("express");
const router = express.Router();
const User = require("../models/UserModel")
const bcrypt = require("bcrypt")

//user  registration

router.post("/register",async(req,res)=>{
    try {
        const{name,email,password} = req.body;

        if(!name||!email||!password){
           return res.status(400).json({error:"All fields are required"});
        }

        const existingUser = await User.findOne({email:req.body.email});
        if(existingUser){
            return res.status(400).json({error:"User Exists"})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        
        const newUser = new User({
            name,
            email,
            password:hashedPassword
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
})


//fetch all users
router.get("/users",async(req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

//update users
router.put("/users/:id",async(req,res)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})



//delete users

router.delete("/users/:id",async(req,res)=>{
    try {

        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"user deleted"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})



module.exports = router;
