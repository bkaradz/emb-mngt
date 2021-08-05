const mongoose = require('mongoose')
const config = require('config')

const connectDB = async () => {
  try {
    const db = config.get('DB_LINK')
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
    await mongoose.connect(db, options)
    console.log('Database connected.....')
  } catch (err) {
    console.error(`Could not connect to MongoDB, ${err}`)
    process.exit(1)
  }
}

module.exports = connectDB
