const Bootcamp = require("../models/Bootcamp");
const { ErrorResponse } = require("../utils/ErrorResponse");
const geocoder = require("../utils/geoCoder");
const asyncHandler = require("../middleware/asyncHandler");
const path = require("path");
//  @routes Get /v1/bootcamps
//  @access Public
getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
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
  req.body.user = req.user.id;
  //check for published bootcamp - Publisher can only add one bootcamp
  const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });
  if (publishedBootcamp && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `Already published one boocamp, User Id ${req.user.id}`,
        400
      )
    );
  }
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

  let bootcamp = await Bootcamp.findById(id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  //Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(`user ${req.user.id} is not authorized to update `, 401)
    );
  }
  bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
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
  //Now instead of using findbyiddelete, we need to use remove
  //const bootcamp = await Bootcamp.findByIdAndDelete(id);
  let bootcamp = await Bootcamp.findById(id);
  //Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(`user ${req.user.id} is not authorized to delete `, 401)
    );
  }
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  bootcamp.remove();
  res
    .status(200)
    .json({ success: true, message: `Delete bootcamp - ${id}`, data: [] });
});
//  @desc   file upload single bootcamp
//  @routes PUT /v1/bootcamps/:id
//  @access Public
uploadBootcampImg = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  //Now instead of using findbyiddelete, we need to use remove
  //const bootcamp = await Bootcamp.findByIdAndDelete(id);
  let bootcamp = await Bootcamp.findById(id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  if (!req.files) {
    return next(new ErrorResponse(`Image is missing`, 400));
  }
  const file = req.files.file;

  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Only Image kind of files allowed`, 400));
  }
  //check file size

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `File Size should be less than ${process.env.MAX_FILE_UPLOAD} `,
        400
      )
    );
  }
  //Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(`user ${req.user.id} is not authorized to update `, 401)
    );
  }
  //create custom filename
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(`file upload ${err}`);
      return next(new ErrorResponse(`File upload error `, 400));
    }
    bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, {
      photo: file.name,
    });
  });

  res.status(200).json({
    success: true,
    message: `File Upload bootcamp - ${id}`,
    data: bootcamp,
  });
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
  uploadBootcampImg,
};
