const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()
const connectDB = require('./config/db')

const app = express()

// Connect Database
connectDB()

// Init Middleware
app.use(express.json())
app.use(cors())
app.use(helmet())

// Define Routes
app.use('/api/customers', require('./routes/api/customers'))
app.use('/api/orders', require('./routes/api/orders'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/products', require('./routes/api/products'))

// Define Ports
const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Listening to localhost port: ${port}`)
})
