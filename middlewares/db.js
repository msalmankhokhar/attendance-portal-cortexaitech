import mongoose from "mongoose"

const connectDB = (handler) => async (req,res)=> {
    if (mongoose.connections[0].readyState){
        return handler(req, res)
    }
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Database Connected Successfully')
    } catch(error){
        console.log('Database Connection failed', error)
    }
    return handler(req, res)
}

export default connectDB