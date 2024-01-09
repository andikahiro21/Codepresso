/* eslint-disable quotes */
/* eslint-disable semi */
const { Router } = require("express")

const authRoute = require("./authRoutes")
const categoryRoute = require("./categoryRoutes")
const menuRoute = require("./menuRoutes")
const addressRoute = require("./addressRoutes")
const addOnsRoute = require("./addOnsRoutes")
const basketRoute = require("./basketRoutes")
const mapRoute = require("./mapRoutes")
const paymentRoute = require("./paymentRoutes")
const purchaseRoute = require("./purchaseRoutes")
const assetRoute = require("./assetsRoutes")
const chatRoute = require("./chatRoutes")

const router = Router()

router.use(authRoute)
router.use(categoryRoute)
router.use(menuRoute)
router.use(addressRoute)
router.use(addOnsRoute)
router.use(basketRoute)
router.use(mapRoute)
router.use(paymentRoute)
router.use(purchaseRoute)
router.use(assetRoute)
router.use(chatRoute)

module.exports = router
