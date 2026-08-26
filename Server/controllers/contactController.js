const Contact = require('../models/Contact')

// @desc    Send contact message
// @route   POST /api/contact
// @access  Public
const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      })
    }

    // Create contact message
    const contact = await Contact.create({
      name,
      email,
      subject,
      message
    })

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: contact
    })
  } catch (error) {
    console.error('Contact error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    })
  }
}

// @desc    Get all messages (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    })
  } catch (error) {
    console.error('Get messages error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Get single message (Admin only)
// @route   GET /api/contact/:id
// @access  Private/Admin
const getMessageById = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id)
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      })
    }
    res.status(200).json({
      success: true,
      data: message
    })
  } catch (error) {
    console.error('Get message error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Update message status (Admin only)
// @route   PUT /api/contact/:id
// @access  Private/Admin
const updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body
    if (!['unread', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      })
    }

    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      })
    }

    res.status(200).json({
      success: true,
      data: message
    })
  } catch (error) {
    console.error('Update message error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Delete message (Admin only)
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteMessage = async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id)
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      })
    }
    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    })
  } catch (error) {
    console.error('Delete message error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

module.exports = {
  sendMessage,
  getMessages,
  getMessageById,
  updateMessageStatus,
  deleteMessage
}