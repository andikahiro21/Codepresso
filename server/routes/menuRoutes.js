/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const { getMenu, getMenubyID, createMenu, editMenu, deleteMenu } = require("../controllers/menuController");
const upload = require("../middleware/uploadMedia");
const { isAdmin } = require("../middleware/authorization");
const Authenticated = require("../middleware/authentication");

router.get("/menu", getMenu);
router.get("/menu/:id", getMenubyID);
router.post("/menu", Authenticated, isAdmin, upload.fields([{ name: "image", maxCount: 1 }]), createMenu);
router.put("/menu/:id", Authenticated, isAdmin, upload.fields([{ name: "image", maxCount: 1 }]), editMenu);
router.delete("/menu/:id", Authenticated, isAdmin, deleteMenu);

module.exports = router;
