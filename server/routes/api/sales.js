const express = require('express');
const router = express.Router()

router.get('/sales', (req, res) => {
  res.send('Sales Route')
})


module.exports = router