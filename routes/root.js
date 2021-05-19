const express = require("express");

const router = express.Router();
// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log(`url: ${req.url}, method:${req.method}`);
  next();
});
router.get("/", function (req, res) {
  res
    .status(200)
    .json({ success: true, message: `GET request to the homepage`, data: [] });
});

module.exports = router;
