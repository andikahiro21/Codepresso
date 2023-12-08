/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const { handleServerError, handleClientError } = require("../helpers/handleError");
const { calculateTotalPrice } = require("../helpers/operation");
const handleResponseSuccess = require("../helpers/responseSuccess");
const { validateBodyBasket } = require("../helpers/validationJoi");
const { CategoriesMenu, Menus, Purchases, Baskets, Sizes, Milk, Beans, Sugars } = require("../models");
const Redis = require("ioredis");
const redisClient = new Redis();

exports.getBasket = async (req, res) => {
  try {
    let basket = await redisClient.get("basket");
    const authData = req.user;

    if (!basket) {
      const response = await Baskets.findAll({ where: { user_id: authData.id } });
      await redisClient.set("basket", JSON.stringify(response));
      basket = response;
    } else {
      basket = JSON.parse(basket);
    }

    return handleResponseSuccess(res, 200, "success", basket);
  } catch (error) {
    console.log(error);
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
      ...newData,
      user_id: authData.id,
      price: totalPrice,
    });

    await redisClient.del("basket");

    return handleResponseSuccess(res, 201, "Basket Created", newBasket);
  } catch (errors) {
    return handleServerError(res);
  }
};

exports.updateBasket = async (req, res) => {
  try {
    const basketId = req.params.id;
    const updatedData = req.body;
    const authData = req.user;

    const existingBasket = await Baskets.findByPk(basketId, { include: [{ model: Menus, as: "menu_basket" }] });
    if (!existingBasket) {
      return handleClientError(res, 404, `Basket with ID ${basketId} not found`);
    }

    updatedData.menu_id = existingBasket.menu_id;
    const validate = validateBodyBasket(updatedData);
    if (validate) {
      return handleClientError(res, 400, validate);
    }

    if (existingBasket.user_id !== authData.id) {
      return handleClientError(res, 403, "Unauthorized. You can only update your own baskets.");
    }

    existingBasket.sugar_id = updatedData.sugar_id || existingBasket.sugar_id;
    existingBasket.qty = updatedData.qty || existingBasket.qty;
    existingBasket.bean_id = updatedData.bean_id || existingBasket.bean_id;
    existingBasket.milk_id = updatedData.milk_id || existingBasket.milk_id;
    existingBasket.size_id = updatedData.size_id || existingBasket.size_id;

    const [totalSugarPrice, totalSizePrice, totalBeanPrice, totalMilkPrice] = await Promise.all([
      calculateTotalPrice(existingBasket, "sugar_id", Sugars),
      calculateTotalPrice(existingBasket, "size_id", Sizes),
      calculateTotalPrice(existingBasket, "bean_id", Beans),
      calculateTotalPrice(existingBasket, "milk_id", Milk),
    ]);

    const totalMenuPrice = existingBasket.menu_basket.price * existingBasket.qty;

    existingBasket.price = totalSugarPrice + totalSizePrice + totalBeanPrice + totalMilkPrice + totalMenuPrice;

    await existingBasket.save();

    await redisClient.del("basket");

    return handleResponseSuccess(res, 200, "Basket Updated", existingBasket);
  } catch (error) {
    return handleServerError(res);
  }
};
