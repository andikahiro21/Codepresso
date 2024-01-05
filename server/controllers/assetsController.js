const path = require('path')
const readFile = require('../utils/readFile');
const { handleServerError, handleClientErrorr } = require("../helpers/handleError");
const handleResponseSuccess = require("../helpers/responseSuccess");

exports.getAssetsImages = async (req, res) => {
  try {
    const assetsImages = path.join(__dirname, '../database/assetsImages.json')
    const response = await readFile(assetsImages)
    return handleResponseSuccess(res, 200, "success", response);
  } catch (error) {
    return handleServerError(res);
  }
}

exports.getTranslation = async (req, res) => {
  try {
    const id = await readFile(path.join(__dirname, '../database/id.json'));
    const en = await readFile(path.join(__dirname, '../database/en.json'));
    if (!id && !en) return handleClientErrorr(res, 404, 'asset not found')
    const response = {
      id,
      en
    }
    return handleResponseSuccess(res, 200, "success", response);
  } catch (error) {
    return handleServerError(res);
  }
}