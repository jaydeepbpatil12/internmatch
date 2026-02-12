const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, enum: ['Internship', 'Project', 'Freelance'], default: 'Internship' },
    category: { type: String },
    duration: { type: String },
    description: { type: String, required: true },
    requirements: { type: String },
    skills: [{ type: String }],
    stipend: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Made optional
    status: { type: String, enum: ['Active', 'Closed'], default: 'Active' },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Internship', internshipSchema);
