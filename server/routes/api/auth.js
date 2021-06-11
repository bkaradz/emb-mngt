const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Users = require('../../models/Users')
const bcrypt = require('bcryptjs')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
require('dotenv').config()

/**
 * @route   POST api/auth
 * @desc    Authenticate user & Get token
 * @access  Public
 */
router.post('/', async (req, res) => {
  // Validation
  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
  })

  const { error, value } = schema.validateAsync(req.body)

  if (error !== undefined) {
    return res.status(400).json(error)
  }
  try {
    // Destructor req.body
    const { email, password } = req.body

    // Check if user exist
    const user = await Users.findOne({ email })

    // Email does not exist
    if (!user) {
      return res.status(400).json({ error: [{ msg: 'Invalid Credentials' }] })
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password)

    // No match
    if (!isMatch) {
      return res.status(400).json({ error: [{ msg: 'Invalid Credentials' }] })
    }

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    }

    // TODO Change expiration time in production
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRATION_TIME }, (err, token) => {
      if (err) throw err
      res.json({ token })
    })
    res.status(200).json({ msg: 'User Logged In' })
    console.log('User is Logged In')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

/**
 * @route   GET api/users
 * @desc    Get Auth user
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select('-password -mobile')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).json('Server Error')
  }
})

module.exports = router
