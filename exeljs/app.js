//importation of modules
const express = require("express")
const app = express()
const dotenv = require("dotenv")
const port = 5000
const mongoose = require("mongoose")
const UsersRoutes = require("./routes/userAuth")
const cors = require("cors")

//enable cors
app.use(cors())

//intializing env variables
dotenv.config();

// parsing urls
app.use(express.json());
app.use("/Users",UsersRoutes);

// connecting to our mongo db
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("Connected to the mongo database..."))
.catch((err)=> console.log(`Error: ${err.message}`));


app.post("/",(req,res)=>{
    const {name} = req.body;
    res.send(`Hello ${name}`);
})

//initialise our server
app.listen(port,()=>{
    console.log(`Server listening on ${port}`);
});

module.exports = app;
