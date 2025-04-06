import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error(err.message);
  }
};
export default connectDB;
