const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Joi = require('joi')
const Products = require('../../models/Products')

// File upload
const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, 'logos.csv')
  },
})

var upload = multer({ storage: storage })

const auth = require('../../middleware/auth')

/**
 *    @route   POST api/products
 *    @desc    Create product
 *    @access  Private
 */
router.post('/', auth, async (req, res) => {
  // Validation
  const schema = Joi.object({
    name: Joi.string().required(),
    productID: Joi.string().required(),
    title: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    sales_price: Joi.number().when('category', { is: 'emb_logo', then: Joi.optional(), otherwise: Joi.required() }),
    category: Joi.string().required().valid('emb_logo', 'shirt', 'threads', 'backing', 'other'),
    stitches: Joi.number().when('category', { is: 'emb_logo', then: Joi.optional(), otherwise: Joi.required() }),
  })

  try {
    // Validation
    const { error, value } = await schema.validate(req.body)
    if (error !== undefined) {
      return res.status(400).json(error)
    }
    // Product creation
    const { name, productID, title, description, image, sales_price, category, stitches } = req.body
    const product = new Products({
      user: req.user.id,
      name,
      productID,
      title,
      description,
      image,
      sales_price,
      category,
      stitches,
    })

    const post = await product.save()

    res.status(200).json(post)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

/**
 *    @route   PUT api/products
 *    @desc    Edit product by id
 *    @access  Private
 */
router.put('/:id', auth, async (req, res) => {
  // Validation
  const schema = Joi.object({
    name: Joi.string().required(),
    productID: Joi.string().required(),
    title: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    sales_price: Joi.number().when('category', { is: 'emb_logo', then: Joi.optional(), otherwise: Joi.required() }),
    category: Joi.string().required().valid('emb_logo', 'shirt', 'threads', 'backing', 'other'),
    stitches: Joi.number().when('category', { is: 'emb_logo', then: Joi.optional(), otherwise: Joi.required() }),
  })

  try {
    // Validation
    const { error, value } = await schema.validate(req.body)
    if (error !== undefined) {
      return res.status(400).json(error)
    }
    // Product creation
    const { name, productID, title, description, image, sales_price, category, stitches } = req.body
    const product = new Products({
      user: req.user.id,
      name,
      productID,
      title,
      description,
      image,
      sales_price,
      category,
      stitches,
    })

    const post = await Products.Update({ _id: req.params.id }, { $set: product })

    res.status(200).json(post)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

/**
 *    @route   GET api/products
 *    @desc    Get all products
 *    @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const products = await Products.find()
    res.status(200).json(products)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

/**
 *    @route   GET api/products/:id
 *    @desc    Get product by id
 *    @access  Private
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const products = await Products.findById(req.params.id)

    res.status(200).json(products)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

/**
 *    @route   DELETE api/products/:id
 *    @desc    Delete product by id
 *    @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const products = await Products.Update({ _id: req.params.id }, { $set: { deleted: true } })

    res.status(200).json(products)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

/**
 *    @route   DELETE api/products/:id
 *    @desc    Delete product by id
 *    @access  Private
 */
router.post('/upload', [auth, upload.single('csv_file')], async (req, res) => {
  console.log("I don't know: ", req.file)
  try {
    res.status(200).send(req.file)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

module.exports = router
