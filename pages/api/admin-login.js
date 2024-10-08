import connectDB from "@/middlewares/db";
import Admin from '@/models/Admin'
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@/Config";

function handler(req, res) {
    const response = { success: true }
    if (req.method == 'POST') {
        const { email, password } = req.body
        try {
            Admin.findOne({ email : email }).then((admin)=>{
                if (admin.password === password) {
                    // Login in successfull
                    response.msg = "Login Successfull"
                    response.msgType = "success"
                    const token = jwt.sign({ userId : admin._id }, JWT_SECRET)
                    response.adminToken = token
                    res.status(200).json(response)
                }else{
                    response.success = false
                    response.msg = "Wrong Password"
                    response.msgType = "info"
                    res.status(401).json(response)
                }
            }).catch((error)=>{
                console.log(error);
                response.success = false
                response.msg = "Email not registered"
                response.error = error.toString()
                response.msgType = "warning"
                res.status(401).json(response)
            })
        } catch (error) {
            response.success = false
            response.msg = "Something went wrong"
            response.error = error
            response.msgType = "error"
            res.status(500).json(response)
        }
    } else {
        response.success = false
        response.msg = "Only accepts POST request"
        res.status(403).json(response)
    }
}

export default connectDB(handler)

export const config = {
    api: {
      externalResolver: true
    }
  }