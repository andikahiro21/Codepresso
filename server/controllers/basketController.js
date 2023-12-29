/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const { handleServerError, handleClientError } = require("../helpers/handleError");
const { calculateTotalPrice } = require("../helpers/operation");
const handleResponseSuccess = require("../helpers/responseSuccess");
const { validateBodyBasket } = require("../helpers/validationJoi");
const { Menus, Baskets, Sizes, Milk, Beans, Sugars } = require("../models");
const Redis = require("ioredis");
const redisClient = new Redis();

exports.getBasket = async (req, res) => {
  try {
    let basket = await redisClient.get("basket");
    const authData = req.user;

    if (!basket) {
      const response = await Baskets.findAll({
        where: { user_id: authData.id },
        include: [{ model: Sugars }, { model: Sizes }, { model: Beans }, { model: Milk }, { model: Menus, as: "menu_basket" }],
      });
      await redisClient.set("basket", JSON.stringify(response));
      basket = response;
    } else {
      basket = JSON.parse(basket);
    }

    return handleResponseSuccess(res, 200, "success", basket);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.createBasket = async (req, res) => {
  try {
    const newData = req.body;
    const authData = req.user;

    const validate = validateBodyBasket(newData);
    if (validate) {
      return handleClientError(res, 400, validate);
    }

    const existingMenu = await Menus.findByPk(newData.menu_id);
    if (!existingMenu) {
      return handleClientError(res, 400, `Menu with ID ${newData.menu_id} not found`);
    }

    const [totalSugarPrice, totalSizePrice, totalBeanPrice, totalMilkPrice] = await Promise.all([
      calculateTotalPrice(newData, "sugar_id", Sugars),
      calculateTotalPrice(newData, "size_id", Sizes),
      calculateTotalPrice(newData, "bean_id", Beans),
      calculateTotalPrice(newData, "milk_id", Milk),
    ]);

    const totalMenuPrice = existingMenu.price * newData.qty;

    const totalPrice = totalSugarPrice + totalSizePrice + totalBeanPrice + totalMilkPrice + totalMenuPrice;

    const newBasket = await Baskets.create({
      menu_id: newData.menu_id,
      user_id: authData.id,
      sugar_id: newData.sugar_id !== "" ? newData.sugar_id : null,
      size_id: newData.size_id !== "" ? newData.size_id : null,
      bean_id: newData.bean_id !== "" ? newData.bean_id : null,
      milk_id: newData.milk_id !== "" ? newData.milk_id : null,
      qty: newData.qty,
      price: totalPrice,
    });

    await redisClient.del("basket");

    return handleResponseSuccess(res, 201, "Basket Created", newBasket);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.updateBasket = async (req, res) => {
  try {
    const basketId = req.params.id;
    const { qty } = req.body;
    const authData = req.user;

    const existingBasket = await Baskets.findByPk(basketId, { include: [{ model: Menus, as: "menu_basket" }] });
    if (!existingBasket) {
      return handleClientError(res, 404, `Basket with ID ${basketId} not found`);
    }

    if (existingBasket.user_id !== authData.id) {
      return handleClientError(res, 403, "Unauthorized. You can only update your own baskets.");
    }

    if (qty === undefined || qty <= 0) {
      return handleClientError(res, 400, "Invalid quantity value");
    }

    existingBasket.qty = qty;

    const totalMenuPrice = existingBasket.menu_basket.price * qty;

    existingBasket.price = totalMenuPrice;

    await existingBasket.save();

    await redisClient.del("basket");

    return handleResponseSuccess(res, 200, "Basket Updated", existingBasket);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.deleteBasket = async (req, res) => {
  try {
    const basketId = req.params.id;
    const authData = req.user;

    const existingBasket = await Baskets.findByPk(basketId);
    if (!existingBasket) {
      return handleClientError(res, 404, `Basket with ID ${basketId} not found`);
    }

    if (existingBasket.user_id !== authData.id) {
      return handleClientError(res, 403, "Unauthorized. You can only delete your own baskets.");
    }

    await Baskets.destroy({
      where: { id: basketId },
    });

    await redisClient.del("basket");

    return handleResponseSuccess(res, 200, "Basket Deleted", existingBasket);
  } catch (error) {
    return handleServerError(res);
  }
};
