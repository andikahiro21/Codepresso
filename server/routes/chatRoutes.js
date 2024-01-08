/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express")
const router = express.Router()
const upload = require("../middleware/uploadMedia")
const { isUser } = require("../middleware/authorization")
const Authenticated = require("../middleware/authentication")
const {
  token,
  createChannels,
  deleteChannel,
} = require("../controllers/chatController")

router.get("/chat/token", Authenticated, token)
router.post(
  "/chat/create-channel",
  Authenticated,
  upload.array(),
  createChannels
)
router.delete(
  "/chat/delete-channel",
  Authenticated,
  upload.array(),
  deleteChannel
)

module.exports = router
