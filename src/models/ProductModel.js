import mongoose from "mongoose";

// Define a schema
const Schema = mongoose.Schema;
const productSchema = new Schema({
  S_NO: String,
  Name: String,
  inputImageUrls: String,
  outputImageUrls: String,
  status: String,
  createdAt: Date,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Define a model
const Product = mongoose.model("product", productSchema);

export default Product;
