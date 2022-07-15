const express = require("express");
const userRouter = express.Router();

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

const {
  getUserDetails,
  updatePassword,
  updateProfile,
} = require("../controllers/userController");

// auth controllers
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(logoutUser);

// user controllers
userRouter.route("/me").get(isAuthenticated, getUserDetails);
userRouter.route("/password/update").put(isAuthenticated, updatePassword);
userRouter.route("/me/update").put(isAuthenticated, updateProfile);

module.exports = userRouter;
