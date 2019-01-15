const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    statusId: {
        type: Schema.Types.ObjectId,
        ref: 'Status',
        required: true
    },
    boardId: {
        type: Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdDate: {
        type: Date,
        default: new Date()
    },
    updatedDate: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('ToDo', todoSchema)