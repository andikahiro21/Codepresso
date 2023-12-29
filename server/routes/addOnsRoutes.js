/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMedia");
const { isAdmin } = require("../middleware/authorization");
const Authenticated = require("../middleware/authentication");
const { getAddOnsSelectedMenu, createAddOnsForMenu } = require("../controllers/addOnsController");

router.get("/add-ons/:id", getAddOnsSelectedMenu);
router.post("/add-ons", Authenticated, isAdmin, upload.array(), createAddOnsForMenu);
router.put("/add-ons/:id", Authenticated, isAdmin, upload.array());
router.delete("/add-ons/:id", Authenticated, isAdmin);

module.exports = router;
