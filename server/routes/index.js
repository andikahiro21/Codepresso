const { Router } = require("express");

const authRoute = require("./authRoutes");

const router = Router();

router.use(authRoute);

module.exports = router;
