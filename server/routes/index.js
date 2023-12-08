/* eslint-disable quotes */
/* eslint-disable semi */
const { Router } = require("express");

const authRoute = require("./authRoutes");
const categoryRoute = require("./categoryRoutes");
const menuRoute = require("./menuRoutes");
const addressRoute = require("./addressRoutes");
const addOnsRoute = require("./addOnsRoutes");
const basketRoute = require("./basketRoutes");

const router = Router();

router.use(authRoute);
router.use(categoryRoute);
router.use(menuRoute);
router.use(addressRoute);
router.use(addOnsRoute);
router.use(basketRoute);

module.exports = router;
