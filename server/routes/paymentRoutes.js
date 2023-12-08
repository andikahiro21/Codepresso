/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMedia");
const { isUser } = require("../middleware/authorization");
const Authenticated = require("../middleware/authentication");

router.get("/payment");
router.get("/payment/:id");
router.post("/payment", Authenticated, isUser, upload.array());
router.put("/payment/:id", Authenticated, isUser, upload.array());
router.delete("/payment/:id", Authenticated, isUser);

module.exports = router;
