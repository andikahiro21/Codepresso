/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMedia");
const { isAdmin, isDriver, isUser } = require("../middleware/authorization");
const Authenticated = require("../middleware/authentication");
const { setDelivery, setOrderFinish, getSelectedPurchaseGroups, getPurchaseGroups, getPurchaseGroupsAdmin, getActivePurchaseGroups } = require("../controllers/purchaseController");

router.put("/purchase/set-delivery/:id", Authenticated, isAdmin, upload.array(), setDelivery);
router.get("/purchase/admin", Authenticated, isAdmin, upload.array(), getPurchaseGroupsAdmin);
router.put("/purchase/set-finish/:id", Authenticated, isDriver, upload.array(), setOrderFinish);
router.get("/purchase/active-purchase", Authenticated, isDriver, getActivePurchaseGroups);
router.get("/purchase/:id", Authenticated, upload.array(), getSelectedPurchaseGroups);
router.get("/purchase", Authenticated, isUser, upload.array(), getPurchaseGroups);

module.exports = router;
