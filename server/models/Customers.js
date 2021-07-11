const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var customersSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  name: {
    type: String,
    required: true,
    index: true,
  },
  notes: {
    type: String,
  },
  vatOrBpNo: {
    type: String,
    default: '',
  },
  isCompany: {
    type: String,
    required: true,
    default: 'individual',
    enum: ['individual', 'company'],
  },
  email: {
    type: String,
  },
  phone: [
    {
      type: String,
      required: true,
    },
  ],
  address: {
    type: String,
  },
  organization: {
    type: String,
  },
  balance: {
    type: Number, // TODO: fix for currency
    required: true,
    default: 0,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

//Export the model
module.exports = mongoose.model('Customers', customersSchema)
