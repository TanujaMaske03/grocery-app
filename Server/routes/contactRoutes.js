const express = require('express')
const router = express.Router()
const {
  sendMessage,
  getMessages,
  getMessageById,
  updateMessageStatus,
  deleteMessage
} = require('../controllers/contactController')
const { protect, authorize } = require('../middleware/auth')

router.post('/', sendMessage)
router.get('/', protect, authorize('admin'), getMessages)
router.get('/:id', protect, authorize('admin'), getMessageById)
router.put('/:id', protect, authorize('admin'), updateMessageStatus)
router.delete('/:id', protect, authorize('admin'), deleteMessage)

module.exports = router