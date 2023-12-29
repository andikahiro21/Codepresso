/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMedia");
const { isUser } = require("../middleware/authorization");
const Authenticated = require("../middleware/authentication");
const { createPayment, notificationMidtrans } = require("../controllers/paymentController");

router.post("/payment", Authenticated, isUser, upload.array(), createPayment);
router.post("/payment/notification", Authenticated, isUser, notificationMidtrans);

module.exports = router;
