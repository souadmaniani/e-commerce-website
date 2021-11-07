const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const VariantsShema = new Schema({
  name: {
    type: String,
    unique: true,
  },
});

module.exports = Variants = model("variants", VariantsShema);
