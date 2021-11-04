var validator = require("validator");
const isEmpty = require("../utils/isEmpty");
const errors = {};
const ValidateRegisterInput = (data) => {
  data.email = isEmpty(data.email) ? "" : data.email;
  data.name = isEmpty(data.name) ? "" : data.name;
  data.password = isEmpty(data.password) ? "" : data.password;

  if (validator.isEmpty(data.email)) errors.email = "Email is Required";
  else if (!validator.isEmail(data.email)) errors.email = "Email Not Valid";
  if (validator.isEmpty(data.name)) errors.name = "Name is Required";
  if (validator.isEmpty(data.password))
    errors.password = "Password is Required";
  return {
    isValid: isEmpty(errors),
    errors,
  };
};

module.exports = ValidateRegisterInput;
