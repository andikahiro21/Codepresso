/* eslint-disable space-before-function-paren */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payments.belongsTo(models.Users, {
        as: "user_payment",
        foreignKey: {
          name: "user_id",
        },
      });
      Payments.hasMany(models.PurchaseGroups, {
        as: "payment_purchaseGroup",
        foreignKey: {
          name: "payment_id",
        },
      });
    }
  }
  Payments.init(
    {
      user_id: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      method: DataTypes.STRING,
      status: DataTypes.STRING,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Payments",
      tableName: "payments",
    }
  );
  return Payments;
};
