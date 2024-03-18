const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Could not connect to MongoDB.', err);
    process.exit(1); // Exit process with failure
  }
}

module.exports = connectDB;
