const mongoose = require('mongoose')
const Schema = mongoose.Schema

const boardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdDate: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Board', boardSchema)