/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const { handleServerError, handleClientError } = require("../helpers/handleError");
const handleResponseSuccess = require("../helpers/responseSuccess");
const { Users, PurchaseGroups, Menus, Purchases } = require("../models");

exports.setDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    const { driverID } = req.body;

    if (!driverID) {
      return handleClientError(res, 404, "Driver ID invalid");
    }

    const selectedPurchase = await PurchaseGroups.findOne({ where: { id } });
    if (!selectedPurchase) {
      return handleClientError(res, 404, "Purchase Not Found");
    }

    const selectedDriver = await Users.findOne({
      where: { id: driverID, role: 3 },
      attributes: { exclude: ["password"] },
    });

    if (!selectedDriver) {
      return handleClientError(res, 400, "Invalid driver ID");
    }

    const existingDelivery = await PurchaseGroups.findOne({
      where: { driver_id: driverID, status: "On-Delivery" },
    });

    if (existingDelivery) {
      return handleClientError(res, 400, "Driver is already assigned to a purchase group with status On-Delivery");
    }

    if (selectedPurchase.status !== "Order Receive") {
      return handleClientError(res, 400, "Finish Payment to deliver");
    }

    await selectedPurchase.update({ driver_id: driverID, status: "On-Delivery" });

    return handleResponseSuccess(res, 200, {
      message: `Purchase group set to On-Delivery.`,
      driver: selectedDriver.toJSON(),
    });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getSelectedPurchaseGroups = async (req, res) => {
  try {
    const { id } = req.params;
    const authID = req.user.id;

    const selectedPurchase = await PurchaseGroups.findOne({
      where: { id },
      include: [
        {
          model: Users,
          as: "user_driver",
          attributes: ["full_name"],
        },
        {
          model: Purchases, // Assuming there is an association between PurchaseGroups and Purchase
          as: "purchaseGroup_purchase",
          include: [
            {
              model: Menus,
              as: "menu_purchase",
            },
          ],
        },
        {
          model: Users,
          as: "user_receiver",
          attributes: ["full_name"],
        },
      ],
    });

    if (!selectedPurchase) {
      return handleClientError(res, 404, "Purchase Not Found");
    }

    if (selectedPurchase.user_id !== authID) {
      return handleClientError(res, 403, "You are not authorized to view this purchase group");
    }

    return handleResponseSuccess(res, 200, selectedPurchase);
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};
exports.setOrderFinish = async (req, res) => {
  try {
    const { id } = req.params;
    const authID = req.user.id;

    const selectedPurchase = await PurchaseGroups.findOne({ where: { id } });
    if (!selectedPurchase) {
      return handleClientError(res, 404, "Purchase Not Found");
    }

    if (selectedPurchase.status !== "On-Delivery") {
      return handleClientError(res, 400, "Cannot finish order. Delivery not in progress.");
    }

    if (authID !== selectedPurchase.driver_id) {
      return handleClientError(res, 403, "You are not authorized to finish this order");
    }

    await selectedPurchase.update({ status: "Order Finished", date: new Date() });

    return handleResponseSuccess(res, 200, {
      message: `Order finished successfully.`,
    });
  } catch (error) {
    return handleServerError(res);
  }
};
