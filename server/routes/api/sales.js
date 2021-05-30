const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Sales Route')
})

module.exports = router
