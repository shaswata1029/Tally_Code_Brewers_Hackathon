const userModel = require("../models/userModel");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

// Get User Details
module.exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;

  // console.log(userId);

  const user = await userModel.findById(userId);

  res.status(200).json({ success: true, user });
});

// Update user password
module.exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const userId = req.user.id;
  let user = await userModel.findById(userId).select("+password");

  const isPasswordMatched = await user.comparePassword(oldPassword);
  //   console.log(isPasswordMatched);
  if (!isPasswordMatched)
    return next(new ErrorHandler(400, "Old password is incorrect"));

  if (!newPassword)
    return next(new ErrorHandler(400, "Please enter new password"));

  if (newPassword !== confirmPassword)
    return next(
      new ErrorHandler(400, "New password and confirm password does not match")
    );

  user.password = newPassword;
  await user.save();
  sendToken(user, 200, "User password updated  successfully", res);
});

// Update user Profile
module.exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Cloudinary
  if (req.body.avatar !== "") {
    const user = await userModel.findById(req.user.id);

    const defaultPublicId = process.env.DEFAULT_PUBLIC_ID;
    let isDefaultId = false;
    const imageId = user.avatar.public_id;

    if (imageId == defaultPublicId) isDefaultId = true;

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    if (!isDefaultId) await cloudinary.v2.uploader.destroy(imageId);
  }

  let user = await userModel.findByIdAndUpdate(userId, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  // console.log(user);
  res
    .status(200)
    .json({ success: true, message: "User Profile updated successfully" });
});
