const { error } = require("console");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const path = require("path");

//multer storage set up
const storage = multer.diskStorage({
    destination:(req,file,cb)=>cb(null,"uploads/"),
    filename:(req,file,cb)=>{
        const uniqueName = `${Date.now}-${file.originalname}`
        cb(null,uniqueName)
    }
});

//upload multer configure

const upload = multer({
    storage,
    fileFilter:(req,file,cb)=>{
        const AllowedFiles=[
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel (.xlsx)
            "application/vnd.ms-excel", 
        ]

        if(!AllowedFiles.includes(file.mimetype)){
            cb(new error("Only pdf files are require"),false)
        }
        cb(null,true)
    },
    limits:{fileSize: 1024 * 1024 * 5 }
})

// file upload route

router.post("/upload",upload.single("file"),async(req,res)=>{
    try {
        const file = req.file
        if(!file){
            return res.status(400).json({error:"please upload a file"})
        }
        res.status(200).json({
            message:"file uploaded",
            file
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

// file download

router.get("/download/:filename",async(req,res)=>{
    try {
        const fileName = req.params.filename
        const filePath = path.join(__dirname,"uploads",fileName)
        if(fs.existsSync(filePath)){
            res.download(filePath,fileName,(error)=>{
                if(error){
                    res.status(500).json({error:"could not download the file"})
                }
            })
        }else{
            res.status(404).json({error:"file not found"})
        }
    } catch (error) {
        
    }
})