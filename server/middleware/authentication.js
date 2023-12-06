/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const verifyJwtToken = require("../utils/verifyTokenJwt");
require("dotenv").config();

const { Users } = require("../models");
const { handleServerError, handleClientError } = require("../helpers/handleError");
const Authenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader) {
      return handleClientError(res, 401, "authentication required");
    }

    const token = authHeader.split(" ")[1];
    if (token) {
      verifyJwtToken(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
          return handleClientError(res, 403, "Token invalid, please login again");
        }
        const user = await Users.findByPk(decoded.id, {
          attributes: { exclude: ["password"] },
        });
        if (!user) return handleClientError(res, 404, "User Notfound");
        req.user = user;
        next();
      });
    } else {
      return handleClientError(res, 401, "Token is required");
    }
  } catch (error) {
    return handleServerError(res);
  }
};

module.exports = Authenticated;
