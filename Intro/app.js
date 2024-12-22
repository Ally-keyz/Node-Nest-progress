const expresss = require("express")
const app = expresss()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const User = require("./models/user")
const UserRoutes = require("./routes/UserAuth")

//load the environment variable
dotenv.config()

// middleware for parsing the urls
app.use(expresss.json())
app.use("/user",UserRoutes);


//connect to the database

mongoose.connect(process.env.MONGO_STRING)
.then(()=> console.log("connected to database..."))
.catch((e)=>console.log(`there was an error ${e}`))

const port = 5000;

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})


module.exports = app;