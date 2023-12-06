/* eslint-disable quotes */
/* eslint-disable semi */
const { Router } = require("express");

const authRoute = require("./authRoutes");
const categoryRoute = require("./categoryRoutes");

const router = Router();

router.use(authRoute);
router.use(categoryRoute);

module.exports = router;
