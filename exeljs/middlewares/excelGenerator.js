const Excel = require("exceljs");
const express = require("express");
const router  = express.Router();


//am going to create a reusable function that can be reused through my entire applications for generating excel documents
router.get("/",async(req,res)=>{
    try {
        const data = req.body;
        if(data && ! Array.isArray(data)){
            data = [data];
        }
        if(!data || data.length < 1){
            return res.status(400).json({error:"Please provide data to generate excel document for"});
        }

        const headers = Object.keys(data[0]);

        const workBook = new Excel.Workbook();
        const workSheet = workBook.addWorksheet("Sheet 1");

        workSheet.columns = headers.map(header => [
            {header:header,key:header, width: 20}
        ]);

        data.forEach(element => {
            workSheet.addRow(element);
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
        res.setHeader(
            "Content-Deposition",
            "attachment; filename=data.xlsx"
        );

        await workBook.xlsx.write(res);
        res.end()

    } catch (error) {
        return res.status(500).json({error:`Failed error: ${error.message}`});
    }
})

module.exports = router;

