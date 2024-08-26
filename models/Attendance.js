import mongoose from 'mongoose'
import { getDateToday } from "@/Config";

const schema = new mongoose.Schema({
    employee : { type: mongoose.Schema.Types.ObjectId, ref: 'employee', required: true },
    date : { type: Date, required: true, default: getDateToday },
    checkIn : { type: Date },
    checkOut : { type: Date },
    status : { type: String, required: true, default: "Absent" },
    workLogs : { type: String }
})

mongoose.models = {}
const Attendance = mongoose.model('attendance', schema)
Attendance.createIndexes()
export default Attendance