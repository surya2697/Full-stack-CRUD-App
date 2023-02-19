const jwt=require("jsonwebtoken")
require('dotenv').config()


const authenticate=async(req,res,next)=>{
    let token=req.headers.authorization;
   
    try {
        if(token){
            const Token = jwt.verify(token, process.env.Key);
            if(Token){
                console.log(Token);
                req.body.userId = Token.id; 
                next()
            }else{
                res.send({message:" Please Login again"});
                console.log({message:"Please Login again"});
            }
        }else{
            res.send({message:"Please Login again"});
                console.log({message:"Please Login again"});
        }
        
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}



module.exports=authenticate
