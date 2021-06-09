const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Joi = require('joi')
const Products = require('../../models/Products')

const auth = require('../../middleware/auth')

/*
 *    @route   POST api/products
 *    @desc    Create product
 *    @access  Private
 */
router.post('/', auth, async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    productID: Joi.number().required(),
    title: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    sales_price: Joi.string().required(),
    category: Joi.string().required().valid('emb_logo', 'shirt', 'threads', 'backing', 'other'),
    stitches: Joi.number().when('category', { is: 'emb_logo', then: Joi.required() }),
  })

  const { error, value } = schema.validateAsync(req.body)
  if (error !== undefined) {
    return res.status(400).json(error)
  }
  try {
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

    const post = await contact.save()

    res.json(post)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
})

module.exports = router
