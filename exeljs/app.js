const express = require("express");
const app  = express();
const dotenv = require("dotenv");
const mongoose  = require("mongoose");
const port  = 5000

//load the environment variables
dotenv.config();

//use express middleware to parse the urls
app.use(express.json());
//connect to the mongoose database

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Connected to mongo database"))
.catch((error)=> console.error(`Error: ${error.message}`));

//start the listening port
app.listen(port,()=>{
  console.log(`Server is listening on port ${port}`);
});
module.exports = app;
