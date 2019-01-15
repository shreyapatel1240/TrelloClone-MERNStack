const { SECRET } = require('./constants')
const jwt = require('jsonwebtoken')

const create = user => {
    const id = user._id
    const firstName = user.firstName
    const lastName = user.lastName
    const userName = user.userName
    const payload = {
        user: {
            id,
            firstName,
            lastName,
            userName
        }
    }
    return jwt.sign(payload, SECRET)
}

module.exports = {
    create
}