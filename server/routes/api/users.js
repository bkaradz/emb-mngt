const express = require('express')
const router = express.Router()
const Users = require('../../models/Users')
const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const { body, validationResult, param } = require('express-validator')

const debug = false

// @route   POST api/users
// @desc    Create user
// @access  Public
// TODO make the route protected and access buy admin only
router.post(
  '/',
  [
    body('name').isString().notEmpty().withMessage('Please enter a valid name'),
    body('role').isString().notEmpty().withMessage('Please enter a valid role'),
    body('email').isEmail().notEmpty().withMessage('Please include a valid email'),
    body('mobile').isString().notEmpty().withMessage('Please enter a valid phone number'),
    body('password').isString().notEmpty().withMessage('Please enter a valid password'),
    body('password2').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password')
      }
      // Indicates the success of this synchronous custom validator
      return true
    }),
  ],
  async (req, res) => {
    // Validate
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

      res.json(user)

      if (debug) console.log('User registered')
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Sever Error')
    }
  }
)

// @route   PUT api/users/:id
// @desc    Edit user by id
// @access  Private
router.put(
  '/:id',
  [
    body('name').isString().notEmpty().withMessage('Please enter a valid name'),
    body('role').isString().notEmpty().withMessage('Please enter a valid role'),
    body('email').isEmail().notEmpty().withMessage('Please include a valid email'),
    body('mobile').isString().notEmpty().withMessage('Please enter a valid phone number'),
    body('password').isString().notEmpty().withMessage('Please enter a valid password'),
    body('password2').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password')
      }
      // Indicates the success of this synchronous custom validator
      return true
    }),
  ],
  auth,
  async (req, res) => {
    // Validate
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      // Destructor req.body
      const { name, role, email, password, mobile } = req.body

      // Create an array and trim
      let mobileArr = mobile.split(',').map((phone) => phone.trim())

      // Encrypt the password
      const salt = await bcrypt.genSalt(10)
      encryptPassword = await bcrypt.hash(password, salt)

      const userUpdate = {
        name,
        role,
        email,
        mobile: mobileArr,
        password: encryptPassword,
      }

      // console.log(Users)

      // const update = await Users.findByIdAndUpdate(req.params.id, { $set: { userUpdate } })
      const update = await Users.findByIdAndUpdate(req.params.id, userUpdate, { new: true })

      // console.log(update)

      res.status(200).json(update)
    } catch (err) {
      console.error(err)
      res.status(500).send('Sever Error')
    }
  }
)

// @route   DELETE api/users/:id
// @desc    Edit user by id
// @access  Private
router.delete(
  '/:id',
  [
    auth,
    param('id').customSanitizer((value) => {
      return ObjectId(value)
    }),
  ],
  async (req, res) => {
    // Validation

    try {
      const userUpdate = {
        isDeleted: true,
      }

      // console.log(req.params.id)

      const update = await Users.findByIdAndUpdate(req.params.id, userUpdate, { new: true })

      // console.log(update)

      res.status(200).json(update)
    } catch (err) {
      console.error(err)
      res.status(500).send('Sever Error')
    }
  }
)

// @route   GET api/users/
// @desc    GET all users
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const allUsers = await Users.find().sort({ name: 1 }).select('-password')
    res.status(200).json(allUsers)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

module.exports = router
