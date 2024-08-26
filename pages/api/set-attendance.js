import connectDB from "@/middlewares/db"
import Attendance from "@/models/Attendance"
import Employee from "@/models/Employee";
import { getDateToday } from "@/Config";
import mongoose from "mongoose";

async function handler(req, res) {
    const response = { success: true }
    // console.log(req.body)
    req.body.date = new Date(req.body.date)
    if (req.method === 'POST') {
        console.log(req.body);
        try {
            const { employee } = req.body
            const selectedEmployee = await Employee.findById(employee)
            console.log(selectedEmployee)
            if (selectedEmployee) {
                req.body.employee = selectedEmployee._id
                const attendance = await Attendance.findOne({ employee: selectedEmployee._id, date: req.body.date })
                if (attendance) {
                    console.log("found previous attendance object");
                    attendance.status = req.body.status
                    if (req.body.status === 'Present') {
                        if (req.body.checkIn !== 'no_update'){ attendance.checkIn = req.body.checkIn }
                        if (req.body.checkOut !== 'no_update'){ attendance.checkOut = req.body.checkOut }
                    } else{
                        attendance.checkIn = undefined
                        attendance.checkOut = undefined
                    }
                    await attendance.save()
                    res.msg = 'Success'
                } else {
                    console.log("making new attendance object");
                    const newAttendance = new Attendance(req.body)
                    await newAttendance.save()
                    res.msg = 'Updated Attendence'
                }
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
            console.log(error);
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