const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const { ErrorResponse } = require("../utils/errorResponse");
const User = require("../models/User");
const protect = asyncHandler(async (req, res, next) => {
  let token;
  let { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    token = await authorization.split(" ")[1];
  }
  //   } else if (req.cookies) {
  //     token = req.cookies.token;
  //   }
  if (!token) {
    return next(new ErrorResponse(`Not authorize`, 404));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch {
    return next(new ErrorResponse("Not authorize", 401));
  }
});
const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});
module.exports = { protect, getMe };
