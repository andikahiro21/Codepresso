/* eslint-disable space-before-function-paren */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MapRoutes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MapRoutes.belongsTo(models.PurchaseGroups, {
        as: "purchaseGroup_routes",
        foreignKey: {
          name: "purchase_group_id",
        },
      });
    }
  }
  MapRoutes.init(
    {
      purchase_group_id: DataTypes.INTEGER,
      routes: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "MapRoutes",
      tableName: "map_routes",
    }
  );
  return MapRoutes;
};
