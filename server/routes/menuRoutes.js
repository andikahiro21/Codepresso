/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const {
  getMenu,
  getMenubyID,
  createMenu,
  editMenu,
  deleteMenu,
  disableMenu,
  enableMenu,
  softDeleteMenu,
  getMenuSoftDeleted,
  restoreSoftDeletedMenu,
} = require("../controllers/menuController");
const upload = require("../middleware/uploadMedia");
const { isAdmin } = require("../middleware/authorization");
const Authenticated = require("../middleware/authentication");

router.get("/menu", getMenu);
router.get("/menu/soft-deleted", Authenticated, isAdmin, getMenuSoftDeleted);
router.get("/menu/:id", getMenubyID);
router.post(
  "/menu",
  Authenticated,
  isAdmin,
  upload.fields([{ name: "image", maxCount: 1 }]),
  createMenu
);
router.put(
  "/menu/:id",
  Authenticated,
  isAdmin,
  upload.fields([{ name: "image", maxCount: 1 }]),
  editMenu
);
router.put("/menu/disable/:id", Authenticated, isAdmin, disableMenu);
router.put("/menu/enable/:id", Authenticated, isAdmin, enableMenu);
router.put("/menu/soft-delete/:id", Authenticated, isAdmin, softDeleteMenu);
router.put("/menu/restore/:id", Authenticated, isAdmin, restoreSoftDeletedMenu);
router.delete("/menu/:id", Authenticated, isAdmin, deleteMenu);

module.exports = router;
