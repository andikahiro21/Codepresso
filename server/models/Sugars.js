/* eslint-disable space-before-function-paren */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sugars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sugars.belongsTo(models.Menus, {
        foreignKey: "menu_id",
        as: "sugar_level",
      });
      Sugars.hasMany(models.Baskets, {
        foreignKey: "sugar_id",
      });
    }
  }
  Sugars.init(
    {
      menu_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Sugars",
      tableName: "sugars",
    }
  );
  return Sugars;
};
