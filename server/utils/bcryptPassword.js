/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const bcrypt = require("bcrypt");
const salt = 10;
const { User } = require("../models");

const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const comparePassword = async (password, email) => {
  const user = await User.findOne({ where: { email: email } });

  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
};

module.exports = {
  hashPassword,
  comparePassword,
};
