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
  price: {
    type: Number,
  },
  attributes: {
    categories: {
      type: Array,
    },
    colors: {
      type: Array,
    },
    sizes: {
      type: Array,
    },
    stock: {
      type: Array,
    },
    image: {
      type: Array,
    },
    images: {
      type: Array,
    },
  },
});

module.exports = Product = model("products", ProductSchema);
