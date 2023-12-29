"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.addColumn("purchase_groups", "delivery_cost", {
        type: Sequelize.INTEGER,
        after: "long_end",
      }),
      queryInterface.addColumn("purchase_groups", "distance", {
        type: Sequelize.FLOAT,
        after: "delivery_cost",
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([queryInterface.removeColumn("purchase_groups", "delivery_cost"), queryInterface.removeColumn("purchase_groups", "distance")]);
  },
};
