/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMedia");
const { isUser } = require("../middleware/authorization");
const Authenticated = require("../middleware/authentication");
const { getBasket, createBasket, updateBasket, deleteBasket } = require("../controllers/basketController");

router.get("/basket", Authenticated, isUser, getBasket);
router.get("/basket/:id");
router.post("/basket", Authenticated, isUser, upload.array(), createBasket);
router.put("/basket/:id", Authenticated, isUser, upload.array(), updateBasket);
router.delete("/basket/:id", Authenticated, isUser, deleteBasket);

module.exports = router;
