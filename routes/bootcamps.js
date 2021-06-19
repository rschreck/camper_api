const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  uploadBootcampImg,
} = require("../controllers/bootcamp.ctrl");
const advancedResults = require("../middleware/advancedResults");
const Bootcamp = require("../models/Bootcamp");
const courseRouter = require("./courses");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
//reroute into other resource routers
router.use("/:bootcampId/courses", courseRouter);
router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("admin, publisher"), createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("admin, publisher"), updateBootcamp)
  .delete(protect, authorize("admin, publisher"), deleteBootcamp);
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
router
  .route("/:id/photo")
  .put(protect, authorize("admin, publisher"), uploadBootcampImg);
module.exports = router;
