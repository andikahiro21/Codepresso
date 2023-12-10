/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const { countDistance } = require("../helpers/countDistance");
const { handleServerError, handleClientError } = require("../helpers/handleError");
const handleResponseSuccess = require("../helpers/responseSuccess");
const { Address } = require("../models");

exports.getDistance = async (req, res) => {
  try {
    const { latStart, longStart } = req.body;
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

    return handleResponseSuccess(res, 200, "Distance Calculated", distance);
  } catch (error) {
    return handleServerError(res);
  }
};
