/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const { uploadToCloudinary, deleteFromCloudinary } = require("../config/cloudinary");
const { extractPublicId } = require("../helpers/extractPublicId");
const { handleServerError, handleClientError } = require("../helpers/handleError");
const handleResponseSuccess = require("../helpers/responseSuccess");
const { validateBodyMenu } = require("../helpers/validationJoi");
const { Menus, Purchases } = require("../models");
const Redis = require("ioredis");
const redisClient = new Redis();

exports.getMenu = async (req, res) => {
  try {
    let menus = await redisClient.get("menus");

    if (!menus) {
      const response = await Menus.findAll();
      await redisClient.set("menus", JSON.stringify(response));
      menus = response;
    } else {
      menus = JSON.parse(menus);
    }

    handleResponseSuccess(res, 200, "success", menus);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getMenubyID = async (req, res) => {
  try {
    const { id } = req.params;

    let menus = await redisClient.get("menus");

    if (!menus) {
      menus = await Menus.findAll();

      await redisClient.set("menus", JSON.stringify(menus));
    } else {
      menus = JSON.parse(menus);
    }

    const selectedMenu = menus.find((menu) => menu.id === parseInt(id));

    if (!selectedMenu) {
      return handleClientError(res, 404, `Menu Not Found...`);
    }

    handleResponseSuccess(res, 200, "success", selectedMenu);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.createMenu = async (req, res) => {
  let imageResult;
  try {
    const newData = req.body;

    newData.qty = 1;

    if (!req.files || !req.files.image) {
      return handleClientError(res, 400, "Image Required");
    }

    const validate = validateBodyMenu(newData);
    if (validate) {
      return handleClientError(res, 400, validate);
    }

    const existingMenu = await Menus.findOne({ where: { name: newData.name } });
    if (existingMenu) {
      return handleClientError(res, 400, `Menu with name ${newData.name} already exist...`);
    }

    let imageUploaded = false;

    try {
      imageResult = await uploadToCloudinary(req.files.image[0], "image", "images");

      imageUploaded = true;
    } catch (uploadError) {
      if (imageUploaded) {
        await deleteFromCloudinary(imageResult.public_id);
      }
      return handleClientError(res, 500, "Error uploading files to Cloudinary");
    }

    newData.image = imageResult.secure_url;

    await redisClient.del("categoryMenus");
    await redisClient.del("menus");

    const newMenu = await Menus.create(newData);

    handleResponseSuccess(res, 201, "Menu Created", newMenu);
  } catch (error) {
    if (imageResult) {
      await deleteFromCloudinary(imageResult.public_id);
    }
    return handleServerError(res);
  }
};

exports.editMenu = async (req, res) => {
  let imageResult;
  try {
    const { id } = req.params;
    const newData = req.body;

    newData.qty = 1;

    const validate = validateBodyMenu(newData);
    if (validate) {
      return handleClientError(res, 400, validate);
    }

    const menu = await Menus.findByPk(id);

    if (!menu) {
      return handleClientError(res, 404, `Menu with ID ${id} not found.`);
    }

    if (req.files.image && menu.image) {
      const imageName = extractPublicId(menu.image);
      const imagePublicID = `images/${imageName}`;
      await deleteFromCloudinary(imagePublicID);
    }

    let imageUploaded = false;

    try {
      if (req.files.image) {
        imageResult = await uploadToCloudinary(req.files.image[0], "image");
        imageUploaded = true;
      }
    } catch (uploadError) {
      if (imageUploaded && imageResult && imageResult.public_id) {
        deleteFromCloudinary(imageResult.public_id);
      }
      return handleClientError(res, 500, "Error uploading files to Cloudinary");
    }

    const updatedData = {
      ...newData,
    };

    if (imageResult) {
      updatedData.image = imageResult.url;
    } else {
      delete updatedData.image;
    }

    await menu.update(updatedData);

    await redisClient.del("categoryMenus");
    await redisClient.del("menus");

    handleResponseSuccess(res, 200, "Menu Updated");
  } catch (error) {
    return handleServerError(res);
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const selectedMenu = await Menus.findByPk(id);

    if (!selectedMenu) {
      return handleClientError(res, 404, `Menu Not Found`);
    }

    const purchase = await Purchases.findOne({ where: { menu_id: selectedMenu.id } });

    if (purchase) {
      return handleClientError(res, 400, `Unable to delete the menu due to its association with existing purchase data.`);
    }

    if (selectedMenu.image) {
      const imageName = extractPublicId(selectedMenu.image);
      const imagePublicID = `images/${imageName}`;
      await deleteFromCloudinary(imagePublicID);
    }
    await Menus.destroy({ where: { id } });

    await redisClient.del("categoryMenus");
    await redisClient.del("menus");

    return handleResponseSuccess(res, 200, "Menu Deleted", selectedMenu);
  } catch (error) {
    return handleServerError(res);
  }
};
