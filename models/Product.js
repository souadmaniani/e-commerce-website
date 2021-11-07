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
  category: {
    name: { type: String },
    icon: { type: String },
  },
  vars: [
    {
      varId: {
        type: Schema.Types.ObjectId,
        ref: "variants",
      },
      values: [
        {
          value: String,
          images: [],
        },
      ],
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Product = model("products", ProductSchema);
