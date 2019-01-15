const User = require('../models/Users')

const users = []

const simon = new User({
    firstName: 'Simon',
    lastName: 'Bloom',
    userName: 'sb',
    password: 'sb'
})

users.push(simon)

const talia = new User({
    firstName: 'Talia',
    lastName: '',
    userName: 'talia',
    password: 'talia'
})

users.push(talia)

module.exports = users