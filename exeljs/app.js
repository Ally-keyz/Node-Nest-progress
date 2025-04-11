const express = require("express");
const app  = express();
const dotenv = require("dotenv");
const mongoose  = require("mongoose");
const port  = 3000

//load the environment variables
dotenv.config();

//use express middleware to parse the urls
app.use(express.json());
//connect to the mongoose database

mongoose.connect();

//start the listening port
app.listen(port,()=>{
  console.log(`Server is listening on port ${port}`);
});
module.exports = app;
