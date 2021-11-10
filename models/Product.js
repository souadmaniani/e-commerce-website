const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  quantity: {
    type: number,
  },
  images: [],
  price: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Product = model("products", ProductSchema);
