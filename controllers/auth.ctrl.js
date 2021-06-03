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
  sendTokenResponse(user, 200, res);
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
  //check if pw macthes
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse(`Invalid User/Password`, 404));
  }
  sendTokenResponse(user, 200, res);
});
const sendTokenResponse = async (user, statusCode, res) => {
  const token = await user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  return res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
module.exports = { registerUser, loginUser };
