/* eslint-disable space-before-function-paren */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Purchases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Purchases.belongsTo(models.Menus, {
        as: "menu_purchase",
        foreignKey: {
          name: "menu_id",
        },
      });
      Purchases.belongsTo(models.Users, {
        as: "user_purchase",
        foreignKey: {
          name: "user_id",
        },
      });
      Purchases.belongsTo(models.PurchaseGroups, {
        as: "purchaseGroup_purchase",
        foreignKey: {
          name: "purchase_group_id",
        },
      });
      Purchases.belongsTo(models.Sugars, {
        foreignKey: {
          name: "sugar_id",
        },
      });
      Purchases.belongsTo(models.Sizes, {
        foreignKey: {
          name: "size_id",
        },
      });
      Purchases.belongsTo(models.Beans, {
        foreignKey: {
          name: "bean_id",
        },
      });
      Purchases.belongsTo(models.Milk, {
        foreignKey: {
          name: "milk_id",
        },
      });
    }
  }
  Purchases.init(
    {
      menu_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      purchase_group_id: DataTypes.INTEGER,
      milk_id: DataTypes.INTEGER,
      sugar_id: DataTypes.INTEGER,
      size_id: DataTypes.INTEGER,
      bean_id: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Purchases",
      tableName: "purchases",
    }
  );
  return Purchases;
};
