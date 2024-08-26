import connectDB from "@/middlewares/db";
import Employee from '@/models/Employee'
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@/Config";

function handler(req, res) {
    const response = { success: true }
    if (req.method == 'POST') {
        const { token } = req.body
        try {
            const data = jwt.verify(token, JWT_SECRET)
            const { userId } = data
            Employee.findOne({ _id : userId }).then((employee)=>{
                if (employee) {
                    response.user = employee
                    res.status(200).json(response)
                } else {
                    response.success = false
                    response.msg = "No User Found"
                    response.msgType = "warning"
                    res.status(401).json(response)
                }
            }).catch((error)=>{
                console.log(error);
                response.success = false
                response.msg = "Something went wrong"
                response.error = error
                response.msgType = "error"
                res.status(500).json(response)
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