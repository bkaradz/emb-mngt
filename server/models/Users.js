const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: [
    {
      type: String,
      required: true,
    },
  ],
  password: {
    type: String,
    required: true,
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
module.exports = mongoose.model('Users', UsersSchema)
