const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/constants')
const tokenService = require('../utils/tokenService')

const issueToken = async (req, res, next) => {
    const { password } = req.body
    const { user } = req
    try {
        const match = await user.comparePassword(password)
        if (match) {
            req.token = tokenService.create(user)
            next()
        } else {
            next(new Error('unauthorized'))
        }
    } catch (e) {
        next(e)
    }
}

const verifyToken = async (req, res, next) => {
    const authHeader = req.get('authorization')
    if (!authHeader) {
        next(new Error('unauthorized'))
    } else {
        const token = authHeader.split(' ')[1]
        try {
            const decoded = await jwt.verify(token, SECRET)
            if (decoded) {
                req.decoded = decoded
            }
            next()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = {
    issueToken,
    verifyToken
}