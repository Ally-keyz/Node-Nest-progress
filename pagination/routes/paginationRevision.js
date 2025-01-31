//impportation of modules

const express = require("express");
const router = express.Router();
const products = require("../models/productsModel");
const jwt = require("jsonwebtoken");
//declare a route for pagination

app.get("/products",async(req,res)=>{
  try {
    const {page,limits} = req.params;
    if(!page){
      return res.status(400).json({error:"page is required"})
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limits);

    const productData = await products.find().skip((page -1)*limitNum).limit(limitNum);
    const documents = await products.countDocuments();

    res.status(200).json({
      productData,
      totalPages:Math.ceil(documents/limitNum),
      currentPage:pageNum
    })
  } catch (error) {
    return res.status(500).json({error:error.message});
  }
})

const authantication = async (req,res,next) => {
  try {
    const token = req.headers("Authorization").replace("Bearer","");
    const decoded = jwt.verify(token,process.env.JWT_TOKEN);
    const user = await user.findOne(decoded.id);
    if(!user){
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({error:error.message});
  }
}