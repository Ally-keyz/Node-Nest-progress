const Excel = require("exceljs");

const workBook = new Excel.Workbook();
const workSheet = workBook.addWorksheet("Sheet 1");

// add columns in the worksheet

workSheet.columns([

    { header:"Id" , key:"id" , width:10},

    { header:"Name" , key:"name" , width:10 },

    { header:"Location" , key:"location" , width:10 },

    { header:"Age" , key:"age" , width:10 }

]);

//create the dummy data to add into the document

const studentsData = [

    { id:1 , name:"Manzi alpe" , location:"Huye" , age:17 },

    { id:2 , name:"Steev jobs" , location:"Huye" , age:17 },

    { id:3 , name:"Elon mask" , location:"Huye" , age:17 },

    { id:4 , name:"Bill gates" , location:"Huye" , age:17 },

    { id:5 , name:"Iman gazih" , location:"Huye" , age:17 },

    { id:6 , name:"Play boy" , location:"Huye" , age:17 },

    { id:7 , name:"Mark zucbagh" , location:"Huye" , age:17 }
]

studentsData.forEach((student)=>{
    workSheet.addRow(student);
});

//styling rows in excel js
workSheet.getRow(1).font = {bold:true}
workSheet.getRow(1).height = 10

//save the document
workBook.xlsx.writeFile("students.xlsx");

//reading the excels files
workBook.xlsx.readFile();
