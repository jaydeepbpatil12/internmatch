const express = require('express');
const router = express.Router();
const { getMessages, sendMessage, markAsRead, getMessageStats } = require('../controllers/messageController');

// Get message statistics
router.get('/stats', getMessageStats);

// Get messages for a user
router.get('/', getMessages);

// Send a message
router.post('/', sendMessage);

// Mark message as read
router.put('/:id/read', markAsRead);

module.exports = router;
