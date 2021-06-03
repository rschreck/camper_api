const User = require("../models/User");
const express = require("express");
const router = express.Router();
const { protect, getMe } = require("../middleware/auth");
const { registerUser, loginUser } = require("../controllers/auth.ctrl");
router.route("/register").post(registerUser);
router.route("/login").put(loginUser);
router.route("/me").get(protect, getMe);
module.exports = router;
