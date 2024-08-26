import connectDB from "@/middlewares/db";
import Employee from '@/models/Employee'
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@/Config";

async function handler(req, res) {
    const response = { success: true }
    if (req.method == 'POST') {
        console.log(req.body)
        const { email, password } = req.body
        try {
            const employee = await Employee.findOne({ email });
            if (employee) {
                console.log("went in if 1");
                
                if (employee.password === password) {
                    response.msg = "Login Successful";
                    console.log(response.msg)
                    response.msgType = "success";
                    const token = jwt.sign({ userId: employee._id }, JWT_SECRET);
                    response.token = token;
                    res.status(200).json(response);
                } else {
                    response.success = false;
                    response.msg = "Wrong Password";
                    console.log(response.msg)
                    response.msgType = "info";
                    res.status(401).json(response);
                }
            } else {
                response.success = false;
                response.msg = "Email not registered";
                console.log(response.msg)
                response.msgType = "warning";
                res.status(401).json(response);
            }
        } catch (error) {
            response.success = false
            response.msg = "Something went wrong"
            console.log(response.msg)
            response.error = error.toString()
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