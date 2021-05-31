const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.ctrl");
const router = express.Router({ mergeParams: true });
router.route("/").get(getCourses);
router.route("/:bootcampId").post(addCourse);
router.route("/:id").get(getCourse).put(updateCourse);
router.route("/:id").delete(deleteCourse);

module.exports = router;
