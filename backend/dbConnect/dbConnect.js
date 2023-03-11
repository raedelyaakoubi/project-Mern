const mongoose=require('mongoose')

const dbConnect =async ()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI);
       console.log("db successfuly connect")
    } catch (error) {
        console.log(error)
    }
}

module.exports=dbConnect