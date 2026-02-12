const express = require('express');
const router = express.Router();
const { submitContact, getAllContacts, updateContactStatus } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

// Public route
router.post('/', submitContact);

// Protected routes (for admin)
router.get('/', protect, getAllContacts);
router.put('/:id', protect, updateContactStatus);

module.exports = router;
