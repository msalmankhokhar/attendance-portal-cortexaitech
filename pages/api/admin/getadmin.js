import connectDB from "@/middlewares/db";
import Admin from '@/models/Admin'
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@/Config";

async function handler(req, res) {
    const response = { success: true }
    if (req.method == 'POST') {
        const { token } = req.body
        try {
            const data = jwt.verify(token, JWT_SECRET)
            const { userId } = data
            const admin = await Admin.findOne({ _id: userId });
            if (admin) {
                response.admin = admin;
                res.status(200).json(response);
            } else {
                response.success = false;
                response.msg = "No Admin Found";
                response.msgType = "warning";
                res.status(401).json(response);
            }
            
        } catch (error) {
            console.log(error);
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