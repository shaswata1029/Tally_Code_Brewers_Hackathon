const express = require("express");
const quizRouter = express.Router();

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const {
  createQuiz,
  getQuizDetails,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quizController");

quizRouter.route("/create").post(isAuthenticated, createQuiz);
quizRouter.route("/get/:quizId").get(getQuizDetails);
quizRouter.route("/update/:quizId").put(isAuthenticated, updateQuiz);
quizRouter.route("/delete/:quizId").delete(isAuthenticated, deleteQuiz);

module.exports = quizRouter;
