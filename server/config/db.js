const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
  try {
    const db = process.env.DB_LINK
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
    await mongoose.connect(db, options)
    console.log('Database connected.....')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB
