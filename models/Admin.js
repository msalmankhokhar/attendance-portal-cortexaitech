import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    email : { type : String, required : true, unique: true },
    password : { type : String, required : true },
    name : { type : String, required : true },
    designation : { type : mongoose.Schema.Types.ObjectId, ref: 'designation' },
    company : { type: mongoose.Schema.Types.ObjectId, required : true, ref: 'company' }
})

mongoose.models = {}
const Model = mongoose.model('admin', schema)
Model.createIndexes()
export default Model