const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Contacts = require('../../models/contacts')
const { check, validationResult } = require('express-validator')

// @route   GET api/contacts
// @desc    Get all contacts
// @access  Private
router.get('/contacts', async (req, res) => {
  try {
    const allContacts = await Contacts.find({ deleted: false }).sort({ name: 1 })
    res.json(allContacts)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

// @route   GET api/contacts/:id
// @desc    Create one contact by id
// @access  Private
router.get('/contacts/view/:id', async (req, res) => {
  try {
    const oneContacts = await Contacts.findById(req.params.id)
    res.json(oneContacts)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

// @route   POST api/contacts/create
// @desc    Create contact
// @access  Private
router.post(
  '/contacts/create',
  [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('isCompany').not().isEmpty().withMessage('Company or Individual is required'),
    check('phone').not().isEmpty().withMessage('Phone Number is required'), // TODO: To fix the regex validation of phone numbers
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const contact = new Contacts({
        name: req.body.name,
        isCompany: req.body.isCompany,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        balance: req.body.balance,
      })

      const post = await contact.save()

      res.json(post)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Sever Error')
    }
  }
)

// @route   POST api/contacts/Edit/:id
// @desc    Edit contact
// @access  Private
router.post(
  '/contacts/Edit/:id',
  [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('isCompany').not().isEmpty().withMessage('Company or Individual is required'),
    check('phone').not().isEmpty().withMessage('Phone Number is required'), // TODO: To fix the regex validation of phone numbers
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const contact = {
        name: req.body.name,
        isCompany: req.body.isCompany,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        balance: req.body.balance,
      }

      const update = await Contacts.findByIdAndUpdate(req.params.id, contact)
      // const update = await Contacts.findOneAndUpdate(req.params.id, contact)

      res.json('Contact Updated')
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Sever Error')
    }
  }
)
// @route   POST api/contacts/Delete/:id
// @desc    Delete contact
// @access  Private
router.post(
  '/contacts/delete/:id',
  [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('isCompany').not().isEmpty().withMessage('Company or Individual is required'),
    check('phone').not().isEmpty().withMessage('Phone Number is required'), // TODO: To fix the regex validation of phone numbers
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const contact = {
        name: req.body.name,
        isCompany: req.body.isCompany,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        balance: req.body.balance,
        deleted: true,
      }

      const update = await Contacts.findByIdAndUpdate(req.params.id, contact)
      // const update = await Contacts.findOneAndUpdate(req.params.id, contact)

      res.json('Contact Deleted')
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Sever Error')
    }
  }
)

module.exports = router
