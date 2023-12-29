"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("address", "active", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      after: "long",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("address", "active");
  },
};
