const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: 'other',
    enum: {
      values: ['admin', 'sales', 'production', 'trimming', 'other'],
      message: '{VALUE} is not supported',
    },
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
module.exports = mongoose.model('Users', UsersSchema)
