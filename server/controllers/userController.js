const User = require('../models/userModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/CatchAsyncErrors');
const sendToken = require('../utils/jwt');
const jwt = require('jsonwebtoken');

// register new user and upload avatar to cloudinary
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, phoneNumber, password } = req.body;
  if (!name || !email || !password || !phoneNumber) {
    return next(new ErrorHandler('Missing fields', 400));
  }
  const exitingUser = await User.findOne({ email });
  if (exitingUser) {
    return next(new ErrorHandler('User already exist', 400));
  }
  const user = await User.create({
    name,
    email,
    phoneNumber,
    password,
  });
  sendToken(user, 200, res);
});

// login existing user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { phoneNumber, password } = req.body;
  if (!phoneNumber || !password) {
    return next(new ErrorHandler('Missing fields', 400));
  }
  const user = await User.findOne({ phoneNumber }).select('+password');
  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }
  sendToken(user, 200, res);
});

// logout current user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  res.status(200).json({
    success: true,
    message: 'Logged Out',
  });
});

// send current user details
exports.sendCurrentUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(
      new ErrorHandler('Please login again to access this resource', 401)
    );
  }
  const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decodedData.id);
  if (!user) {
    new ErrorHandler('User not found', 401);
  }
  sendToken(user, 200, res);
});
