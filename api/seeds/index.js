const ToDo = require('../models/Todo')
const User = require('../models/Users')
const Status = require('../models/status')
const Board = require('../models/Board')

const todo = require('./todo')
const user = require('./users')
const status = require('./status')
const board = require('./board')

const mongoose = require('mongoose')
const uri = 'mongodb://localhost:27017/ToDoApps'


const truncateDatabase = async () => {
    // here we delete all our users and posts so we can start with fresh data
    return Promise.all([User.deleteMany(), ToDo.deleteMany(), Status.deleteMany(), Board.deleteMany()])
}

const makeSeeds = async () => {
    // connect to our mongo database
    await mongoose.connect(uri)
    // delete all old data in the database
    await truncateDatabase()
    // save all our users into the database
    await Promise.all(user.map(user => user.save()))
    // save our seeded post into the database
    await Promise.all(todo.map(todo => todo.save()))
    // await todo.save()
    await Promise.all(status.map(status => status.save()))
    await Promise.all(board.map(board => board.save()))
    // that's it! close the connection
    mongoose.connection.close()
}

makeSeeds()