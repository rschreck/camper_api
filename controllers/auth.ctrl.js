const User = require("../models/User");
const { ErrorResponse } = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/asyncHandler");
//  @routes POST /v1/auth/register
//  @access Public
registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  const token = await user.getSignedJwtToken();
  return res.status(200).json({ success: true, token });
});
//  @routes PUT /v1/auth/register
//  @access Public
loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse(`Please supply email and password`, 404));
  }
  const user = await User.findOne({
    email,
  }).select("+password");
  if (!user) {
    return next(new ErrorResponse(`Invalid User/Password`, 404));
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse(`Invalid User/Password`, 404));
  }
  const token = await user.getSignedJwtToken();

  return res.status(200).json({ success: true, token });
});
//check if pw macthes

module.exports = { registerUser, loginUser };
