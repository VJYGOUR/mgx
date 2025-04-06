import express from "express";
import mongoose from "mongoose";
import authRoute from "./auth/auth.route.js";
import connectDB from "./lib/db.js";
import { configDotenv } from "dotenv";
connectDB();
const app = express();
configDotenv();
app.use(express.json());
app.use("/api/auth", authRoute);
app.listen(5000, () => {
  console.log("server is running on port 5000");
});
