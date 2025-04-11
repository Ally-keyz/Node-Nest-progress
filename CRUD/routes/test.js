/* this is rooter that mr.gary working for */



// user roots registration and login

const User = require("../models/UserModel");
const express = require("express");
const router = express.Router();
const bcryper = require("bcrypt");
const jwt = require("jsonwebtoken");

// let starting on login 
router.post("/login",async(req,res)=>{
    try{
        //declaration of email and password on body

        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({error:"login failed"});
        }
        const existUser =await User.find({email:email});
        
        if(!existUser){
            return res.status(401).json({error:" user not fund"})
        }
        const passwordUser = existUser.password;
        const isMatch = bcryper.compare(password,passwordUser);
        if(!isMatch){
            return res.status(400).json({error:"Password is incorrect"});
        }

        const token =  jwt.sign({id:existUser._id,user:existUser.name},process.env.JWT_KEY,{expires:"1h"});
        return res.status(200).json({message:"Logged in",token});
    }catch(error){
        return res.status(500).json({error:`Internal server error ${error.message}`})
    }
})

// registation 

router.post("/register",async(res,req)=>{
    try{
        const {name,email,password} =req.body;

        if(!name || !email || !password){
            return res.status(400).json({error:" credential invalid"});
        }
        const userExisting = await User.findOne({email:email})

        if(userExisting){
            return res.status(400).json({error:"user exist"});
        }

        const passwordHashed = await bcryper.hash(password,10);

        const newUser = new User({
           name,
           email,
           password:passwordHashed
        });
        const save =await newUser.save();
        return res.status(201).json({save})

    }catch(error){
        return res.status(500).json({error:"Register server error"});
    }
})

module.exports = router;