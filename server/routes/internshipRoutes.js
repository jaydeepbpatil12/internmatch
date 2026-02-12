const express = require('express');
const router = express.Router();
const { getInternships, createInternship } = require('../controllers/internshipController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getInternships);
router.post('/', createInternship); // Removed protect middleware for now

module.exports = router;
