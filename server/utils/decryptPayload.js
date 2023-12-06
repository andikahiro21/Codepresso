/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
const CryptoJS = require("crypto-js");

const decryptObjectPayload = (dataObject) => {
  try {
    const decryptedData = {};
    for (const key in dataObject) {
      const bytes = CryptoJS.AES.decrypt(dataObject[key], process.env.TOKEN_PAYLOAD);
      decryptedData[key] = bytes.toString(CryptoJS.enc.Utf8);
    }
    return decryptedData;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const decryptTextPayload = (token) => {
  try {
    const bytes = CryptoJS.AES.decrypt(token, process.env.TOKEN_PAYLOAD);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return null;
  }
};

module.exports = {
  decryptObjectPayload,
  decryptTextPayload,
};
