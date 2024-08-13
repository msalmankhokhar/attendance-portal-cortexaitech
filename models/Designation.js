import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    title : { type : String, required : true },
    company : { type: mongoose.Schema.Types.ObjectId, required : true, ref: 'company' }
})

mongoose.models = {}
const Model = mongoose.model('designation', schema)
Model.createIndexes()
export default Model