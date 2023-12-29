/* eslint-disable semi */
/* eslint-disable no-undef */
/* eslint-disable quotes */
const { Sugars, Sizes, Milk, Beans } = require("../models");

const getModelInstance = (category) => {
  switch (category) {
    case "Sizes":
      return Sizes;
    case "Beans":
      return Beans;
    case "Milk":
      return Milk;
    case "Sugars":
      return Sugars;
    default:
      throw new Error(`Invalid category: ${category}`);
  }
};

module.exports = { getModelInstance };
