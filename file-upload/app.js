const express = require("express");
const app = express();
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");



//load environment variables
dotenv.config();

//middlewares
app.use(express.json());



//connect to data base
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("connected to data base"))
.catch((e)=> console.log(`failed to connect:${e}`));

const port = 5000;



app.listen(port,()=>{
  console.log(`listening on port:${port}`)
})
module.exports = app;
