const User = require("../models/User");
const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
} = require("../controllers/auth.ctrl");
router.route("/register").post(registerUser);
router.route("/login").put(loginUser);
router.route("/me").get(protect, getMe);
router.post("/forgotpassword", forgotPassword);
module.exports = router;
