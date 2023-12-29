/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const bcrypt = require("bcrypt");
const salt = 10;
const { Users } = require("../models");

const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const comparePassword = async (password, email) => {
  const user = await Users.findOne({ where: { email: email } });

  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
};

module.exports = {
  hashPassword,
  comparePassword,
};
