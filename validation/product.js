const validator = require("validator");
const isEmpty = require("../utils/isEmpty");
const ValidateProductInput = (data) => {
  const errors = {};
  data.title = isEmpty(data.title) ? "" : data.title;
  data.description = isEmpty(data.description) ? "" : data.description;
  data.category = isEmpty(data.category) ? "" : data.category;
  data.quantity = isEmpty(data.quantity) ? "" : data.quantity;
  data.images = isEmpty(data.images) ? "" : data.images;
  data.price = isEmpty(data.price) ? "" : data.price;

  if (validator.isEmpty(data.title)) errors.title = "Title is Required";
  if (validator.isEmpty(data.description))
    errors.description = "Description is Required";
  if (validator.isEmpty(data.category))
    errors.category = "Category is Required";
  if (validator.isEmpty(data.quantity))
    errors.quantity = "Quantity is Required";
  if (validator.isEmpty(data.images)) errors.images = "Image is Required";
  if (validator.isEmpty(data.price)) errors.price = "Price is Required";
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = ValidateProductInput;
