import mongoose from 'mongoose';

const connectDb = async () => {
  const URI = process.env.MONGODB_URI; 
  try {
    await mongoose.connect(URI);
    console.log('Connected to DB');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit on failure
  }
};

export default connectDb;
