const {Router}=require("express")
const {TodoModel}=require("../models/todo.model")
const todos=Router()


todos.get("/",async(req,res)=>{
    try {
        const user=await TodoModel.find()
        res.send(user)
    } catch (error) {
        res.send({msg:"Something went wrong",error:error.message})
    }
})

todos.post("/create",async(req,res)=>{
    let task=req.body
    try {
        const user=new TodoModel(task)
        await user.save()
        res.send({user,msg:"Task has been created"})

    } catch (error) {
        res.send({msg:"Something went wrong",error:error.message})
    }
})


todos.patch("/update/:id",async(req,res)=>{
    let _id=req.params.id
    let update=req.body
    
    try{
       
            let user=await TodoModel.findByIdAndUpdate({_id},update)

            res.send({msg:"Todo has been updated", user})
        
    }catch(err){
        res.send({msg:"Something went wrong",error:err.message})
    }
})

todos.delete("/delete/:id",async(req,res)=>{
    let _id=req.params.id
    
    try{
       
            let user=await TodoModel.findByIdAndDelete({_id})
            res.send({msg:"Todo has been deleted"})
        
            

        
    }catch(err){
        res.send({msg:"Something went wrong",error:err.message})
    }
})


module.exports={
    todos
}