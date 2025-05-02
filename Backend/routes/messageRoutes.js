const express = require("express");
const { isAuthentication } = require("../middleware/isAuthentication");
const messageController = require("../controllers/messageController");

const router = express.Router();

router.post("/send/:id", isAuthentication, messageController.sendMessage);
router.get("/:id", isAuthentication, messageController.getMessage);
module.exports = router;
