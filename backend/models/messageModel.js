const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
     
    },
    content:{
        type:String,
        required:true
    
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chat",     
    },
    
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    
   
},{
    timestamps:true,
});


module.exports = Message = mongoose.model("message", messageSchema);