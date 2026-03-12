const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`MongoDB Connection Failed: ${error.message}`);
    console.warn('Server running without database. Set MONGODB_URI in .env to a valid MongoDB instance.');
    return false;
  }
};

module.exports = connectDB;
