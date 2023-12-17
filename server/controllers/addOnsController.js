/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const { handleServerError, handleClientError } = require("../helpers/handleError");
const handleResponseSuccess = require("../helpers/responseSuccess");
const path = require("path");
const { validateBodyAddons } = require("../helpers/validationJoi");
const { Menus, Sugars, Sizes, Milk, Beans } = require("../models");
const loadData = require("../helpers/databaseHelper");

exports.getAddOnsSelectedMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Menus.findByPk(id, {
      include: [
        { model: Sugars, as: "sugar_level", attributes: ["id", "name", "price"] },
        { model: Sizes, as: "size", attributes: ["id", "name", "price"] },
        { model: Milk, as: "milk", attributes: ["id", "name", "price"] },
        { model: Beans, as: "bean", attributes: ["id", "name", "price"] },
      ],
    });

    return handleResponseSuccess(res, 200, "success", response);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.createAddOnsForMenu = async (req, res) => {
  try {
    const { menu_id, sizes, beans, milk, sugars } = req.body;
    const database = path.join(__dirname, "../database/addOns.json");
    const response = loadData(database);

    const validate = validateBodyAddons(req.body);
    if (validate) {
      return handleClientError(res, 400, validate);
    }
    const existingMenu = await Menus.findByPk(menu_id);
    if (!existingMenu) {
      return handleClientError(res, 404, `Menu with ID ${menu_id} not found`);
    }

    if (sizes) {
      await Promise.all(
        sizes.map(async (sizeData) => {
          return Sizes.create({
            menu_id,
            name: sizeData.name,
            price: sizeData.price,
          });
        })
      );
    }

    if (beans) {
      await Promise.all(
        beans.map(async (beanData) => {
          return Beans.create({
            menu_id,
            name: beanData.name,
            price: beanData.price,
          });
        })
      );
    }

    if (milk) {
      await Promise.all(
        milk.map(async (milkData) => {
          return Milk.create({
            menu_id,
            name: milkData.name,
            price: milkData.price,
          });
        })
      );
    }

    if (sugars) {
      await Promise.all(
        sugars.map(async (sugarData) => {
          return Sugars.create({
            menu_id,
            name: sugarData.name,
            price: sugarData.price,
          });
        })
      );
    }

    handleResponseSuccess(res, 201, "Add-ons Created");
  } catch (error) {
    return handleServerError(res);
  }
};
