import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  id: Number,
  products: Array,
});

export const cartModel = mongoose.model(cartsCollection, cartSchema);
