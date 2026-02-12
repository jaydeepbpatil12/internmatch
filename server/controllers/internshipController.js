const Internship = require('../models/Internship');

// @desc    Get all internships
// @route   GET /api/internships
// @access  Public
const getInternships = async (req, res) => {
    try {
        const internships = await Internship.find().populate('postedBy', 'name email');
        res.json(internships);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new internship
// @route   POST /api/internships
// @access  Private (Organization)
const createInternship = async (req, res) => {
    console.log('📥 Received POST /api/internships');
    console.log('📦 Request body:', req.body);

    const { title, company, location, type, category, duration, description, skills, requirements, stipend, status } = req.body;

    if (!title || !description || !company) {
        console.log('❌ Validation failed - missing required fields');
        console.log('Title:', title, 'Description:', description, 'Company:', company);
        return res.status(400).json({ message: 'Please add all required fields' });
    }

    try {
        console.log('💾 Attempting to create internship...');
        const internship = await Internship.create({
            title,
            company,
            location,
            type,
            category,
            duration,
            description,
            requirements,
            skills,
            stipend,
            status: status || 'Active',
            postedBy: req.user?._id // Optional - only if authenticated
        });
        console.log('✅ Internship created successfully:', internship._id);
        res.status(201).json(internship);
    } catch (error) {
        console.error('❌ Error creating internship:', error.message);
        console.error('Full error:', error);
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getInternships, createInternship };
