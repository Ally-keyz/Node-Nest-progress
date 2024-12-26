const dotenv = require("dotenv");
const User = require("./models/UserModel");
const jwt = require("jsonwebtoken");

// load environment variables
dotenv.config();

//authantication middleware

const authMiddleware = async(req,res,next)=>{
    try {
        const token = req.headers("Authorization").replace("Bearer","");
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        const user = await User.findOne(decoded.id);

        if(!user){
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({error:"Un Authorized"});
    }
}