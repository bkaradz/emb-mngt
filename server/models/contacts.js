const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var contactsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  isCompany: {
    type: String,
    required: true,
    default: 'Individual',
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
  balance: {
    type: Number, // TODO: fix for currency
    required: true,
    default: 0,
  },
  deleted: {
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
module.exports = mongoose.model('Contacts', contactsSchema)
