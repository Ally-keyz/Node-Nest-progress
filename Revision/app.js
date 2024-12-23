const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoute")
const fileRoutes = require("./routes/fileRoutes")

//load environment variables
dotenv.config()

//use of middle wares
app.use(express.json())
app.use("/productss",productRoutes);
app.use("/files",fileRoutes);

//connect to the mongo data base

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("connected to data base"))
.catch((e)=> console.log(`Failed to connect:${e}`))

//port
const port = 5000;
app.listen(port,()=>{
  console.log(`app is listening on port ${port}`)
})

module.exports = app;
