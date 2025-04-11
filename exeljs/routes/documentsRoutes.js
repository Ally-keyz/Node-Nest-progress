const express = require("express");
const router  = express.Router();
const Excel = require("exceljs");
const DocModel = require("../models/documentModel")

//declare a route to submit documents
router.post("/",async(req,res)=>{
    try {
        const { name , code , quantityIn ,quantityOut} = req.body;
        if(!name || !code || !quantityIn ||!quantityOut){
            return res.status(400).json({erro:"Please provide all the fields"});
        }
        const lastDeclared = await DocModel.findOne().sort({_id:-1});

        const balance = quantityIn- quantityOut;
        const newBalance = lastDeclared.balance + balance;

        if(!newBalance){
            return res.status(500).json({error:"Internal server error failed to calculate the new balance"});
        }

        const newDocument  = new DocModel({
            name:name,
            code:code,
            quantityIn:quantityIn,
            quantityOut:quantityOut,
            balance:newBalance
        });

        //save the new document
        const savedDoc = await newDocument.save();

        if(!savedDoc){
            return res.status(404).json({error:"Failed to find the saved document"});
        }

        return res.status(200).json({message:"Document saved successfully",savedDoc});

    } catch (error) {
        return res.status(500).json({error:`Internal server error:${error.message}`});
    }
});

// am going to make a route for generating a report as an excel document
router.get("/",async(req,res)=>{
    try {
        //first we will have to fetch all the documents
        let documents = await DocModel.find();
        //handle the documents into an array of object
        if(documents && !Array.isArray(documents)){
            documents = [documents];
        }

        //first thing i want to go through the entire documents and check where the balance is below 20 and add that item to my below 20 array
        let itemsBelow  = []
        documents.forEach(item =>{
            if(item.balance < 20){
                itemsBelow.push(item);
            }
        });

        //lets then prepare our excel workbook
        const workBook = new Excel.Workbook();
        const workSheet = workBook.addWorksheet("Sheet 1");

        //we have to also get the headers
         const headers = Object.keys(documents[0]);

        //map the headers
        workSheet.columns(headers.map(header => (
            {header:header,key:header,width:20}
        )));

        // then add the rows
        documents.forEach(item =>{
            workSheet.addRow(item);
        });

        // add a title to the document for displaying the item with the balance below 20
        workSheet.getCell("A40").value = "The items whose balance below 20"
        workSheet.getCell("A40").font = {
            name:"bold",
            color:"red",
            family:2,
            size:20,
            italic:false
        }
        
        itemsBelow.forEach(item =>{
            workSheet.addRow(item);
        });

        //we have to then save the document
        res.header(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.header(
            "Content-Deposition",
            "attachment; filename = report.xlsx"
        );
        await workBook.xlsx.write(res);
        res.end();
    } catch (error) {
        return res.status(500).json({error:`Internal server error:${error.message}`});
    }
});
