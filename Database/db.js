import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const mongoURI="mongodb://127.0.0.1:27017/myDatabase"


export const connectDb = async () => {
    console.log("Inside connectDb function")
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
