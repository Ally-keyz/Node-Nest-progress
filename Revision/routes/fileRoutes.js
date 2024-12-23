const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { error } = require("console");


//set up the multer storage
const storage = multer.diskStorage({
    destination:(req,file,cb)=>cb(null,"uploads"),
    filename:(req,file,cb)=>{
        const uniqueName = `${Date.now()}-${file.originalname}`
        cb(null,uniqueName)
    }
})

// handle multer uploading

const upload = multer({
    storage,
    fileFilter:(req,file,cb)=>{
        const AllowedDocuments =[
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel (.xlsx)
            "application/vnd.ms-excel",
        ]
        if(!AllowedDocuments.includes(file.mimetype)){
            cb(new Error("only exel documents are allowed"),false)
        }
        cb(null,true)
    },
    limits:{ fileSize: 1024 * 1024 * 5 }
})

// route to upload
router.post("/upload",upload.single("file"),async(req,res)=>{
    try {
        const file = req.file;
        if(!file){
            return res.status(400).json({error:"Provide a file please"})
        }
        res.status(200).json({
            message:"file uploaded",
            file:file
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

// download files route
router.get("/download",async(req,res)=>{
    try {
        const fileName = req.params.filename
        const filePath = path.join(__dirname,"uploads",fileName)
        if(fs.existsSync(filePath)){
            res.download(filePath,fileName,(error)=>{
                if(error){
                    res.status(500).json({error:"Failed to download"})
                }
            })
        }else{
            res.status(404).json({error:"File not found"})
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})