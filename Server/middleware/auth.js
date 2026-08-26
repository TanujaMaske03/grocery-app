const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.error('Auth error:', error)
      return res.status(401).json({ success: false, message: 'Not authorized' })
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' })
  }
}

// Authorize roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authorized' })
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Role not authorized' })
    }
    next()
  }
}

module.exports = { protect, authorize }