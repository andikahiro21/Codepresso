"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("baskets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      menu_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "menus",
          key: "id",
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      sugar_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "sugars",
          key: "id",
        },
      },
      size_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "sizes",
          key: "id",
        },
      },
      bean_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "beans",
          key: "id",
        },
      },
      milk_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "milk",
          key: "id",
        },
      },
      qty: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("baskets");
  },
};
