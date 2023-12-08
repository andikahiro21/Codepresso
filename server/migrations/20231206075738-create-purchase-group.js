"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("purchase_groups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      payment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "payments",
          key: "id",
        },
      },
      driver_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      note: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      lat_start: {
        type: Sequelize.DECIMAL(10, 8),
      },
      long_start: {
        type: Sequelize.DECIMAL(11, 8),
      },
      lat_end: {
        type: Sequelize.DECIMAL(10, 8),
      },
      long_end: {
        type: Sequelize.DECIMAL(11, 8),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("purchase_groups");
  },
};
