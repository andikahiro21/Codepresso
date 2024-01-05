/* eslint-disable space-before-function-paren */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Menus.belongsTo(models.CategoriesMenu, {
        as: "category_menu",
        foreignKey: {
          name: "category_id",
        },
      });
      Menus.hasMany(models.Purchases, {
        as: "menu_purchase",
        foreignKey: {
          name: "menu_id",
        },
      });
      Menus.hasMany(models.Baskets, {
        as: "menu_basket",
        foreignKey: {
          name: "menu_id",
        },
      });
      Menus.hasMany(models.Sugars, {
        as: "sugar_level",
        foreignKey: {
          name: "menu_id",
        },
      });
      Menus.hasMany(models.Sizes, {
        as: "size",
        foreignKey: "menu_id",
      });

      Menus.hasMany(models.Milk, {
        as: "milk",
        foreignKey: "menu_id",
      });

      Menus.hasMany(models.Beans, {
        as: "bean",
        foreignKey: "menu_id",
      });
    }
  }
  Menus.init(
    {
      name: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      type: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Menus",
      tableName: "menus",
    }
  );
  return Menus;
};
