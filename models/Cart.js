const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CartSchema = new Schema({
  user: {
    type: Schema.Types.objectId,
    ref: "users",
  },
  products: [
    {
      productId: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  total: {
    type: Number,
  },
});

module.exports = Cart = model("cart", CartSchema);
