const express = require('express')
const router = express.Router()
const Joi = require('joi')
const Products = require('../../models/Products')
const csv = require('csvtojson')
const _ = require('lodash')

// File upload
const multer = require('multer')

let storage = multer.memoryStorage()

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
      user_id: req.user.id,
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
      user_id: req.user.id,
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
 *    @route   GET api/products?page=1&pageSize=10
 *    @desc    Get all products with pagination as params
 *    @access  Private
 */
router.get('/', auth, async (req, res) => {
  // const { page = 1, pageSize = 10 } = req.body
  try {
    const products = await Products.find({ isDeleted: false })
    // .limit(pageSize * 1)
    // .skip((page - 1) * pageSize)
    // .sort({ name: 1 })
    // .exec()
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
    const products = await Products.Update({ _id: req.params.id }, { $set: { isDeleted: true } })

    res.status(200).json(products)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

/**
 *    @route   POST api/products/upload
 *    @desc    Create many product
 *    @access  Private
 */
router.post('/upload', [auth, upload.single('csv_file')], async (req, res) => {
  try {
    const products = await Products.find({}).sort({ _id: -1 }).limit(1).select('productID')
    let productID = ''

    if (products.length === 0) {
      // set the productID to the initial Value xxx-xxx-xxxx (xxyxxyxxxx)
      productID = '100-000-0000'
    } else {
      productID = products.productID
    }

    let csvString = req.file.buffer.toString()
    const jsonArray = await csv().fromString(csvString)

    const newArray = jsonArray.map((array) => {
      const { Name, Title, Stitches } = array
      // console.log(productID)
      productID = incProductID(productID)
      return { user_id: req.user.id, name: Name, title: Title, stitches: parseInt(Stitches), category: 'emb_logo', productID }
    })
    const resp = await Products.insertMany(newArray)
    res.status(200).send(resp)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

const incProductID = (productID) => {
  // console.log(productID)
  // console.log(typeof productID)
  oldProductID = productID.replace(/-/g, '') // remove - from string
  // oldProductID = productID.replaceAll('-', '') // remove - from string
  strProductID = (parseInt(oldProductID) + 1).toString() // convert to int and add one then covert to string
  productID = `${strProductID.slice(0, 3)}-${strProductID.slice(3, 6)}-${strProductID.slice(6)}`

  return productID
}

/**
 *    @route   PUT api/products/update
 *    @desc    Edit multiple product
 *    @access  Private
 *    TODO:    Test this route
 */
router.put('/update', [auth, upload.single('csv_file')], async (req, res) => {
  try {
    let csvString = req.file.buffer.toString()
    const jsonArray = await csv().fromString(csvString)

    const newArray = jsonArray.map(async (array) => {
      const { Name, Title, Stitches } = array
      productID = incProductID(productID)
      const resp = await Products.Update({ name: Name }, { $set: { user: req.user.id, name: Name, title: Title, stitches: parseInt(Stitches) } })
      return resp
    })

    res.status(200).send(newArray)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

module.exports = router
