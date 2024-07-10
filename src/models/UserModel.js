import mongoose from "mongoose";

// Define a schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
  status: String,
  createdAt: Date,
});

// Define a model
const User = mongoose.model("User", userSchema);

export default User;
