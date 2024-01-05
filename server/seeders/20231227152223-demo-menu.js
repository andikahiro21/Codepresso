"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("menus", [
      {
        name: "Americano",
        category_id: 1,
        description:
          "Americano is a classic coffee beverage made by diluting a shot of espresso with hot water, resulting in a milder flavor and larger volume compared to a regular espresso. Its simple preparation and bold taste have made it a popular choice among coffee enthusiasts worldwide.",
        type: "Beverage",
        image:
          "https://res.cloudinary.com/dem9rzjbs/image/upload/v1702277612/images/odp4hmxzrqyyulprlijj.png",
        price: 22000,
        status: true,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Caffe Latte",
        category_id: 2,
        description:
          "Caffe latte, often referred to as simply is a creamy and comforting coffee beverage made by combining a shot of espresso with steamed milk. It offers a perfect balance between the rich flavors of espresso and the smoothness of milk, making it a popular choice among coffee enthusiasts worldwide.",
        type: "Beverage",
        image:
          "https://res.cloudinary.com/dem9rzjbs/image/upload/v1701961102/images/bysgz0k8huekxhmogoaj.png",
        price: 24000,
        status: true,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("menus", null, {});
  },
};
