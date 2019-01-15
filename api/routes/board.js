const express = require('express')
const router = express.Router()
const Board = require('../models/Board')
const { verifyToken } = require("../middleware/auth");

// /board
router.get('/', verifyToken, (req, res, next) => {
    Board.find({ createdBy: req.decoded.user.id })
        .then(board => {
            res.status(200).send({ message: 'Success', payload: board })
        })
        .catch(e => {
            res.status(500).send({ message: e.message })
        })
});

// /board/:boardId
router.get('/:boardId', verifyToken, async (req, res, next) => {
    const boardId = req.params.boardId
    try {
        const board = await Board.findById(boardId)
        res.status(200).send({
            data: [board]
        })
    } catch (e) {
        next(e)
    }
})

// /board/
router.post('/', verifyToken, async (req, res, next) => {
    try {
        const { title, description, createdBy } = req.body
        const board = new Board({ title, description, createdBy })
        await board.save()
        res.status(201).send({
            data: [board]
        })
    } catch (e) {
        next(e)
    }
})

// /board/:boardId
router.patch('/:boardId', verifyToken, async (req, res, next) => {
    try {
        // const { title, description, statusId } = req.body  
        // const todo = await ToDo.findByIdAndUpdate(req.params.todoId, {title, description, statusId})
        const board = await Board.findById(req.params.boardId);
        Object.assign(board, req.body);
        await board.save()
        res.status(201).send({
            data: [board]
        })
    } catch (e) {
        next(e)
    }
})

// /board/:boardId
router.delete('/:boardId', verifyToken, async (req, res, next) => {
    try {
        const { boardId } = req.params
        const doc = await Board.findByIdAndRemove(boardId)
        res.status(204).send({
            data: [doc]
        })
    } catch (e) {
        next(e)
    }
})

exports.router = router;