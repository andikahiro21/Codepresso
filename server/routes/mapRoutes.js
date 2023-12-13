/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMedia");
const { isUser } = require("../middleware/authorization");
const Authenticated = require("../middleware/authentication");
const { getDistance } = require("../controllers/mapController");

router.get("/map/distance", Authenticated, isUser, upload.array(), getDistance);

module.exports = router;
