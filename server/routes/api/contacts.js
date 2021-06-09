const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Joi = require('joi')
const Contacts = require('../../models/Contacts')

const auth = require('../../middleware/auth')

// @route   GET api/contacts
// @desc    Get all contacts
// @access  Private
router.get('/', async (req, res) => {
  try {
    const allContacts = await Contacts.find({ deleted: false }).sort({ name: 1 })
    res.json(allContacts)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

// @route   GET api/contacts/:id
// @desc    Get one contact contact by id
// @access  Private
router.get('/:id', async (req, res) => {
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
router.post('/create', auth, async (req, res) => {
  // Validation
  const schema = Joi.object({
    name: Joi.string().required(),
    vatBpNo: Joi.string(),
    isCompany: Joi.string().required().valid('Individual', 'company'),
    email: Joi.string().email(),
    mobile: Joi.array().items(Joi.string().required()),
    address: Joi.string().required(),
    balance: Joi.number().required(),
  })

  const { error, value } = schema.validateAsync(req.body)
  if (error !== undefined) {
    return res.status(400).json(error)
  }
  try {
    const contact = new Contacts({
      user: req.user.id,
      name: req.body.name,
      vatBpNo: req.body.vatBpNo,
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
})

// @route   POST api/contacts/Edit/:id
// @desc    Edit contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
  // Validation
  const schema = Joi.object({
    name: Joi.string().required(),
    isCompany: Joi.string().required().valid('Individual', 'company'),
    vatBpNo: Joi.string(),
    email: Joi.string().email(),
    mobile: Joi.array().items(Joi.string().required()),
    address: Joi.string().required(),
    balance: Joi.number().required(),
  })

  const { error, value } = schema.validateAsync(req.body)

  if (error !== undefined) {
    return res.status(400).json(error)
  }
  try {
    const contact = {
      name: req.body.name,
      vatBpNo: req.body.vatBpNo,
      isCompany: req.body.isCompany,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      balance: req.body.balance,
    }

    const update = await Contacts.Update({ _id: req.params.id }, { $set: { contact } })

    res.json(update)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

// @route   POST api/contacts/Delete/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const update = await Contacts.Update({ _id: req.params.id }, { $set: { deleted: true } })
    // const update = await Contacts.findOneAndUpdate(req.params.id, contact)

    res.json(update)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

module.exports = router
