/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const { Op } = require("sequelize");
const { handleServerError, handleClientError } = require("../helpers/handleError");
const handleResponseSuccess = require("../helpers/responseSuccess");
const { Users, PurchaseGroups, Menus, Purchases, Sugars, Sizes, Beans, Milk } = require("../models");
const sequelize = require("sequelize");

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
          model: Purchases,
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

    if (!(selectedPurchase.user_id === authID || selectedPurchase.driver_id === authID)) {
      return handleClientError(res, 403, "You are not authorized to view this purchase group");
    }

    return handleResponseSuccess(res, 200, selectedPurchase);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getPurchaseGroups = async (req, res) => {
  try {
    const authID = req.user.id;

    const page = req.query.page || 1;
    const limitPerPage = 10;
    const offset = (page - 1) * limitPerPage;

    const totalPurchaseGroups = await PurchaseGroups.count({
      where: {
        user_id: authID,
        status: {
          [Op.ne]: "Pending Payment",
        },
      },
    });

    const selectedPurchase = await PurchaseGroups.findAll({
      where: {
        user_id: authID,
        status: {
          [Op.ne]: "Pending Payment",
        },
      },
      include: [
        {
          model: Users,
          as: "user_driver",
          attributes: ["full_name"],
        },
        {
          model: Purchases,
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
      limit: limitPerPage,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    const totalPage = Math.ceil(totalPurchaseGroups / limitPerPage);

    const data = {
      totalPage,
      page,
      selectedPurchase,
    };

    return handleResponseSuccess(res, 200, "success", data);
  } catch (error) {
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

exports.getPurchaseGroupsAdmin = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limitPerPage = 10;
    const offset = (page - 1) * limitPerPage;

    const totalPurchaseGroups = await PurchaseGroups.count({
      where: {
        status: {
          [Op.ne]: "Pending Payment",
        },
      },
    });

    const allPurchaseGroups = await PurchaseGroups.findAll({
      where: {
        status: {
          [Op.ne]: "Pending Payment",
        },
      },
      include: [
        {
          model: Users,
          as: "user_driver",
          attributes: ["full_name"],
        },
        {
          model: Purchases,
          as: "purchaseGroup_purchase",
          include: [
            {
              model: Menus,
              as: "menu_purchase",
            },
            { model: Sugars },
            { model: Sizes },
            { model: Beans },
            { model: Milk },
          ],
        },
        {
          model: Users,
          as: "user_receiver",
          attributes: ["full_name"],
        },
      ],
      order: [[sequelize.literal(`FIELD(status, 'Order Receive', 'On-Delivery', 'Order Finished')`)], ["createdAt", "ASC"]],
      limit: limitPerPage,
      offset,
    });

    const totalPage = Math.ceil(totalPurchaseGroups / limitPerPage);

    const data = {
      totalPage,
      page,
      selectedPurchase: allPurchaseGroups,
    };

    return handleResponseSuccess(res, 200, "success", data);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getActivePurchaseGroups = async (req, res) => {
  try {
    const authID = req.user.id;

    const selectedPurchase = await PurchaseGroups.findOne({
      where: { driver_id: authID, status: "On-Delivery" },
      include: [
        {
          model: Users,
          as: "user_driver",
          attributes: ["full_name"],
        },
        {
          model: Users,
          as: "user_receiver",
          attributes: ["full_name"],
        },
      ],
    });

    return handleResponseSuccess(res, 200, "success", selectedPurchase);
  } catch (error) {
    return handleServerError(res);
  }
};
