const express = require('express')
const router = express.Router()
const Status = require('../models/status')
const { verifyToken } = require('../middleware/auth')

// /status
router.get('/', verifyToken, (req, res, next) => {
  Status.find({})
    .then(status => {
      res.status(200).send({ message: 'Success', payload: status })
    })
    .catch(e => {
      res.status(500).send({ message: e.message })
    })
});

// /status/:statusId
router.get('/:statusId', verifyToken, async (req, res, next) => {
  const statusId = req.params.statusId
  try {
    const status = await Status.findById(statusId)
    res.status(200).send({
      data: [status]
    })
  } catch (e) {
    next(e)
  }
})


exports.router = router;