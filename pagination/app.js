const express = require("express");
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const productRoutes = require("./routes/paginationRoute")


// load environment variables
dotenv.config()

//middle ware
app.use(express.json());
app.use("/products",productRoutes);

//connect to the mongo atlass

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("connected to mongo"))
.catch((e)=> console.log(`connection failed :${e}`))


const port = 6000;

app.listen(port,()=>{
  console.log(`Listening on port ${port}`)
});

module.exports = app;