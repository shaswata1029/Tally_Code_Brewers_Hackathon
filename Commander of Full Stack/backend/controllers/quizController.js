const quizModel = require("../models/quizModel");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new quiz
module.exports.createQuiz = catchAsyncErrors(async (req, res, next) => {
  const { title, description, status } = req.body;
  const author = req.user._id;

  if (!title || !description || !author) {
    return next(
      new ErrorHandler("Please send Quiz title, description and author.", 400)
    );
  }

  const quiz = await quizModel.create({
    title,
    description,
    author,
    status: status,
  });

  return res.status(200).json({
    status: "success",
    message: "Quiz created successfully",
    quiz: quiz,
  });
});

// Get quiz details
module.exports.getQuizDetails = catchAsyncErrors(async (req, res, next) => {
  const { quizId } = req.params;

  const quiz = await quizModel.findById(quizId);

  if (!quiz) {
    return next(new ErrorHandler(`Quiz not found" with id ${quizId}`, 404));
  }

  return res.status(200).json({
    status: "success",
    message: "Quiz found successfully",
    quiz: quiz,
  });
});

// Update Quiz
module.exports.updateQuiz = catchAsyncErrors(async (req, res, next) => {
  const { quizId } = req.params;
  const { title, description, status } = req.body;

  let quiz = await quizModel.findById(quizId);

  if (!quiz) {
    return next(new ErrorHandler(`Quiz not found" with id ${quizId}`, 404));
  }

  const newQuizData = {
    title: title,
    description: description,
    status: status,
  };

  quiz = await quizModel.findByIdAndUpdate(quizId, newQuizData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res.status(200).json({
    status: "success",
    message: "Quiz updated successfully",
    quiz: quiz,
  });
});

// Delete Quiz
module.exports.deleteQuiz = catchAsyncErrors(async (req, res, next) => {
  const { quizId } = req.params;

  let quiz = await quizModel.findById(quizId);

  if (!quiz) {
    return next(new ErrorHandler(`Quiz not found" with id ${quizId}`, 404));
  }

  quiz.deleted = true;
  await quiz.save();

  return res.status(204).json({
    status: "success",
    message: "Quiz deleted successfully",
  });
});
