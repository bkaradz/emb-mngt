const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')

const app = express()

// Connect Database
connectDB()

// Init Middleware
app.use(express.json())
app.use(cors())

// Define Routes
app.use('/api/contacts', require('./routes/api/contacts'))
app.use('/api/sales', require('./routes/api/sales'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

// Define Ports
const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Listening to localhost port: ${port}`)
})
