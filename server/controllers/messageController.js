const Message = require('../models/Message');

// @desc    Get all messages for a user
// @route   GET /api/messages
// @access  Public (should be protected in production)
const getMessages = async (req, res) => {
    console.log('📥 GET /api/messages');
    console.log('Query params:', req.query);

    try {
        const { email, type } = req.query;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Find messages where user is the recipient
        const messages = await Message.find({ toEmail: email })
            .sort({ createdAt: -1 }); // Newest first

        console.log(`✅ Found ${messages.length} messages for ${email}`);
        res.status(200).json(messages);
    } catch (error) {
        console.error('❌ Error fetching messages:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Send a message
// @route   POST /api/messages
// @access  Public (should be protected in production)
const sendMessage = async (req, res) => {
    console.log('📥 POST /api/messages');
    console.log('Request body:', req.body);

    const { from, fromEmail, fromType, to, toEmail, toType, subject, message, relatedApplication } = req.body;

    if (!from || !fromEmail || !to || !toEmail || !subject || !message) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const newMessage = await Message.create({
            from,
            fromEmail,
            fromType: fromType || 'Organization',
            to,
            toEmail,
            toType: toType || 'Student',
            subject,
            message,
            relatedApplication,
            read: false
        });

        console.log('✅ Message sent successfully:', newMessage._id);
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('❌ Error sending message:', error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Public (should be protected in production)
const markAsRead = async (req, res) => {
    console.log('📥 PUT /api/messages/:id/read');
    console.log('Message ID:', req.params.id);

    try {
        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        message.read = true;
        await message.save();

        console.log('✅ Message marked as read:', message._id);
        res.status(200).json(message);
    } catch (error) {
        console.error('❌ Error marking message as read:', error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get message statistics
// @route   GET /api/messages/stats
// @access  Public (should be protected in production)
const getMessageStats = async (req, res) => {
    console.log('📥 GET /api/messages/stats');

    try {
        const totalMessages = await Message.countDocuments();
        const unreadMessages = await Message.countDocuments({ read: false });
        const organizationMessages = await Message.countDocuments({ fromType: 'Organization' });
        const studentMessages = await Message.countDocuments({ fromType: 'Student' });

        const stats = {
            total: totalMessages,
            unread: unreadMessages,
            fromOrganizations: organizationMessages,
            fromStudents: studentMessages
        };

        console.log('✅ Message stats:', stats);
        res.status(200).json(stats);
    } catch (error) {
        console.error('❌ Error fetching message stats:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMessages,
    sendMessage,
    markAsRead,
    getMessageStats
};
