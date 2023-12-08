/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMedia");
const { isUser } = require("../middleware/authorization");
const Authenticated = require("../middleware/authentication");
const { getAddress, createAddress, getAddressId, editAddress, deleteAddress } = require("../controllers/addressController");

router.get("/address", Authenticated, isUser, getAddress);
router.get("/address/:id", Authenticated, isUser, getAddressId);
router.post("/address", Authenticated, isUser, upload.array(), createAddress);
router.put("/address/:id", Authenticated, isUser, upload.array(), editAddress);
router.delete("/address/:id", Authenticated, isUser, deleteAddress);

module.exports = router;
