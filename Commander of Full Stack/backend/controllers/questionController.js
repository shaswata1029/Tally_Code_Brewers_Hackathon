const questionModel = require("../models/questionModel");
const quizModel = require("../models/quizModel");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Question
module.exports.createQuestion = catchAsyncErrors(async (req, res, next) => {
  const { quizId } = req.params;
  const { title, correct, options } = req.body;
  const author = req.user._id;

  const quiz = await quizModel.findById(quizId);

  if (!quiz) {
    return next(new ErrorHandler(`Quiz not found with id ${quizId}`, 404));
  }

  if (!title || !correct || !options) {
    return next(
      new ErrorHandler("Please send Quiz, title, correct, options array", 400)
    );
  }

  options.forEach((option) => {
    if (!option.value) {
      return next(
        new ErrorHandler("Please send all option with a value key in it.")
      );
    }
  });

  const question = await questionModel.create({
    quiz: quizId,
    author: author,
    title,
    correct,
    options,
  });

  return res.status(201).json({
    status: "success",
    message: "Question created successfully",
    question,
  });
});

// Get All Questions for a quiz
module.exports.getAllQuestions = catchAsyncErrors(async (req, res, next) => {
  const { quizId } = req.params;
  const quiz = await quizModel.findById(quizId);

  if (!quiz) {
    return next(new ErrorHandler(`Quiz not found with id ${quizId}`, 404));
  }

  if (quiz.status !== "active") {
    return next(new ErrorHandler(`Quiz not active now`, 404));
  }

  const questions = await questionModel
    .find({ quiz: quizId })
    .select("-correct");

  return res.status(200).json({
    status: "success",
    message: "Question successfully retrieved",
    questions,
    author: quiz.author,
  });
});

// Get All questions with correct answers
module.exports.getAllQuestionsWithAnswers = catchAsyncErrors(
  async (req, res, next) => {
    const { quizId } = req.params;
    const quiz = await quizModel.findById(quizId);

    if (!quiz) {
      return next(new ErrorHandler(`Quiz not found with id ${quizId}`, 404));
    }

    const questions = await questionModel.find({ quiz: quizId });

    return res.status(200).json({
      status: "success",
      message: "Question successfully retrieved",
      questions,
      author: quiz.author,
    });
  }
);
