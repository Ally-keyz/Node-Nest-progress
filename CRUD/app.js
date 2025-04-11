//modules importation 
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserRoutes = require("./routes/UserRoutes")
const AdminRoutes = require("./routes/AdminRoutes")
const testRoutes = require("./routes/test");

//load environment variables
dotenv.config();

//importaion of middlewares
app.use(express.json());
app.use("/user",UserRoutes);
app.use("/admin",AdminRoutes);
app.use("/test",testRoutes);


// establishing connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Conected to mongo..."))
.catch((e)=>console.log(`failed to connect ${e}`))

const port = 5000;
app.listen(port,()=>{
  console.log(`Listening on port ${port}`);
})


module.exports = app;
