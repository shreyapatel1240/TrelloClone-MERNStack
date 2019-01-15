const Todo = require('../models/Todo')
const status = require('./status')
const user = require('./users')
const board = require('./board')

const todo = []

const todo1 = new Todo({
    title: 'First ToDo',
    description: 'First ToDo',
    statusId: status[0],
    createdBy: user[0],
    boardId: board[0]
})

const todo2 = new Todo({
    title: 'Work on a project',
    description: 'ToDo application like Trello',
    statusId: status[1],
    createdBy: user[0],
    boardId: board[1],
})

const todo3 = new Todo({
    title: 'Front-End',
    description: 'Fornt-end ToDo application',
    statusId: status[2],
    createdBy: user[0],
    boardId: board[2]
})

todo.push(todo1)
todo.push(todo2)
todo.push(todo3)


module.exports = todo