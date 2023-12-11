/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMedia");
const { isAdmin, isDriver } = require("../middleware/authorization");
const Authenticated = require("../middleware/authentication");
const { setDelivery, setOrderFinish } = require("../controllers/purchaseController");

router.put("/purchase/set-delivery/:id", Authenticated, isAdmin, upload.array(), setDelivery);
router.put("/purchase/set-finish/:id", Authenticated, isDriver, upload.array(), setOrderFinish);

module.exports = router;
