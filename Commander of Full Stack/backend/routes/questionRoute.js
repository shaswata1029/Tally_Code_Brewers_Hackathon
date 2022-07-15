const express = require("express");
const questionRouter = express.Router();

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const {
  createQuestion,
  getAllQuestions,
  getAllQuestionsWithAnswers,
} = require("../controllers/questionController");

questionRouter.route("/create/:quizId").post(isAuthenticated, createQuestion);
questionRouter.route("/get/all/:quizId").get(getAllQuestions);
questionRouter
  .route("/get/answers/all/:quizId")
  .get(isAuthenticated, getAllQuestionsWithAnswers);

module.exports = questionRouter;
