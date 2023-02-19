const mongoose=require("mongoose")
mongoose.set('strictQuery', false);
require('dotenv').config()
const connection=()=>{
    try {
        let connect=mongoose.connect(process.env.mongoURL)
        console.log("Connected to DB")
    
    } catch (error) {
        console.log(error)
    }
}


module.exports={connection}