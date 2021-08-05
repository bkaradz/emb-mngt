const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()
const connectDB = require('./config/db')
const config = require('config')

const app = express()

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`app: ${app.get('env')}`)
console.log(`Application name: ${config.get('name')}`)
console.log(`Application secrets: ${config.get('JWT_SECRET')}`)

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
app.use('/api/settings/', require('./routes/api/pricelists'))
app.use('/api/sales/', require('./routes/api/quotations'))

// Define Ports
const port = process.env.PORT || 4000

const server = app.listen(port, () => console.log(`Listening to localhost port: ${port}`))

module.exports = server
