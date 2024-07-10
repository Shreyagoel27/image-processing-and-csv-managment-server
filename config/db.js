import mongoose from "mongoose";
import { config } from "../config/index.js";

const db = config.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("Database Connected");
  } catch (err) {
    console.log(err.message);

    process.exit(1);
  }
};

export default connectDB;
