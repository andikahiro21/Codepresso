/* eslint-disable space-before-function-paren */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PurchaseGroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PurchaseGroups.hasMany(models.Purchases, {
        as: "purchaseGroup_purchase",
        foreignKey: {
          name: "purchase_group_id",
        },
      });
      PurchaseGroups.hasMany(models.MapRoutes, {
        as: "purchaseGroup_routes",
        foreignKey: {
          name: "purchase_group_id",
        },
      });
      PurchaseGroups.belongsTo(models.Users, {
        as: "user_receiver",
        foreignKey: {
          name: "user_id",
        },
      });
      PurchaseGroups.belongsTo(models.Users, {
        as: "user_driver",
        foreignKey: {
          name: "driver_id",
        },
      });
      PurchaseGroups.belongsTo(models.Payments, {
        as: "payment_purchaseGroup",
        foreignKey: {
          name: "payment_id",
        },
      });
    }
  }
  PurchaseGroups.init(
    {
      user_id: DataTypes.INTEGER,
      payment_id: DataTypes.INTEGER,
      driver_id: DataTypes.INTEGER,
      note: DataTypes.STRING,
      status: DataTypes.STRING,
      date: DataTypes.DATE,
      lat_start: {
        type: DataTypes.DECIMAL(10, 8),
      },
      long_start: {
        type: DataTypes.DECIMAL(11, 8),
      },
      lat_end: {
        type: DataTypes.DECIMAL(10, 8),
      },
      long_end: {
        type: DataTypes.DECIMAL(11, 8),
      },
      delivery_cost: DataTypes.INTEGER,
      distance: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "PurchaseGroups",
      tableName: "purchase_groups",
    }
  );
  return PurchaseGroups;
};
