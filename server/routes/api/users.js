const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Users = require('../../models/Users')
const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Joi = require('joi')
// const { check, validationResult } = require('express-validator')

// @route   POST api/users/create
// @desc    Register user
// @access  Private
// TODO make the route protected and access bu admin only
router.post('/', async (req, res) => {
  // Validation
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    role: Joi.string().required().valid('admin', 'sales', 'production', 'trimming', 'other'),
    email: Joi.string().email().required(),
    mobile: Joi.string().required(),
    password: Joi.string().min(6).required(),
    password2: Joi.ref('password'),
  })

  const { error, value } = schema.validate(req.body)
  // console.log(`error: ${error}, value: ${value}`)
  if (error !== undefined) {
    return res.status(400).json(error)
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
})

// @route   DELETE api/users/edit/:id
// @desc    Delete all users
// @access  Private
router.post('/delete/:id', (req, res) => {})

module.exports = router

// express-validation
//  [
//     check('name', 'Name is required').not().isEmpty(),
//     check('role', 'Role is required').not().isEmpty(),
//     check('email', 'Email is required').isEmail(),
//     check('mobile', 'Mobile number is required and must be like {eg 0773-123-456, 0296-123-789}')
//       .exists()
//       .custom((value, { req }) => {
//         // const valueArray = value.split(',').filter((value) => value.trim().match(/\d{4}-\d{3}-\d{3}/))
//         const valueArray = value.match(/(?:\d{3,5}|\(\d{3,5}\)){0,1}(?:[-\s]){0,1}\d{3,4}([-\s])\d{3}\1\d{3}/g)
//         // console.log(valueArray)
//         // console.log(req.body.mobile.split(','))
//         return valueArray.length === req.body.mobile.split(',').length
//       }),
//     check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
//     check('passwordConfirmation', 'Confirmation Password field must match password field')
//       .exists()
//       .custom((value, { req }) => value === req.body.password),
//   ],
//  const errors = validationResult(req)
