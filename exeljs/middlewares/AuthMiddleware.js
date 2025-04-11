const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//load the environment variables
dotenv.config();

async function authentication(req,res,next) {
    try {
        const token = req.headers("Authentication").replace("Bearer "," ");
        const decodedToken = jwt.verify(token,process.env.JWT_KEY);
        const user  = await Users.findById(decodedToken.id);

        if(!user){
            return res.status(403).json({error:"You are unauthorised"});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({error:`Internal server error:${error}`});
    }
    
}

module.exports = authentication;