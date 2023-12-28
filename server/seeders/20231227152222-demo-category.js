"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("categories_menu", [
      {
        name: "Coffee",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Signature Coffee",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("categories_menu", null, {});
  },
};
