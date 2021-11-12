const isEmpty = require("isEmpty");
const validator = require("validator");

const ValidateCartInput = (data) => {
  const errors = {};
  data.products = isEmpty(data.products) ? "" : data.products;
  data.total = isEmpty(data.total) ? "" : data.total;
  if (validator.isEmpty(data.products)) errors.products = "product is required";
  if (validator.isEmpty(data.total)) errors.total = "total is required";
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
module.exports = ValidateCartInput;
