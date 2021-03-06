const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");

const { ErrorResponse } = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/asyncHandler");
//  @routes Get /v1/bootcamps
//  @access Public
getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    const courses = Course.find({ bootcamp: req.params.bootcampId });
    return res
      .status(200)
      .json({ success: true, count: courses.length, data: courses });
  } else {
    res.status(200).json(res.advancedResults);
  }
});
//  @routes POST /v1/bootcamps/bootcampId/courses
//  @access Public
addCourse = asyncHandler(async (req, res, next) => {
  let query;
  const { bootcampId } = req.params;
  const bootcamp = await Bootcamp.findById(bootcampId);
  //Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(`user ${req.user.id} is not authorized to update `, 401)
    );
  }
  if (!bootcamp) {
    return next(new ErrorResponse("Bootcamp not found", 404));
  }
  req.body.bootcamp = bootcampId;

  let course = await Course.create(req.body);
  res.status(200).json({
    success: true,
    data: course,
  });
});

//  @routes POST /v1/courses/id
//  @access Public
updateCourse = asyncHandler(async (req, res, next) => {
  let query;
  const { id } = req.params;
  let course = await Course.findById(id);
  if (!course) {
    return next(new ErrorResponse("Course not found", 404));
  }
  //Make sure user is bootcamp owner
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(`user ${req.user.id} is not authorized to update `, 401)
    );
  }
  course = await Course.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: course,
  });
});
deleteCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let course = await Course.findById(id);
  if (!course) {
    return next(new ErrorResponse("Course not found", 404));
  }
  //Make sure user is bootcamp owner
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(`user ${req.user.id} is not authorized to update `, 401)
    );
  }
  course = await Course.findByIdAndDelete(id, req.body);
  res.status(200).json({
    success: true,
  });
});

//  @routes Get /v1/bootcamps
//  @access Public
getCourse = asyncHandler(async (req, res, next) => {
  let query;
  const { id } = req.params;
  {
    // query = Course.find().populate("bootcamp"); //all the fields
    query = Course.findById(id).populate({
      path: "bootcamp",
      select: "name description",
    });
  }
  const course = await query;
  if (!course) {
    return next(new ErrorResponse(`No course found with id ${id}`), 404);
  }
  res.status(200).json({
    success: true,
    message: "Show a course",
    data: course,
  });
});

module.exports = {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
