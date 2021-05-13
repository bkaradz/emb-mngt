const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')

const app = express()

connectDB()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Listening to localhost port: ${port}`)
})
