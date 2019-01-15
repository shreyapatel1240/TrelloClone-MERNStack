const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

usersSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password') || user.isNew) {
        try {
            const hash = await bcrypt.hash(user.password, 10)
            user.password = hash
            next()
        } catch (e) {
            next(e)
        }
    } else {
        next()
    }
})

usersSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', usersSchema)