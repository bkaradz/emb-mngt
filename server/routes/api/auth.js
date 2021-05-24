const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/users')

// @route   GET api/users
// @desc    Get all users
// @access  Private
router.get('/auth', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).json('Server Error')
  }
})

module.exports = router
