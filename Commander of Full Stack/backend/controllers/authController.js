const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary");

// Register a new user
module.exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  const defaultPublicId = process.env.DEFAULT_PUBLIC_ID;
  const defaultUrl = process.env.DEFAULT_URL;

  let isAvatarPresent = true;

  if (avatar === "") isAvatarPresent = false;

  console.log(isAvatarPresent);

  let myCloud;
  if (isAvatarPresent) {
    myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: isAvatarPresent ? myCloud.public_id : defaultPublicId,
      url: isAvatarPresent ? myCloud.secure_url : defaultUrl,
    },
  });

  const jwtToken = user.getJWTToKen();

  //   console.log(user);
  sendToken(user, 201, "New user created successfully", res);
});

// Login user
module.exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  // Checking if email and password exist

  if (!email || !password)
    return next(new ErrorHandler(400, "Please enter email and password"));

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler(401, "Invalid email or password"));

  //   console.log(password);
  const isPasswordMatched = await user.comparePassword(password);
  //   console.log(isPasswordMatched);
  if (!isPasswordMatched)
    return next(new ErrorHandler(401, "Invalid email or password"));

  // console.log(user);
  sendToken(user, 200, "User login successful", res);
});

// Logout user
module.exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, { httpOnly: true, expires: new Date(Date.now()) });
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
});
