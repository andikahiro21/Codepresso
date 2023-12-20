/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const { login, register, forgotPassword, resetPassword, registerDriver } = require("../controllers/authController");
const router = express.Router();
const upload = require("../middleware/uploadMedia");
const Authenticated = require("../middleware/authentication");
const { isAdmin } = require("../middleware/authorization");

router.post("/auth/login", upload.array(), login);
router.post("/auth/register", upload.array(), register);
router.post("/auth/forgot-password", upload.array(), forgotPassword);
router.put("/auth/reset-password/:token", upload.array(), resetPassword);
router.post("/auth/register-driver", Authenticated, isAdmin, upload.fields([{ name: "image", maxCount: 1 }]), registerDriver);

module.exports = router;
