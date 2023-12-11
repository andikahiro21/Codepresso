/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const { handleServerError, handleClientError } = require("../helpers/handleError");
const { validateBodyPurchase } = require("../helpers/validationJoi");
const { Payments, PurchaseGroups, Purchases, Baskets, Address, Menus } = require("../models");
const jwt = require("jsonwebtoken");
const Redis = require("ioredis");
const { getOpenRouteServiceRoute } = require("../config/openRoutes");
const handleResponseSuccess = require("../helpers/responseSuccess");
const redisClient = new Redis();

exports.createPayment = async (req, res) => {
  try {
    const snap = req.snap;
    const authData = req.user;
    const newData = req.body;

    const validate = validateBodyPurchase(newData);
    if (validate) {
      return handleClientError(res, 400, validate);
    }

    const activeAddress = await Address.findOne({
      attributes: ["lat", "long"],
      where: {
        user_id: authData.id,
        active: true,
      },
    });

    if (!activeAddress) {
      return res.status(400).json({ error: "Active address not found for the user." });
    }

    const total = await Baskets.sum("price", {
      where: {
        user_id: authData.id,
      },
    });

    const basketItems = await Baskets.findAll({
      where: {
        user_id: authData.id,
      },
      include: [
        {
          model: Menus,
          as: "menu_basket",
          attributes: ["name"],
        },
      ],
    });

    if (basketItems.length === 0) {
      return res.status(400).json({ error: "The basket is empty. Add items to proceed with the payment." });
    }

    const dateNow = new Date();

    const deliveryCost = parseInt(newData.distance) * 2000;

    const newPayment = await Payments.create({
      user_id: authData.id,
      total: total + deliveryCost,
      method: "Pending",
      status: "Pending",
      date: dateNow,
    });

    const newPurchaseGroup = await PurchaseGroups.create({
      user_id: authData.id,
      payment_id: newPayment.id,
      driver_id: null,
      note: newData.note,
      status: "Pending Payment",
      date: dateNow,
      lat_start: newData.lat_start,
      long_start: newData.long_start,
      lat_end: activeAddress.lat,
      long_end: activeAddress.long,
      delivery_cost: deliveryCost,
      distance: newData.distance,
    });

    for (const basketItem of basketItems) {
      await Purchases.create({
        menu_id: basketItem.menu_id,
        user_id: authData.id,
        purchase_group_id: newPurchaseGroup.id,
        milk_id: basketItem.milk_id,
        bean_id: basketItem.bean_id,
        size_id: basketItem.size_id,
        sugar_id: basketItem.sugar_id,
        qty: basketItem.qty,
        price: basketItem.price,
      });
    }

    await Baskets.destroy({
      where: {
        user_id: authData.id,
      },
    });

    const payload = {
      total: total + deliveryCost,
      purchaseGroupData: newPurchaseGroup,
    };

    const dataToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    const customerDetails = {
      first_name: authData.full_name,
      email: authData.email,
      phone: authData.phoneNumber,
    };

    const midtransTransaction = {
      transaction_details: {
        order_id: "order-" + new Date().getTime(),
        gross_amount: total + deliveryCost,
      },
      customer_details: customerDetails,
      payload_token: dataToken,
    };
    const transactionResult = await snap.createTransaction(midtransTransaction);
    const paymentUrl = transactionResult.redirect_url;
    await redisClient.del("basket");

    res.status(201).json({
      message: "Request for Payment.",
      paymentUrl,
      token: dataToken,
    });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.notificationMidtrans = async (req, res) => {
  try {
    const payloadToken = req.headers.token;

    if (!payloadToken) {
      return handleClientError(res, 400, "Payment Need Token");
    }

    const decoded = jwt.verify(payloadToken, process.env.JWT_SECRET);
    const dateNow = new Date();

    const notification = {
      purchaseGroupID: decoded.purchaseGroupData.id,
      order_id: decoded.purchaseGroupData.payment_id,
      transaction_status: "settlement",
      gross_amount: decoded.total,
      payment_type: "bank_transfer",
      transaction_time: dateNow,
    };

    if (notification.transaction_status === "settlement") {
      const purchaseGroupId = notification.purchaseGroupID;
      const purchaseGroup = await PurchaseGroups.findByPk(purchaseGroupId);
      await Payments.update({ status: "Success", date: notification.transaction_time, method: notification.payment_type }, { where: { id: notification.order_id } });
      await PurchaseGroups.update({ status: "Order Receive" }, { where: { id: notification.purchaseGroupID } });
      if (purchaseGroup) {
        await getOpenRouteServiceRoute(purchaseGroup.lat_start, purchaseGroup.long_start, purchaseGroup.lat_end, purchaseGroup.long_end, purchaseGroupId);

        handleResponseSuccess(res, 201, "Payment Success");
      } else {
        return handleClientError(res, 400, "Purchase Group not found");
      }
    } else {
      return handleClientError(res, 400, "Payment Unsuccessfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
