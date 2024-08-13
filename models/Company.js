import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    title : { type : String, required : true, unique: true },
})

mongoose.models = {}
const Model = mongoose.model('company', schema)
Model.createIndexes()
export default Model