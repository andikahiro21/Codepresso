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
    console.log("Received Token:", token);
    if (token) {
      verifyJwtToken(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          console.error("JWT Verification Error:", err.message);
          console.log("JWT Secret:", process.env.JWT_SECRET);
          return handleClientError(res, 403, "Token invalid, please login again");
        }
        console.log("Decoded JWT Payload:", decoded);
        const user = await Users.findByPk(decoded.data.id, {
          attributes: { exclude: ["password"] },
        });
        console.log(decoded.data.id);
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
