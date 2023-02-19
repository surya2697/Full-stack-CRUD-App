const mongoose=require("mongoose")

const todoSchema=mongoose.Schema({
    task:{type:String,required:true},
    priority:{type:String,required:true}
})

const TodoModel=mongoose.model("todos",todoSchema)

module.exports={
    TodoModel
}