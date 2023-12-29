/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const { handleServerError, handleClientError } = require("../helpers/handleError");
const handleResponseSuccess = require("../helpers/responseSuccess");
const { validateBodyCategory } = require("../helpers/validationJoi");
const { CategoriesMenu, Menus, Purchases } = require("../models");
const Redis = require("ioredis");
const redisClient = new Redis();

exports.getCategory = async (req, res) => {
  try {
    let categories = await redisClient.get("categories");

    if (!categories) {
      const response = await CategoriesMenu.findAll();
      await redisClient.set("categories", JSON.stringify(response));
      categories = response;
    } else {
      categories = JSON.parse(categories);
    }

    return handleResponseSuccess(res, 200, "success", categories);
  } catch (error) {
    return handleServerError(res);
  }
};
exports.getCategoryMenu = async (req, res) => {
  try {
    let categoryMenus = await redisClient.get("categoryMenus");

    if (!categoryMenus) {
      const response = await CategoriesMenu.findAll({
        include: [{ model: Menus, as: "category_menu" }],
      });
      await redisClient.set("categoryMenus", JSON.stringify(response));
      categoryMenus = response;
    } else {
      categoryMenus = JSON.parse(categoryMenus);
    }

    return handleResponseSuccess(res, 200, "success", categoryMenus);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.createCategory = async (req, res) => {
  try {
    const newData = req.body;

    const validate = validateBodyCategory(newData);

    if (validate) {
      return handleClientError(res, 400, validate);
    }

    const existingCategory = await CategoriesMenu.findOne({ where: { name: newData.name } });
    if (existingCategory) {
      return handleClientError(res, 400, `Category with name ${newData.name} already exist...`);
    }

    const newCategory = await CategoriesMenu.create(newData);

    await redisClient.del("categories");
    await redisClient.del("categoryMenus");

    return handleResponseSuccess(res, 201, "Category Created", newCategory);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const validate = validateBodyCategory(newData);

    if (validate) {
      return handleClientError(res, 400, validate);
    }

    const selectedCategory = await CategoriesMenu.findOne({ where: { id } });
    if (!selectedCategory) {
      return handleClientError(res, 404, `Category Not Found`);
    }
    await CategoriesMenu.update(newData, { where: { id } });

    await redisClient.del("categories");
    await redisClient.del("categoryMenus");

    return handleResponseSuccess(res, 200, "Category Edited");
  } catch (error) {
    return handleServerError(res);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const selectedCategory = await CategoriesMenu.findOne({ where: { id } });

    if (!selectedCategory) {
      return handleClientError(res, 404, `Category Not Found`);
    }

    const menus = await Menus.findAll({ where: { category_id: id } });

    for (const menu of menus) {
      const purchase = await Purchases.findAll({ where: { menu_id: menu.id } });
      if (purchase) {
        return handleClientError(res, 400, `Unable to delete the category due to its association with existing pruchase data.`);
      }
    }

    for (const menu of menus) {
      await Menus.destroy({ where: { id: menu.id } });
    }

    await CategoriesMenu.destroy({ where: { id } });

    await redisClient.del("categories");
    await redisClient.del("categoryMenus");

    return handleResponseSuccess(res, 200, "Category Deleted", selectedCategory);
  } catch (error) {
    return handleServerError(res);
  }
};
