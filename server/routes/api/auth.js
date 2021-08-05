const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Users = require('../../models/Users')
const bcrypt = require('bcryptjs')
const Joi = require('joi')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

/**
 * @route   POST api/auth
 * @desc    Authenticate user & Get token
 * @access  Public
 */
router.post(
  '/',
  [
    body('email').isEmail().notEmpty().withMessage('Please include a valid email'),
    body('password').isString().notEmpty().isLength({ min: 6, max: 50 }).withMessage('Please include a valid password with 6 or more characters'),
  ],
  async (req, res) => {
    // Validate
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
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
      }

      // Match password
      const isMatch = await bcrypt.compare(password, user.password)

      // No match
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      }

      // TODO Change expiration time in production
      jwt.sign(payload, config.get('JWT_SECRET'), { expiresIn: config.get('EXPIRATION_TIME') }, (err, token) => {
        if (err) throw err
        return res.json({ token })
      })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Sever Error')
    }
  }
)

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
