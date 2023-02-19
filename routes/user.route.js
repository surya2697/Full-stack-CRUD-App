const {Router}=require("express")
require('dotenv').config()
const {UserModel}=require("../models/user.model")
const jwt=require("jsonwebtoken")
const bcrypt = require('bcrypt');
const users=Router()

users.post("/register",async(req,res)=>{
   let {name,email,pass}=req.body
   try {
    bcrypt.hash(pass, 5, async (err, hash) =>{
        if(err){
            res.send({msg:"Something went wrong"})
        }else{
            let user=new UserModel({name,email,pass:hash})
            await user.save()
            res.send({msg:"Registered Sucessfully"})
        }
    });
   } catch (error) {
      res.send({msg:"Something went wrong",error:error.message})
   }
})


users.post("/login",async(req,res)=>{
    let {email,pass}=req.body
    
    try {
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(pass,user[0].pass,(err, result) =>{
                if(result){
                    let token=jwt.sign({userID:user[0]._id},process.env.Key,{expiresIn:"1 hour"})
                    res.send({msg:"Logged in",token:token})
                }else{
                    res.send({msg:"Something went wrong",error:err.message})
                }
            });
        }
        
    } catch (error) {
        res.send({msg:"Something went wrong",error:error.message})
    }
})


module.exports={
    users
}