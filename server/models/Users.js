/* eslint-disable space-before-function-paren */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Address, {
        as: "user_address",
        foreignKey: {
          name: "user_id",
        },
      });
      Users.hasMany(models.Baskets, {
        as: "user_basket",
        foreignKey: {
          name: "user_id",
        },
      });
      Users.hasMany(models.Payments, {
        as: "user_payment",
        foreignKey: {
          name: "user_id",
        },
      });
      Users.hasMany(models.PurchaseGroups, {
        as: "user_receiver",
        foreignKey: {
          name: "user_id",
        },
      });
      Users.hasMany(models.PurchaseGroups, {
        as: "user_driver",
        foreignKey: {
          name: "driver_id",
        },
      });
      Users.hasMany(models.Purchases, {
        as: "user_purchase",
        foreignKey: {
          name: "user_id",
        },
      });
    }
  }
  Users.init(
    {
      full_name: DataTypes.STRING,
      role: DataTypes.INTEGER,
      phone_number: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "users",
    }
  );
  return Users;
};
