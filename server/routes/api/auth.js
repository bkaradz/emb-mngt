const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Users = require('../../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { check, validationResult } = require('express-validator')

// @route   GET api/users
// @desc    Get all users
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select('-password -mobile')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).json('Server Error')
  }
})

// @route   POST api/auth
// @desc    Authenticate user & Get token
// @access  Public
router.post('/', [check('email', 'Email is required').isEmail(), check('password', 'Password is required').not().isEmpty()], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
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

    console.log('User is Logged In')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

module.exports = router
