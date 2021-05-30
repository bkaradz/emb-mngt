const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Users = require('../../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { check, validationResult } = require('express-validator')

// @route   POST api/users/create
// @desc    Register user
// @access  Private
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('role', 'Role is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('mobile', 'Mobile number is required and must be like {eg 0773-123-456, 0296-123-789}')
      .exists()
      .custom((value, { req }) => {
        // const valueArray = value.split(',').filter((value) => value.trim().match(/\d{4}-\d{3}-\d{3}/))
        const valueArray = value.match(/(?:\d{3,5}|\(\d{3,5}\)){0,1}(?:[-\s]){0,1}\d{3,4}([-\s])\d{3}\1\d{3}/g)
        // console.log(valueArray)
        // console.log(req.body.mobile.split(','))
        return valueArray.length === req.body.mobile.split(',').length
      }),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
    check('passwordConfirmation', 'Confirmation Password field must match password field')
      .exists()
      .custom((value, { req }) => value === req.body.password),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      // Destructor req.body
      const { name, role, email, password, mobile } = req.body

      // Check if user exist
      const oldUser = await Users.findOne({ email })
      if (oldUser) {
        return res.status(400).json({ error: [{ msg: 'User already exists' }] })
      }

      // Create an array and trim
      let mobileArr = mobile.split(',').map((phone) => phone.trim())

      // Encrypt the password
      const salt = await bcrypt.genSalt(10)
      encryptPassword = await bcrypt.hash(password, salt)

      const user = new Users({
        name,
        role,
        email,
        mobile: mobileArr,
        password: encryptPassword,
      })

      await user.save()

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      }

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRATION_TIME }, (err, token) => {
        if (err) throw err
        res.json({ token })
      })

      console.log('User registered')
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Sever Error')
    }
  }
)

// @route   POST api/users/edit/:id
// @desc    Post all users
// @access  Private
router.post('/edit/:id', (req, res) => {})

// @route   DELETE api/users/edit/:id
// @desc    Delete all users
// @access  Private
router.post('/delete/:id', (req, res) => {})

module.exports = router
