import mongoose from "mongoose"
import Employee from "@/models/Employee";
import Admin from "@/models/Admin";
import Role from "@/models/Role";
import Attendance from "@/models/Attendance";

const connectDB = (handler) => async (req,res)=> {
    if (mongoose.connections[0].readyState){
        console.log("Database connection already present");
        return handler(req, res)
    }
    try{
        await mongoose.connect(process.env.MONGO_URI_PROD)
        console.log('Database Connected Successfully')
    } catch(error){
        console.log('Database Connection failed', error)
    } finally{
        return handler(req, res)
    }
}

export default connectDB