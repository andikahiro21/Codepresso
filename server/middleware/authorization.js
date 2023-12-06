/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const { handleClientError } = require("../helpers/handleError");

const isAdmin = async (req, res, next) => {
  const { role } = req.user;
  if (role !== 1) {
    return handleClientError(res, 403, "You are not an admin");
  } else {
    next();
  }
};
const isUser = async (req, res, next) => {
  const { role } = req.user;
  if (role !== 2) {
    return handleClientError(res, 403, "You are not an user");
  } else {
    next();
  }
};

module.exports = { isAdmin, isUser };
