/* eslint-disable space-before-function-paren */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CategoriesMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CategoriesMenu.hasMany(models.Menus, {
        as: "category_menu",
        foreignKey: {
          name: "category_id",
        },
      });
    }
  }
  CategoriesMenu.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CategoriesMenu",
      tableName: "categories_menu",
    }
  );
  return CategoriesMenu;
};
