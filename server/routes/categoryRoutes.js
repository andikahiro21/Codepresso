/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const { getCategory, getCategoryMenu, createCategory, editCategory, deleteCategory } = require("../controllers/categoryController");
const upload = require("../middleware/uploadMedia");
const { isAdmin } = require("../middleware/authorization");
const Authenticated = require("../middleware/authentication");

router.get("/category", getCategory);
router.get("/category/menu", getCategoryMenu);
router.post("/category", Authenticated, isAdmin, upload.array(), createCategory);
router.put("/category/:id", Authenticated, isAdmin, upload.array(), editCategory);
router.delete("/category/:id", Authenticated, isAdmin, deleteCategory);

module.exports = router;
