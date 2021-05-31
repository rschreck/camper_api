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
const courseRouter = require("./courses");
const router = express.Router();
//reroute into other resource routers
router.use("/:bootcampId/courses", courseRouter);
router.route("/").get(getBootcamps).post(createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
router.route("/:id/photo").put(uploadBootcampImg);
module.exports = router;
