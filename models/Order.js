const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
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
  amount: { type: String },
  address: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Order = model("orders", OrderSchema);
