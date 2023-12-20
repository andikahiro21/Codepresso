/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const { handleServerError, handleClientError } = require("../helpers/handleError");
const handleResponseSuccess = require("../helpers/responseSuccess");
const path = require("path");
const loadData = require("../helpers/databaseHelper");
const { validateBodyAddons } = require("../helpers/validationJoi");
const { Menus, Sugars, Sizes, Milk, Beans } = require("../models");
const { getModelInstance } = require("../helpers/modelInstanceMenu");

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
    const { menu_id } = req.body;
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

    const categories = ["Sizes", "Beans", "Milk", "Sugars"];

    await Promise.all(
      categories.map(async (category) => {
        if (req.body[category.toLowerCase()] === "true" && response[category]) {
          await Promise.all(
            response[category].map(async (categoryData) => {
              const model = getModelInstance(category);
              // eslint-disable-next-line no-unused-vars
              const [addOn, created] = await model.findOrCreate({
                where: {
                  menu_id,
                  name: categoryData.name,
                },
                defaults: {
                  menu_id,
                  name: categoryData.name,
                  price: categoryData.price,
                },
              });
            })
          );
        }
      })
    );
  } catch (error) {
    return handleServerError(res);
  }
};
