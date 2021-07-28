const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var quotationsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    index: true,
    ref: 'Customers',
  },
  pricelist_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pricelist',
  },
  order_number: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  comments: {
    type: String,
  },
  order_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  quote_expiry_date: {
    type: Date,
    required: true,
    default: Date.now + 6 * 24 * 60 * 60 * 1000,
  },
  required_date: {
    type: Date,
    required: true,
    default: Date.now + 6 * 24 * 60 * 60 * 1000,
  },
  total: {
    type: Number,
    required: true,
  },
  order_line: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Products',
      },
      productID: {
        // of the form xxx-xxx-xxxx /^([0-9]{3}-){2}[0-9]{4}/gm
        type: String,
        match: /^([0-9]{3}-){2}[0-9]{4}/gm,
        required: true,
        unique: true,
        index: true,
      },
      name: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      sales_price: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        default: 'emb_logo',
        enum: {
          values: ['emb_logo', 'shirt', 'threads', 'backing', 'other'],
          message: '{VALUE} is not supported',
        },
        required: true,
      },
      stitches: {
        type: Number,
        required: function () {
          return this.category === 'emb_logo'
        },
      },
    },
  ],
})

//Export the model
module.exports = mongoose.model('Quotations', quotationsSchema)
