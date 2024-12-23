const express = require("express");
const router = express.Router();
const product = require("../models/productsModel");

//my pagination route
router.get("/pagination",async(req,res)=>{
    try {
        const {page , limits = 10} = req.query;
        if(!page){
            return res.status(400).json({error:"page number required"})
        }
        const pageNum = parseInt(page,10);
        const limitNum = parseInt(limits,10);

        const products = await product.find().skip((pageNum - 1)*limitNum).limit(limitNum)

        const totalCount = await product.countDocuments();

        res.status(200).json({
            products,
            totalPages:Math.ceil(totalCount / limitNum),
            currentPage:pageNum
        })

    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

// route to declare product
router.post("/register",async(req,res)=>{
    try {
        const { name , quantity, price} = req.body;
        if(!name||!quantity||!price){
            return res.status(400).json({error:"All fields are required"})
        }
        const newProduct =  new product({
            name,
            quantity,
            price
        });
        const savedProduct = await newProduct.save()
        res.status(201).json({message:"product created",savedProduct})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

// deleting the products
router.post("product/:id",async(req,res)=>{
    try {
        await product.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"product deleted"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

// updating products
router.post("product/:id",async(req,res)=>{
    try {
        if(!req.body){
            return res.status(400).json({error:"provide fields to update"})
        }
        const updatedProduct = await product.findByIdAndDelete(req.params.id,req.body,{new:true});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})
module.exports = router