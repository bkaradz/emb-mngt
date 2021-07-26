const express = require('express')
const router = express.Router()
const Joi = require('joi')
const Quotations = require('../../models/Quotations')
const _ = require('lodash')

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
