const express = require('express')
const router = express.Router()
const Joi = require('joi')
const Customers = require('../../models/Customers')
const csv = require('csvtojson')

// File upload
const multer = require('multer')
let storage = multer.memoryStorage()
var upload = multer({ storage: storage })
const auth = require('../../middleware/auth')

/**
 * @route   GET api/customers
 * @desc    Get all customers
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const allCustomers = await Customers.find({ isDeleted: false }).sort({ name: 1 })

    res.status(200).json(allCustomers)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

/**
 * @route   GET api/customers/:id
 * @desc    Get one customer by id
 * @access  Private
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const oneCustomers = await Customers.findById(req.params.id)
    res.status(200).json(oneCustomers)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

/**
 * @route   POST api/customers
 * @desc    Create customer
 * @access  Private
 */
router.post('/', auth, async (req, res) => {
  // Validation
  const schema = Joi.object({
    /**
     * .messages({
      'string.base': `"name" should be a type of 'text'`,
      'string.empty': `"name" cannot be an empty field`,
      'string.min': `"name" should have a minimum length of {#limit}`,
      'any.required': `"name" is a required field`
    }),
     */

    name: Joi.string().required(),
    vatBpNo: Joi.string(),
    isCompany: Joi.string().required().valid('individual', 'company'),
    email: Joi.string().email(),
    phone: Joi.array().items(Joi.string().required()),
    address: Joi.string(),
    balance: Joi.number(),
  })

  try {
    const { error, value } = await schema.validate(req.body)

    if (error !== undefined) {
      console.error(error.details[0].message)
      return res.status(400).json(error.details[0].message)
    }
    const customer = new Customers({
      ...req.body,
      user_id: req.user.id,
    })

    const post = await customer.save()
    console.log(post)
    res.status(200).json(post)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

/**
 * @route   PUT api/customers/:id
 * @desc    Edit customer
 * @access  Private
 */
router.put('/:id', auth, async (req, res) => {
  // Validation
  const schema = Joi.object({
    name: Joi.string().required(),
    isCompany: Joi.string().required().valid('individual', 'company'),
    vatBpNo: Joi.string(),
    email: Joi.string().email(),
    mobile: Joi.array().items(Joi.string().required()),
    address: Joi.string(),
    balance: Joi.number(),
  })

  try {
    const { error, value } = await schema.validate(req.body)

    if (error !== undefined) {
      return res.status(400).json(error)
    }
    const customer = {
      ...req.body,
    }

    const update = await Customers.findByIdAndUpdate(req.params.id, { $set: { customer } })

    res.status(200).json(update)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

/**
 *   @route   DELETE api/customers/:id
 *   @desc    Delete customer
 *   @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const update = await Customers.findByIdAndUpdate(req.params.id, { $set: { isDeleted: true } })

    res.status(200).json(update)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

/**
 *    @route   POST api/customers/upload
 *    @desc    Create many customers
 *    @access  Private
 */
router.post('/upload', [auth, upload.single('csv_file')], async (req, res) => {
  try {
    let csvString = req.file.buffer.toString()
    console.log(csvString)
    const jsonArray = await csv().fromString(csvString)
    console.log(jsonArray)

    const newArray = jsonArray.map((array) => {
      const { Name, Email, Phone, Organization } = array
      return { user_id: req.user.id, name: Name, phone: Phone, organization: Organization, email: Email }
    })
    const resp = await Customers.insertMany(newArray)
    res.status(200).send(resp)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

module.exports = router
