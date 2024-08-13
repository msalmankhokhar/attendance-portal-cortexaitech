import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    email : { type : String, required : true, unique: true },
    password : { type : String, required : true },
    name : { type : String, required : true },
    designation : { type: mongoose.Schema.Types.ObjectId, required : true, ref : 'designation' },
    company : { type: mongoose.Schema.Types.ObjectId, required : true, ref: 'company' },
    dateJoined : { type : Date, required : true, default : new Date(Date.now()) }
})

mongoose.models = {}
const Model = mongoose.model('employee', schema)
Model.createIndexes()
export default Model