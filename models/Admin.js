import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    email : { type : String, required : true, unique: true },
    password : { type : String, required : true },
    firstName : { type : String, required : true },
    lastName : { type : String, required : false },
    role : { type : mongoose.Schema.Types.ObjectId, ref: 'role', required : false }
})

mongoose.models = {}
const Admin = mongoose.model('admin', schema)
Admin.createIndexes()
export default Admin