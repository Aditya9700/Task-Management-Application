import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`\x1b[32m✓ MongoDB Connected: ${conn.connection.host}\x1b[0m`);
  } catch (error) {
    console.error(`\x1b[31m✗ MongoDB Connection Failed!\x1b[0m`);
    console.error(`\x1b[31mError Details: ${error.message}\x1b[0m`);
    process.exit(1);
  }
};

export default connectDB;
