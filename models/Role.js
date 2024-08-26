import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    title : { type : String, required : true }
})

mongoose.models = {}
const Role = mongoose.model('role', schema)
Role.createIndexes()
export default Role