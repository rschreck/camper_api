const Bootcamp = require("../models/Bootcamp");
const { ErrorResponse } = require("../utils/ErrorResponse");
const geocoder = require("../utils/geoCoder");
const asyncHandler = require("../middleware/asyncHandler");
//  @routes Get /v1/bootcamps
//  @access Public
getBootcamps = asyncHandler(async (req, res, next) => {
  const reqQuery = { ...req.query };
  const removeFields = ["select", "sort"];
  removeFields.forEach((match) => delete reqQuery[match]);
  let queryString = JSON.stringify(reqQuery);

  queryString = queryString.replace(
    /\b(gt|lt|gte|lte|in)\b/g,
    (match) => `$${match}`
  );
  let query = Bootcamp.find(JSON.parse(queryString));
  //select
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }
  //sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = qery.sort("-createdAt");
  }
  const bootcamps = await query;
  res.status(200).json({
    success: true,
    message: "Show all bootcamps",
    count: bootcamps.length,
    data: bootcamps,
  });
});

//  @desc   Get single bootcamp
//  @routes Get /v1/bootcamps/:id
//  @access Public
getBootcamp = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const bootcamp = await Bootcamp.findById(id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res
    .status(200)
    .json({ success: true, message: `Get bootcamp - ${id}`, data: bootcamp });
});

//  @desc   create single bootcamp
//  @routes POST /v1/bootcamps/:id
//  @access Public
createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res
    .status(201)
    .json({ success: true, message: "Create new bootcamp", data: bootcamp });
});
//  @desc   update single bootcamp
//  @routes PUT /v1/bootcamps/:id
//  @access Public
updateBootcamp = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    message: `Update bootcamp - ${id}`,
    data: bootcamp,
  });
});
//  @desc   delete single bootcamp
//  @routes DELETE /v1/bootcamps/:id
//  @access Public
deleteBootcamp = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const bootcamp = await Bootcamp.findByIdAndDelete(id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res
    .status(200)
    .json({ success: true, message: `Delete bootcamp - ${id}`, data: [] });
});
//  @desc   get bootcamps within radius
//  @routes GET /v1/bootcamps/radius/:zipcode/:distance
//  @access Public
getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  // get lat/lng
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  //calculate radius
  //divide distance by Radius of Earth
  //Earth Radius 3,958.8 mi
  const radius = distance / 3963;
  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] },
    },
  });
  res.status(200).json({
    success: true,
    message: `Get bootcamps - ${zipcode} - ${distance}`,
    count: bootcamps.length,
    data: bootcamps,
  });
});
module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
};
