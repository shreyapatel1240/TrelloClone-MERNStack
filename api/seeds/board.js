const Board = require('../models/Board')
const user = require('./users')

const board = []

const board1 = new Board({
    title: 'First Board',
    description: 'First Board',
    createdBy: user[0]
})

const board2 = new Board({
    title: 'Second Board',
    description: 'Second Board',
    createdBy: user[0]
})

const board3 = new Board({
    title: 'Third Board',
    description: 'Third Borad',
    createdBy: user[0]
})

board.push(board1)
board.push(board2)
board.push(board3)


module.exports = board