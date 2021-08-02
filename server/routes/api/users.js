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
// @access  Public
// TODO make the route protected and access buy admin only
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

  const { error, value } = await schema.validateAsync(req.body)
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

    res.json(user)

    console.log('User registered')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

// @route   PUT api/users/:id
// @desc    Edit user by id
// @access  Private
router.put('/:id', auth, async (req, res) => {
  // Validation
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    role: Joi.string().required().valid('admin', 'sales', 'production', 'trimming', 'other'),
    email: Joi.string().email().required(),
    mobile: Joi.string().required(),
    password: Joi.string().min(6).required(),
    password2: Joi.ref('password'),
  })

  try {
    const { error, value } = await schema.validateAsync(req.body)

    if (error !== undefined) {
      return res.status(400).json(error)
    }

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
})

// @route   DELETE api/users/:id
// @desc    Edit user by id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
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
})

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
