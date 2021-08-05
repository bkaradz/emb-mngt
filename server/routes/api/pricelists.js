const express = require('express')
const router = express.Router()
const Pricelists = require('../../models/Pricelists')
const auth = require('../../middleware/auth')
const Joi = require('joi')

/*
    @route  POST api/settings/pricelist
    @desc   Create Pricelist
    @access private
*/
router.post('/pricelist', auth, async (req, res) => {
  // Validation

  const schema = Joi.object({
    is_deleted: Joi.boolean(),
    is_default: Joi.boolean(),
    pricelist: Joi.array().items(),
  })
  try {
    const { error, value } = await schema.validateAsync(req.body)

    if (error !== undefined) {
      return res.status(400).json(error)
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Sever Error')
  }
})

module.exports = router
