require('dotenv').config();
const mongoose = require('mongoose');
const Internship = require('./models/Internship');
const connectDB = require('./config/db');

const clearData = async () => {
    try {
        await connectDB();

        // Delete all internships
        await Internship.deleteMany();

        console.log('✅ All internship data cleared from database!');
        console.log('The database is now empty and ready for real postings.');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

clearData();
