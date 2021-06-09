const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var productsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  productID: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  sales_price: {
    type: Number,
    required: function () {
      return this.category !== 'emb_logo'
    },
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
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

//Export the model
module.exports = mongoose.model('Products', productsSchema)
