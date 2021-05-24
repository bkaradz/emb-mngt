const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Users = require('../../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { check, validationResult } = require('express-validator')

// @route   GET api/users
// @desc    Get all users
// @access  Private
router.get('/users', (req, res) => {})

// @route   GET api/users/:id
// @desc    Get user by id
// @access  Private
router.get('/users/:id', (req, res) => {})

// @route   POST api/users/create
// @desc    Create user
// @access  Private
router.post('/users/create', async (req, res) => {
  try {
    const { name, role, email, password, mobile } = req.body
    // Check if user exist
    const oldUser = await Users.findOne({ email })
    if (oldUser) {
      return res.status(400).json({ error: [{ msg: 'User already exists' }] })
    }

    const user = new Users({
      name,
      role,
      email,
      mobile,
      password,
    })

    // Encypt the password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    await user.save()

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err
      res.json({ token })
    })

    console.log('User registered')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

// @route   POST api/users/edit/:id
// @desc    Post all users
// @access  Private
router.post('/users/edit/:id', (req, res) => {})

// @route   DELETE api/users/edit/:id
// @desc    Delete all users
// @access  Private
router.post('/users/delete/:id', (req, res) => {})

module.exports = router
