const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");

const { ErrorResponse } = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/asyncHandler");
//  @routes Get /v1/bootcamps
//  @access Public
getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
    console.log(`${req.params.bootcampId}`);
  } else {
    // query = Course.find().populate("bootcamp"); //all the fields
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }
  const courses = await query;
  res.status(200).json({
    success: true,
    message: "Show all courses",
    count: courses.length,
    data: courses,
  });
});
//  @routes POST /v1/bootcamps/bootcampId/courses
//  @access Public
addCourse = asyncHandler(async (req, res, next) => {
  let query;
  const { bootcampId } = req.params;
  const bootcamp = await Bootcamp.findById(bootcampId);
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
//  @routes POST /v1/bootcamps/bootcampId/courses
//  @access Public
addCourse = asyncHandler(async (req, res, next) => {
  let query;
  const { bootcampId } = req.params;
  const bootcamp = await Bootcamp.findById(bootcampId);
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
