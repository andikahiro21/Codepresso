"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("address", [
      {
        user_id: 2,
        address_name: "Jalan Cipinang Raya",
        lat: -6.328637,
        long: 106.83254545,
        active: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("address", null, {})
  },
}
