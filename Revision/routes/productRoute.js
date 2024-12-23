const express = require("express");
const router = express.Router()
const product = require("../models/productsModel")

//pagination get route
router.get("/pagination",async(req,res)=>{
    try {
        const {page , limits = 10} = req.query;
        if(!page){
            return res.status(400).json({error:"please provide the page number"})
        }
        const pageNumber = parseInt(page,10);
        const limitNumber = parseInt(page,10);

        const products = await product.find()
        .skip((pageNumber - 1)*limitNumber)
        .limit(limitNumber)

        const totalCount = product.countDocuments();

        res.status(200).json({
            products,
            totalPages: Math.ceil(totalCount / limitNumber),
            currentPage: pageNumber
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})