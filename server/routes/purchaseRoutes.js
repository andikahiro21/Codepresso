/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMedia");
const { isUser } = require("../middleware/authorization");
const Authenticated = require("../middleware/authentication");

router.get("/purchase");
router.get("/purchase/:id");
router.post("/purchase", Authenticated, isUser, upload.array());
router.put("/purchase/:id", Authenticated, isUser, upload.array());
router.delete("/purchase/:id", Authenticated, isUser);

module.exports = router;
