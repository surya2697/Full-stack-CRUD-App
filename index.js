
require('dotenv').config()
const express=require("express")
const cors = require('cors');
const { connection } = require("./config/db")
const {users}=require("./routes/user.route")
const {todos}=require("./routes/todo.route")
const authenticate=require("./middleware/authenticate")
const app=express()
app.use(cors())
app.use(express.json())  

app.get("/",(req,res)=>{
    res.send("Home Page")
})


app.use("/users",users)
app.use(authenticate)
app.use("/todos",todos)




app.listen(process.env.port,()=>{
    connection()
    console.log(`Server started on ${process.env.port}`)
})