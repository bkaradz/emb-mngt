const express = require('express')
const router = express.Router()
const Users = require('../../models/Users')
const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Joi = require('joi')

// @route   POST api/users
// @desc    Create user
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

  const { error, value } = schema.validateAsync(req.body)
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

    // // Return jsonwebtoken
    // const payload = {
    //   user: {
    //     id: user.id,
    //   },
    // }

    // jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRATION_TIME }, (err, token) => {
    //   if (err) throw err
    // })
    res.json(user)

    console.log('User registered')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

// @route   DELETE api/users/edit/:id
// @desc    Delete all users
// @access  Private
router.post('/delete/:id', auth, (req, res) => {})

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
