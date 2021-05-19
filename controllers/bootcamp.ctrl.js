const Bootcamp = require("../models/Bootcamp");
//  @routes Get /v1/bootcamps
//  @access Public
getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      message: "Show all bootcamps",
      data: bootcamps,
      count: bootcamps.length,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Error get bootcamps", data: [] });
  }
};

//  @desc   Get single bootcamp
//  @routes Get /v1/bootcamps/:id
//  @access Public
getBootcamp = async (req, res, next) => {
  const { id } = req.params;
  try {
    const bootcamp = await Bootcamp.findById(id);
    if (!bootcamp) {
      return res.status(400).json({
        success: false,
        message: `Not found bootcamp - ${id}`,
        data: [],
      });
    }
    res
      .status(200)
      .json({ success: true, message: `Get bootcamp - ${id}`, data: bootcamp });
  } catch (err) {
    //console.log(`eeerrrr`);
    next(err);
  }
};

//  @desc   create single bootcamp
//  @routes POST /v1/bootcamps/:id
//  @access Public
createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "Create new bootcamp", data: bootcamp });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Error new bootcamp", data: [] });
  }
};
//  @desc   update single bootcamp
//  @routes PUT /v1/bootcamps/:id
//  @access Public
updateBootcamp = async (req, res, next) => {
  const { id } = req.params;
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return res.status(400).json({
        success: false,
        message: `Not found bootcamp - ${id}`,
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: `Update bootcamp - ${id}`,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error updating bootcamp ${error.message}`,
      data: [],
    });
  }
};
//  @desc   delete single bootcamp
//  @routes DELETE /v1/bootcamps/:id
//  @access Public
deleteBootcamp = async (req, res, next) => {
  const { id } = req.params;
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(id);
    if (!bootcamp) {
      return res.status(400).json({
        success: false,
        message: `Not found bootcamp - ${id}`,
        data: [],
      });
    }
    res
      .status(200)
      .json({ success: true, message: `Delete bootcamp - ${id}`, data: [] });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error deleting bootcamp ${error.message}`,
      data: [],
    });
  }
};
module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
};
