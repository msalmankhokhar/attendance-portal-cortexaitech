import connectDB from "@/middlewares/db";
import Employee from '@/models/Employee'
import Role from "@/models/Role";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@/Config";

async function handler(req, res) {
    const response = { success: true }
    if (req.method == 'POST') {
        const newEmployee = new Employee(req.body)

        // processing role
        const { role } = req.body

        try {
            const foundRole = await Role.findOne({ title: role });
            if (foundRole) {
                console.log(`Role already present ${foundRole.title}`);
                newEmployee.role = foundRole._id;
            } else {
                console.log(`Making new Role ${role}`);
                const newRole = new Role({ title: role });
                const createdRole = await newRole.save();
                console.log(`Made Role ${role}`);
                newEmployee.role = createdRole._id;
            }
        } catch (error) {
            const msg = `Failed to process role <${role}>: ${error}`
            console.log(msg);
            response.success = false
            response.msg = msg
            response.error = error
            response.msgType = "error"
            res.status(500).json(response)
        }

        try {
            const createdEmployee = await newEmployee.save();
            response.msg = "Employee Added Successfully";
            response.msgType = "success";
            response.employee = createdEmployee;
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            response.success = false;
            response.msg = "Failed to add employee";
            response.error = error.toString();
            response.msgType = "error";
            res.status(500).json(response);
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