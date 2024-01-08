"use strict"

const { hashPassword } = require("../utils/bcryptPassword")
const { chatStreamClient } = require("../utils/streamChatUtil")
// const { chatStreamClient } = require("../utils/streamChatUtil");

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await chatStreamClient.upsertUsers([
        {
          id: "2",
          name: "Hiro(User)",
          image:
            "https://res.cloudinary.com/dem9rzjbs/image/upload/v1701160219/images/avatar-user.svg",
        },
        {
          id: "1",
          name: "Hiro(Admin)",
          image:
            "https://res.cloudinary.com/dem9rzjbs/image/upload/v1701160219/images/avatar-user.svg",
        },
        {
          id: "3",
          name: "Bagus Heru (Driver)",
          image:
            "https://res.cloudinary.com/dem9rzjbs/image/upload/v1704439389/images/n8i7cadtrr53cnnuzh0p.jpg",
        },
      ])

      await queryInterface.bulkInsert("Users", [
        {
          id: 2,
          full_name: "Hiro(User)",
          email: "hirouser@example.com",
          password: await hashPassword("password123"),
          role: 2,
          phone_number: "0818074523954",
          image:
            "https://res.cloudinary.com/dem9rzjbs/image/upload/v1701160219/images/avatar-user.svg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 1,
          full_name: "Hiro(Admin)",
          email: "hiroadmin@example.com",
          password: await hashPassword("password123"),
          role: 1,
          phone_number: "0818074523954",
          image:
            "https://res.cloudinary.com/dem9rzjbs/image/upload/v1701160219/images/avatar-user.svg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          full_name: "Bagus Heru (Driver)",
          email: "hirodriver@example.com",
          password: await hashPassword("password123"),
          role: 3,
          phone_number: "0818074523954",
          image:
            "https://res.cloudinary.com/dem9rzjbs/image/upload/v1704439389/images/n8i7cadtrr53cnnuzh0p.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
    } catch (error) {
      // Log and throw the error for better debugging
      console.error("Error during migration:", error)
      throw error
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback the database changes
    try {
      await queryInterface.bulkDelete("Users", null, {})
    } catch (error) {
      console.error("Error during rollback:", error)
      throw error
    }
  },
}
