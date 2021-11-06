var validator = require("validator");
const isEmpty = require("../utils/isEmpty");
const errors = {};
const ValidateRegisterInput = (data) => {
  data.email = isEmpty(data.email) ? "" : data.email;
  data.name = isEmpty(data.name) ? "" : data.name;
  data.password = isEmpty(data.password) ? "" : data.password;

  if (validator.isEmpty(data.email)) errors.email = "Email is Required";
  else if (!validator.isEmail(data.email))
    errors.email = "Email Address Not Valid";
  if (validator.isEmpty(data.name)) errors.name = "Name is Required";
  if (validator.isEmpty(data.password))
    errors.password = "Password is Required";
  else if (!validator.isLength(data.password, { min: 8, max: 30 }))
    errors.password = "Password must be between 8 and 30 caracters";
  // if (validator.isEmpty(data.password2))
  //   errors.password2 = "Confirm Password is Required";
  // else if (!validator.equals(data.password, data.password2))
  //   errors.password2 = "Password does not match";
  return {
    isValid: isEmpty(errors),
    errors,
  };
};

module.exports = ValidateRegisterInput;
