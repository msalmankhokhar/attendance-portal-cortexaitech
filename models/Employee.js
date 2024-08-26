import mongoose from 'mongoose'
import { getDateToday } from "@/Config";

const schema = new mongoose.Schema({
    email : { type : String, required : true, unique: true },
    password : { type : String, required : true },
    firstName : { type : String, required : true },
    lastName : { type : String, required : false },
    role : { type: mongoose.Schema.Types.ObjectId, required : true, ref : 'role' },
    dateJoined : { type : Date, required : true, default : getDateToday }
})

mongoose.models = {}
const Employee = mongoose.model('employee', schema)
Employee.createIndexes()
export default Employee