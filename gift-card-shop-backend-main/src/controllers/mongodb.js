import mongoose from 'mongoose';

export default async function connectToDatabase(settings) {
  try {
    mongoose.set('strictQuery', true);
    
    await mongoose.connect(settings.MONGODB_URL);

    return 'Connected to MongoDB';
  } catch (err) {
    throw new Error(`MongoDB connection failed: ${err.message}`);
  }
}
