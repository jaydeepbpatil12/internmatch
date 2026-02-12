const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    from: { type: String, required: true },
    fromEmail: { type: String, required: true },
    fromType: { type: String, enum: ['Organization', 'Student'], default: 'Organization' },
    to: { type: String, required: true },
    toEmail: { type: String, required: true },
    toType: { type: String, enum: ['Organization', 'Student'], default: 'Student' },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    relatedApplication: { type: mongoose.Schema.Types.ObjectId, ref: 'Application' }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
