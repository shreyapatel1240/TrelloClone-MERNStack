const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const { issueToken } = require('../middleware/auth')

const findUserByUserName = async (req, res, next) => {
    const { userName } = req.body
    try {
        const user = await User.findOne({ userName })
        if (user) {
            req.user = user
            next()
        } else {
            next(new Error('not found'))
        }
    } catch (e) {
        next(e)
    }
}

router.post('/', findUserByUserName, issueToken, async (req, res, next) => {
    const { token } = req
    if (token) {
        res.status(200).json({ token })
    } else {
        next(new Error('internal server error'))
    }
})

exports.router = router