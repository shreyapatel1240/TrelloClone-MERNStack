const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const tokenService = require('../utils/tokenService')

const { verifyToken, issueToken } = require('../middleware/auth')

// /user
router.route('/')
  .get((req, res, next) => {
    User.find({})
      .then(status => {
        res.status(200).send({ message: 'Success', payload: status })
      })
      .catch(e => {
        res.status(500).send({ message: e.message })
      })
  });

// /user/:userId
// router.get('/:userId', async (req, res, next) => {
//   const userId = req.params.userId
//   try {
//     const user = await User.findById(userId)
//     res.status(200).send({
//       data: [user]
//     })
//   } catch (e) {
//     next(e)
//   }
// })

// /user/
router.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName, userName, password } = req.body
    const user = new User({ firstName, lastName, userName, password })
    await user.save()
    const token = tokenService.create(user)
    res.status(200).send({
      data: user,
      token,
    })
  } catch (e) {
    next(e)
  }
})

// /user/:userId
router.post('/:userId', async (req, res, next) => {
  try {
    const user = new User()
    await user.findByIdAndUpdate(req.params.userId, req.body, { new: true }, (e, user) => {
      if (e) {
        return res.status(500).send(e)
      }
      res.status(200).send({ data: user })
    })
    res.status(200).send({
      data: user
    })
  } catch (e) {
    next(e)
  }
})

const getUserById = async (req, res, next) => {
  const { user } = req.decoded
  if (user && user.id) {
    try {
      const doc = await User.findById(user.id)
      req.user = doc
      next()
    } catch (e) {
      next(e)
    }
  }
}

router.get('/current', verifyToken, getUserById, (req, res, next) => {
  if (req.user) {
    res.status(200).send(req.user)
  } else {
    next(new Error('not found'))
  }
})

exports.router = router;