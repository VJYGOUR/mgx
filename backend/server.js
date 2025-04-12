import express from "express";
import mongoose from "mongoose";
import authRoute from "./auth/auth.route.js";
import connectDB from "./lib/db.js";
import { configDotenv } from "dotenv";
import cors from "cors";
connectDB();
const app = express();
configDotenv();
app.use(
  cors({
    origin: "http://localhost:5173", // or process.env.FRONTEND_URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/api/auth", authRoute);
app.listen(5000, () => {
  console.log("server is running on port 5000");
});
