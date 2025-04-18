//importing the express
const express = require('express')
const app = express()
//declare router
app.post("/",(req,res)=>{
    const body= req.body;
    res.send(req.body),
})

app.get("/",(req,res)=>{
    res.send("hello word")
})

app.listen(3000,()=>{
    console.log("surver succesful running")
})
module.export = app;