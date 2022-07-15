const express = require("express");
const responseRouter = express.Router();

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const {
  createResponse,
  getAllResponses,
} = require("../controllers/responseController");

responseRouter.route("/create/:quizId").post(createResponse);
responseRouter.route("/get/all/:quizId").get(isAuthenticated, getAllResponses);

module.exports = responseRouter;
