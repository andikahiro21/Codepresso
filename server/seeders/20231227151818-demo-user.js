'use strict';

const { hashPassword } = require('../utils/bcryptPassword');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        full_name: 'Hiro(User)',
        email: 'hirouser@example.com',
        password: await hashPassword('password123'),
        role: 2,
        phone_number: '0818074523954',
        image:
          'https://res.cloudinary.com/dem9rzjbs/image/upload/v1701160219/images/avatar-user.svg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: 'Hiro(Admin)',
        email: 'hiroadmin@example.com',
        password: await hashPassword('password123'),
        role: 1,
        phone_number: '0818074523954',
        image:
          'https://res.cloudinary.com/dem9rzjbs/image/upload/v1701160219/images/avatar-user.svg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: 'Hiro(Driver)',
        email: 'hirodriver@example.com',
        password: await hashPassword('password123'),
        role: 3,
        phone_number: '0818074523954',
        image:
          'https://res.cloudinary.com/dem9rzjbs/image/upload/v1701160219/images/avatar-user.svg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
