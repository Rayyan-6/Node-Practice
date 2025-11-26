import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()
// const mongoURI = process.env.MONGO_URI
const mongoURI="mongodb://127.0.0.1:27017/myDatabase"



// export const connectDb= mongoose.connect(mongoURI)
// .then(() => console.log("Connected to MongoDB"))
// .catch((err)=>{ 
//     console.error("MongoDB connection error:", err)
//     process.exit(1)
// });


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
