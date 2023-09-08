import mongoose from "mongoose";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  code: String,
  price: Number,
  status: Boolean,
  stock: Number,
  category: String,
  thumbnails: Array,
});

export const productModel = mongoose.model(productsCollection, productSchema);
