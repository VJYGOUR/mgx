import mongoose from "mongoose";
const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, minlength: true, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("User", Schema);
export default User;
