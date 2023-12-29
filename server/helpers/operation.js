/* eslint-disable comma-dangle */
/* eslint-disable semi */
// databaseOperations.js
const calculateTotalPrice = async (newData, itemId, modelName) => {
  if (newData[itemId]) {
    const item = await modelName.findByPk(newData[itemId]);
    if (item) {
      return item.price * newData.qty;
    }
  }
  return 0;
};

module.exports = {
  calculateTotalPrice,
};
