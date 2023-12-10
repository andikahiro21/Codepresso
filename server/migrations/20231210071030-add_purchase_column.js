"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.addColumn("purchases", "milk_id", {
        type: Sequelize.INTEGER,
        after: "purchase_group_id",
      }),
      queryInterface.addColumn("purchases", "bean_id", {
        type: Sequelize.INTEGER,
        after: "milk_id",
      }),
      queryInterface.addColumn("purchases", "size_id", {
        type: Sequelize.INTEGER,
        after: "bean_id",
      }),
      queryInterface.addColumn("purchases", "sugar_id", {
        type: Sequelize.INTEGER,
        after: "size_id",
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([queryInterface.removeColumn("purchases", "milk_id"), queryInterface.removeColumn("purchases", "bean_id"), queryInterface.removeColumn("purchases", "size_id"), queryInterface.removeColumn("purchases", "sugar_id")]);
  },
};
