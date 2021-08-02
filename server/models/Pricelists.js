const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pricelistsSchema = new Schema({
  all_pricelists: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
      },
      is_deleted: {
        type: Boolean,
        default: false,
        required: true,
      },
      is_default: {
        type: Boolean,
        default: false,
        required: true,
      },
      pricelist: [
        {
          id: {
            type: String,
            required: true,
          },
          embroidery_type: {
            type: String,
            required: true,
          },
          max_qty: {
            type: Number,
            required: true,
          },
          price_per_thus_stitches: {
            type: Number,
            required: true,
          },
          min_price: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  ],
})

module.exports = mongoose.model('Pricelists', pricelistsSchema)
