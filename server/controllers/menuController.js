/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../config/cloudinary")
const { extractPublicId } = require("../helpers/extractPublicId")
const {
  handleServerError,
  handleClientError,
} = require("../helpers/handleError")
const handleResponseSuccess = require("../helpers/responseSuccess")
const {
  validateBodyMenu,
  validateBodyEditMenu,
} = require("../helpers/validationJoi")
const {
  Menus,
  Purchases,
  Baskets,
  Sugars,
  Sizes,
  Milk,
  Beans,
} = require("../models")
const Redis = require("ioredis")
const { createAddOnsForMenu } = require("./addOnsController")
const { Op } = require("sequelize")
const redisClient = new Redis()

exports.getMenu = async (req, res) => {
  try {
    const page = req.query.page || 1
    const search = req.query.search || ""
    const category_id = req.query.category || undefined
    const limitPerPage = 10
    const offset = (page - 1) * limitPerPage
    const totalRecords = await Menus.count()
    const response = await Menus.findAll({
      where: {
        isDeleted: false,
        name: { [Op.like]: `%${search}%` },
        ...(category_id && { category_id: category_id }),
      },
      limit: limitPerPage,
      offset: offset,
      order: [["status", "DESC"]],
    })

    const totalPage = Math.ceil(totalRecords / limitPerPage)

    const data = {
      totalPage,
      page,
      data: response,
    }

    handleResponseSuccess(res, 200, "success", data)
  } catch (error) {
    console.log(error)
    return handleServerError(res)
  }
}

exports.getMenubyID = async (req, res) => {
  try {
    const { id } = req.params

    let menus = await redisClient.get("menus")

    if (!menus) {
      menus = await Menus.findAll()

      await redisClient.set("menus", JSON.stringify(menus))
    } else {
      menus = JSON.parse(menus)
    }

    const selectedMenu = menus.find((menu) => menu.id === parseInt(id))

    if (!selectedMenu) {
      return handleClientError(res, 404, `Menu Not Found...`)
    }

    handleResponseSuccess(res, 200, "success", selectedMenu)
  } catch (error) {
    return handleServerError(res)
  }
}

exports.createMenu = async (req, res) => {
  let imageResult
  try {
    const newData = req.body

    newData.status = false

    if (!req.files || !req.files.image) {
      return handleClientError(res, 400, "Image Required")
    }

    const validate = validateBodyMenu(newData)
    if (validate) {
      return handleClientError(res, 400, validate)
    }

    const existingMenu = await Menus.findOne({ where: { name: newData.name } })
    if (existingMenu) {
      return handleClientError(
        res,
        400,
        `Menu with name ${newData.name} already exists.`
      )
    }

    let imageUploaded = false

    try {
      imageResult = await uploadToCloudinary(
        req.files.image[0],
        "image",
        "images"
      )
      imageUploaded = true
    } catch (uploadError) {
      if (imageUploaded) {
        await deleteFromCloudinary(imageResult.public_id)
      }
      return handleClientError(res, 500, "Error uploading files to Cloudinary")
    }

    newData.image = imageResult.secure_url

    await redisClient.del("categoryMenus")
    await redisClient.del("menus")

    const newMenu = await Menus.create(newData)

    if (newData.sizes || newData.beans || newData.milk || newData.sugars) {
      const addOnsData = {
        menu_id: newMenu.id,
        sizes: newData.sizes,
        beans: newData.beans,
        milk: newData.milk,
        sugars: newData.sugars,
      }

      await createAddOnsForMenu({ body: addOnsData }, res)
    }

    handleResponseSuccess(res, 201, "Menu Created", newMenu)
  } catch (error) {
    if (imageResult) {
      await deleteFromCloudinary(imageResult.public_id)
    }
    return handleServerError(res)
  }
}

exports.editMenu = async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body

    newData.status = false

    const validate = validateBodyEditMenu(newData)
    if (validate) {
      return handleClientError(res, 400, validate)
    }

    const menu = await Menus.findByPk(id, {
      include: ["size", "bean", "milk", "sugar_level"],
    })

    if (!menu) {
      return handleClientError(res, 404, `Menu with ID ${id} not found.`)
    }

    if (req.files.image && menu.image) {
      const imageName = extractPublicId(menu.image)
      const imagePublicID = `images/${imageName}`
      await deleteFromCloudinary(imagePublicID)
    }

    let imageUploaded = false
    let imageResult

    try {
      if (req.files.image) {
        imageResult = await uploadToCloudinary(req.files.image[0], "image")
        imageUploaded = true
      }
    } catch (uploadError) {
      if (imageUploaded && imageResult && imageResult.public_id) {
        deleteFromCloudinary(imageResult.public_id)
      }
      return handleClientError(res, 500, "Error uploading files to Cloudinary")
    }

    const updatedData = {
      ...newData,
    }

    if (imageResult) {
      updatedData.image = imageResult.url
    } else {
      delete updatedData.image
    }

    await menu.update(updatedData)

    if (newData.sizes === "false") {
      await Sizes.destroy({ where: { menu_id: menu.id } })
    }

    if (newData.beans === "false") {
      await Beans.destroy({ where: { menu_id: menu.id } })
    }

    if (newData.milk === "false") {
      await Milk.destroy({ where: { menu_id: menu.id } })
    }

    if (newData.sugars === "false") {
      await Sugars.destroy({ where: { menu_id: menu.id } })
    }

    if (
      newData.sizes === "true" ||
      newData.beans === "true" ||
      newData.milk === "true" ||
      newData.sugars === "true"
    ) {
      const addOnsData = {
        menu_id: menu.id,
        sizes: newData.sizes,
        beans: newData.beans,
        milk: newData.milk,
        sugars: newData.sugars,
      }

      await createAddOnsForMenu({ body: addOnsData }, res)
    }

    await redisClient.del("categoryMenus")
    await redisClient.del("menus")

    handleResponseSuccess(res, 200, "Menu Updated")
  } catch (error) {
    return handleServerError(res)
  }
}

exports.disableMenu = async (req, res) => {
  try {
    const { id } = req.params
    const menu = await Menus.findByPk(id)

    if (!menu) {
      return handleClientError(res, 404, `Menu with ID ${id} not found.`)
    }

    await menu.update({ status: false })

    await redisClient.del("categoryMenus")
    await redisClient.del("menus")

    handleResponseSuccess(res, 200, "Menu Updated")
  } catch (error) {
    return handleServerError(res)
  }
}

exports.enableMenu = async (req, res) => {
  try {
    const { id } = req.params
    const menu = await Menus.findByPk(id)

    if (!menu) {
      return handleClientError(res, 404, `Menu with ID ${id} not found.`)
    }

    await menu.update({ status: true })

    await redisClient.del("categoryMenus")
    await redisClient.del("menus")

    handleResponseSuccess(res, 200, "Menu Updated")
  } catch (error) {
    return handleServerError(res)
  }
}

exports.deleteMenu = async (req, res) => {
  const { id } = req.params

  try {
    const selectedMenu = await Menus.findByPk(id)

    if (!selectedMenu) {
      return handleClientError(res, 404, `Menu Not Found`)
    }

    const purchase = await Purchases.findOne({
      where: { menu_id: selectedMenu.id },
    })

    if (purchase) {
      return handleClientError(
        res,
        400,
        `Unable to delete the menu due to its association with existing purchase data.`
      )
    }

    await Promise.all([
      Baskets.destroy({ where: { menu_id: selectedMenu.id } }),
      Sugars.destroy({ where: { menu_id: selectedMenu.id } }),
      Sizes.destroy({ where: { menu_id: selectedMenu.id } }),
      Milk.destroy({ where: { menu_id: selectedMenu.id } }),
      Beans.destroy({ where: { menu_id: selectedMenu.id } }),
    ])

    if (selectedMenu.image) {
      const imageName = extractPublicId(selectedMenu.image)
      const imagePublicID = `images/${imageName}`
      await deleteFromCloudinary(imagePublicID)
    }

    await Menus.destroy({ where: { id } })

    await redisClient.del("categoryMenus")
    await redisClient.del("menus")

    return handleResponseSuccess(res, 200, "Menu Deleted", selectedMenu)
  } catch (error) {
    return handleServerError(res)
  }
}

exports.getMenuSoftDeleted = async (req, res) => {
  try {
    const menus = await Menus.findAll({ where: { isDeleted: true } })

    if (!menus) {
      return handleClientError(res, 404, `Menu Not Found`)
    }

    return handleResponseSuccess(res, 200, "Success Get Menus", menus)
  } catch (error) {
    return handleServerError(res)
  }
}

exports.softDeleteMenu = async (req, res) => {
  try {
    const { id } = req.params
    const selectedMenu = await Menus.findByPk(id)

    if (!selectedMenu) {
      return handleClientError(res, 404, `Menu Not Found`)
    }

    await selectedMenu.update({ isDeleted: true })

    await redisClient.del("categoryMenus")
    await redisClient.del("menus")
    return handleResponseSuccess(res, 200, "Menu Soft Deleted", selectedMenu)
  } catch (error) {
    return handleServerError(res)
  }
}

exports.restoreSoftDeletedMenu = async (req, res) => {
  try {
    const { id } = req.params
    const selectedMenu = await Menus.findByPk(id)

    if (!selectedMenu) {
      return handleClientError(res, 404, `Menu Not Found`)
    }

    await selectedMenu.update({ isDeleted: false })

    await redisClient.del("categoryMenus")
    await redisClient.del("menus")
    return handleResponseSuccess(res, 200, "Menu Soft Restored", selectedMenu)
  } catch (error) {
    return handleServerError(res)
  }
}
