/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const { countDistance } = require("../helpers/countDistance");
const { handleServerError, handleClientError } = require("../helpers/handleError");
const handleResponseSuccess = require("../helpers/responseSuccess");
const loadData = require("../helpers/databaseHelper");
const path = require("path");
const { Address, Baskets } = require("../models");

exports.getDistance = async (req, res) => {
  try {
    const database = path.join(__dirname, "../database/cafeLoc.json");
    const response = loadData(database);
    if (!response) return handleServerError(res);
    const latStart = response.latStart;
    const longStart = response.longStart;
    const price = response.price;

    const authData = req.user;

    if (!latStart || !longStart) {
      return handleClientError(res, 404, "Latitude Start or Longitude Start not found");
    }

    const activeAddress = await Address.findOne({
      attributes: ["lat", "long"],
      where: {
        user_id: authData.id,
        active: true,
      },
    });

    if (!activeAddress) {
      return handleClientError(res, 404, "Active address not found");
    }

    const distance = countDistance(latStart, longStart, activeAddress.lat, activeAddress.long);
    const roundedDistance = Math.round(parseFloat(distance));
    const deliveryCost = roundedDistance * price;
    const total = await Baskets.sum("price", {
      where: {
        user_id: authData.id,
      },
    });
    const data = {
      distance,
      deliveryCost,
      total,
    };
    return handleResponseSuccess(res, 200, "Distance Calculated", data);
  } catch (error) {
    return handleServerError(res);
  }
};
