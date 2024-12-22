const express = require("express")
const router = express()
const User = require("../models/user")


//user registration

router.post("/register",async(req,res)=>{
    const {name , email ,password} = req.body
    if(!name || !email || !password){
        return res.status(400).json({error:"all fields are required"})
    }
    try {
        const newUser = new User(req.body)
        //check for existing user
        const existingUser = await User.findOne({email:req.body.email})
        if(existingUser){
            return res.status(409).json({error:"User already exists"})
        }
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

//fetch users

router.get("/users",async(req,res)=>{
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

// updating the users

router.put("/users/:id",async(req,res)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updatedUser){
            res.status(404).json({error:"User not found"})
        }
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

// deleting user

router.delete("/users/:id",async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user deleted") 
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

module.exports = router;