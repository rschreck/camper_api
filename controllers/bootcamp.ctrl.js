const Bootcamp = require("../models/Bootcamp");
//  @routes Get /v1/bootcamps
//  @access Public
getBootcamps = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: "Show all bootcamps", data: [] });
};
//  @desc   Get single bootcamp
//  @routes Get /v1/bootcamps/:id
//  @access Public
getBootcamp = (req, res, next) => {
  const { id } = req.params;
  res
    .status(200)
    .json({ success: true, message: `Get bootcamp - ${id}`, data: [] });
};
//  @desc   create single bootcamp
//  @routes POST /v1/bootcamps/:id
//  @access Public
createBootcamp = async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res
    .status(201)
    .json({ success: true, message: "Create new bootcamp", data: bootcamp });
};
//  @desc   update single bootcamp
//  @routes PUT /v1/bootcamps/:id
//  @access Public
updateBootcamp = (req, res, next) => {
  const { id } = req.params;
  res
    .status(200)
    .json({ success: true, message: `Update bootcamp - ${id}`, data: [] });
};
//  @desc   delete single bootcamp
//  @routes DELETE /v1/bootcamps/:id
//  @access Public
deleteBootcamp = (req, res, next) => {
  const { id } = req.params;
  res
    .status(200)
    .json({ success: true, message: `Delete bootcamp - ${id}`, data: [] });
};
module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
};
