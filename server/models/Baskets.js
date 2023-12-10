/* eslint-disable space-before-function-paren */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Baskets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Baskets.belongsTo(models.Users, {
        as: "user_basket",
        foreignKey: {
          name: "user_id",
        },
      });
      Baskets.belongsTo(models.Menus, {
        as: "menu_basket",
        foreignKey: {
          name: "menu_id",
        },
      });
      Baskets.belongsTo(models.Sugars, {
        foreignKey: {
          name: "sugar_id",
        },
      });
      Baskets.belongsTo(models.Sizes, {
        foreignKey: {
          name: "size_id",
        },
      });
      Baskets.belongsTo(models.Beans, {
        foreignKey: {
          name: "bean_id",
        },
      });
      Baskets.belongsTo(models.Milk, {
        foreignKey: {
          name: "milk_id",
        },
      });
    }
  }
  Baskets.init(
    {
      menu_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      milk_id: DataTypes.INTEGER,
      sugar_id: DataTypes.INTEGER,
      size_id: DataTypes.INTEGER,
      bean_id: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Baskets",
      tableName: "baskets",
    }
  );
  return Baskets;
};
