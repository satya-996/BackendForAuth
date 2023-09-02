const express=require("express")
const connectDb = require('./config/dbConnection');
const errorHandler = require("./middleware/errorhandler")
const cors=require('cors')
const dotenv=require("dotenv").config()
connectDb()
const app=express()
const port= process.env.PORT || 5000
app.use(cors())
app.use(express.json())
app.use("/api/contact", require("./routes/contactRoutes")) //middleware
app.use("/api/users", require("./routes/userRoutes"))
app.use(errorHandler)
app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
}) 