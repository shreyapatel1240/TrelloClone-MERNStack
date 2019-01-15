const express = require('express')
const router = express.Router()
const ToDo = require('../models/Todo')
const { verifyToken } = require('../middleware/auth')

// /todo
router.get('/', verifyToken, (req, res, next) => {
  ToDo.find({})
    .then(todos => {
      res.status(200).send({ message: 'Success', payload: todos })
    })
    .catch(e => {
      res.status(500).send({ message: e.message })
    })
});

// /todo/:boardId
router.get('/:boardId', verifyToken, async (req, res, next) => {
  const boardId = req.params.boardId
  ToDo.find({ boardId: boardId }).populate('statusId')
    .then(todos => {
      res.status(200).send({ message: 'Success', payload: todos })
    })
    .catch(e => {
      res.status(500).send({ message: e.message })
    })
})

router.get('/update/:todoId', verifyToken, async (req, res, next) => {
  const todoId = req.params.todoId
  ToDo.findById(todoId).populate('statusId')
    .then(todo => {
      res.status(200).send({ message: 'Success', payload: todo })
    })
    .catch(e => {
      res.status(500).send({ message: e.message })
    })
})

// /todo/:boardId/status/:statusId
router.get('/:boardId/status/:statusId', verifyToken, async (req, res, next) => {
  const boardId = req.params.boardId
  const statusId = req.params.statusId
  ToDo.find({ boardId: boardId, statusId: statusId }).populate('statusId')
    .then(todos => {
      res.status(200).send({ message: 'Success', payload: todos })
    })
    .catch(e => {
      res.status(500).send({ message: e.message })
    })
})

// /todo/
router.post('/', verifyToken, async (req, res, next) => {
  try {
    const { title, description, statusId, createdBy, boardId } = req.body
    const todo = new ToDo({ title, description, statusId, createdBy, boardId })
    await todo.save()
    res.status(201).send({
      data: [todo]
    })
  } catch (e) {
    next(e)
  }
})

// /todo/:todoId
router.patch('/:todoId', verifyToken, async (req, res, next) => {
  try {
    // const { title, description, statusId } = req.body  
    // const todo = await ToDo.findByIdAndUpdate(req.params.todoId, {title, description, statusId})
    const todo = await ToDo.findById(req.params.todoId);
    // Object.assign(todo, req.body);
    await todo.update(req.body)
    // await todo.save()
    res.status(201).send({
      data: [todo]
    })
  } catch (e) {
    console.log(e)
    next(e)
  }
})

// /todo/:todoId
router.delete('/:todoId', verifyToken, async (req, res, next) => {
  try {
    const { todoId } = req.params
    const doc = await ToDo.findByIdAndRemove(todoId)
    res.status(204).send({
      data: [doc]
    })
  } catch (e) {
    next(e)
  }
})

exports.router = router;