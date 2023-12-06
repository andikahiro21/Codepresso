const express = require("express");
const { login, register, forgotPassword, resetPassword } = require("../controllers/authController");
const router = express.Router();
const upload = require("../middleware/uploadMedia");

router.post("/auth/login", upload.array(), login);
router.post("/auth/register", upload.array(), register);
router.post("/auth/forgot-password", upload.array(), forgotPassword);
router.put("/auth/reset-password/:token", upload.array(), resetPassword);

module.exports = router;
