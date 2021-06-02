const User = require("../models/User");
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/auth.ctrl");
router.route("/register").post(registerUser);
router.route("/login").put(loginUser);
module.exports = router;
