const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  res
    .status(200)
    .json({ success: true, message: `GET request to the homepage`, data: [] });
});

module.exports = router;
