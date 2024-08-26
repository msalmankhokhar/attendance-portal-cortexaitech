import connectDB from "@/middlewares/db"
import Attendance from "@/models/Attendance"
import Employee from "@/models/Employee";
import { getDateToday } from "@/Config";
import mongoose from "mongoose";

async function handler(req, res) {
    const response = { success: true }
    req.body.date = new Date(req.body.date)
    if (req.method === 'POST') {
        try {
            const { employee } = req.body
            const selectedEmployee = await Employee.findById(employee)
            if (selectedEmployee) {
                req.body.employee = selectedEmployee._id
                const attendance = await Attendance.findOne({ employee: selectedEmployee._id, date: req.body.date })
                response.attendance = attendance
                res.status(200).json(response)
            } else {
                response.success = false
                response.msg = "User not found"
                response.msgType = "warning"
                res.status(404).json(response)
            }
        } catch (error) {
            response.success = false
            res.msg = 'Internal Server Error'
            res.error = error
            res.msgType = 'error'
            res.status(500).json(response)
        }
    } else {
        response.success = false
        response.msg = "Only POST menthod is allowed"
        res.status(400).json(response)
    }
}

export default connectDB(handler)