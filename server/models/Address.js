/* eslint-disable space-before-function-paren */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.Users, {
        as: "user_address",
        foreignKey: {
          name: "user_id",
        },
      });
    }
  }
  Address.init(
    {
      user_id: DataTypes.INTEGER,
      address_name: DataTypes.STRING,
      lat: {
        type: DataTypes.DECIMAL(10, 8),
      },
      long: {
        type: DataTypes.DECIMAL(11, 8),
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Address",
      tableName: "address",
    }
  );
  return Address;
};
