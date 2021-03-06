var validator = require("validator");
const isEmpty = require("../utils/isEmpty");
const errors = {};
const ValidateLoginInput = (data) => {
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  if (validator.isEmpty(data.email)) errors.email = "Email is Required";
  else if (!validator.isEmail(data.email)) errors.email = "Email Address Not Valid";
  if (validator.isEmpty(data.password))
    errors.password = "Password is Required";
  else if (!validator.isLength(data.password, {min: 8, max: 30}))
    errors.password = "Password must be between 8 and 30 caracters";
  return {
    isValid: isEmpty(errors),
    errors,
  };
};

module.exports = ValidateLoginInput;
