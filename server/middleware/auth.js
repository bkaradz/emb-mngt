const jwt = require('jsonwebtoken')
const config = require('config')
const Users = require('../models/Users')

module.exports = async function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token')

  // // Get users
  // let user
  // try {
  //   user = await Users.find()
  //   console.log(user.length)
  // } catch (err) {
  //   // throw new Error('Invalid Users call')
  //   console.log('throw error')
  //   res.status(500).json({ error: [{ msg: 'Invalid Users call' }] })
  // }
  // if (user.length === 0) {
  //   req.user = { admin: 'add Admin' }
  //   next()
  // }

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: [{ msg: 'No token, authorization denied' }] })
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('JWT_SECRET'))
    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({ error: [{ msg: 'Token not valid' }] })
  }
}
