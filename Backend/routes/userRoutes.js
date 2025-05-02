const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");
const { isAuthentication } = require("../middleware/isAuthentication");

router.post("/register", userController.register);
router.post("/login", userController.Login);
router.get("/logout", userController.LogOut);
router.get("/", isAuthentication, userController.getOtherUser);
module.exports = router;
