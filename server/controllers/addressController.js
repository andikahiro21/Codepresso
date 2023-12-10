/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const { handleServerError, handleClientError } = require("../helpers/handleError");
const handleResponseSuccess = require("../helpers/responseSuccess");
const { validateBodyAddress } = require("../helpers/validationJoi");
const { Address } = require("../models");
const Redis = require("ioredis");
const redisClient = new Redis();

exports.getAddress = async (req, res) => {
  try {
    const authData = req.user;

    let address = await redisClient.get("address");

    if (!address) {
      const response = await Address.findAll({ where: { user_id: authData.id } });
      await redisClient.set("address", JSON.stringify(response));
      address = response;
    } else {
      address = JSON.parse(address);
    }

    return handleResponseSuccess(res, 200, "success", address);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getAddressId = async (req, res) => {
  try {
    const { id } = req.params;
    const authData = req.user;

    let address = await redisClient.get("address");

    if (!address) {
      const response = await Address.findAll({ where: { user_id: authData.id } });

      await redisClient.set("address", JSON.stringify(response));
    } else {
      address = JSON.parse(address);
    }

    const selectedAddress = address.find((address) => address.id === parseInt(id));

    if (!selectedAddress) {
      return handleClientError(res, 404, `Menu Not Found...`);
    }

    handleResponseSuccess(res, 200, "success", selectedAddress);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.createAddress = async (req, res) => {
  try {
    const newData = req.body;
    const validate = validateBodyAddress(newData);

    if (validate) {
      return handleClientError(res, 400, validate);
    }

    const authData = req.user;
    newData.user_id = authData.id;

    const newAddress = await Address.create(newData);

    await redisClient.del("address");

    return handleResponseSuccess(res, 201, "Address Created", newAddress);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.editAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const validate = validateBodyAddress(newData);

    if (validate) {
      return handleClientError(res, 400, validate);
    }

    const authData = req.user;

    const selectedAddress = await Address.findByPk(id);

    if (!selectedAddress) {
      return handleClientError(res, 404, "Address Not Found");
    }

    if (selectedAddress.user_id !== authData.id) {
      return handleClientError(res, 403, "Unauthorized: You are not the owner of this address");
    }

    await Address.update(newData, { where: { id } });
    await redisClient.del("address");

    return handleResponseSuccess(res, 200, "Address Edited");
  } catch (error) {
    return handleServerError(res);
  }
};

exports.setAddressActive = async (req, res) => {
  try {
    const { id } = req.params;
    const authData = req.user;

    const userAddresses = await Address.findAll({
      where: { user_id: authData.id },
    });

    if (!userAddresses) {
      return handleClientError(res, 404, "You have not addresses");
    }

    await Address.update({ active: false }, { where: { user_id: authData.id } });

    const selectedAddress = await Address.findByPk(id);

    if (!selectedAddress) {
      return handleClientError(res, 404, "Address Not Found");
    }

    if (selectedAddress.user_id !== authData.id) {
      return handleClientError(res, 403, "Unauthorized: You are not the owner of this address");
    }

    await Address.update({ active: true }, { where: { id } });

    await redisClient.del("address");

    return handleResponseSuccess(res, 200, "Address Active");
  } catch (error) {
    return handleServerError(res);
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const authData = req.user;

    const selectedAddress = await Address.findByPk(id);

    if (!selectedAddress) {
      return handleClientError(res, 404, "Address Not Found");
    }

    if (selectedAddress.user_id !== authData.id) {
      return handleClientError(res, 403, "Unauthorized: You are not the owner of this address");
    }

    await Address.destroy({ where: { id } });
    await redisClient.del("address");

    return handleResponseSuccess(res, 200, "Address Deleted");
  } catch (error) {
    return handleServerError(res);
  }
};
