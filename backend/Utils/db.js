import mongoose from "mongoose";

const connetDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("monog db connected");  
    } catch(err){
        console.log(err);
    }
}

export default connetDB;









