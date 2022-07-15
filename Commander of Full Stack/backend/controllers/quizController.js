const quizModel = require("../models/quizModel");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new quiz
module.exports.createQuiz = catchAsyncErrors(async (req, res, next) => {
  const { title, description, category, status } = req.body;
  const author = req.user._id;

  if (!title || !description || !author || !category) {
    return next(
      new ErrorHandler(
        "Please send Quiz title, description,category and author.",
        400
      )
    );
  }

  const quiz = await quizModel.create({
    title,
    description,
    category,
    author,
    status: status,
  });

  return res.status(201).json({
    success: "success",
    message: "Quiz created successfully",
    quiz: quiz,
  });
});

// Get All quizzes
module.exports.getAllQuizzes = catchAsyncErrors(async (req, res, next) => {
  const author = req.user._id;
  const quizzes = await quizModel.find({ author: author });

  if (!quizzes) {
    return next(new ErrorHandler(`Quizzes not found `, 404));
  }

  return res.status(200).json({
    success: "success",
    message: "Quizzes found successfully",
    quizzes: quizzes,
  });
});

// Get quiz details
module.exports.getQuizDetails = catchAsyncErrors(async (req, res, next) => {
  const { quizId } = req.params;

  const quiz = await quizModel.findById(quizId);

  if (!quiz) {
    return next(new ErrorHandler(`Quiz not found with id ${quizId}`, 404));
  }

  return res.status(200).json({
    success: "success",
    message: "Quiz found successfully",
    quiz: quiz,
  });
});

// Update Quiz
module.exports.updateQuiz = catchAsyncErrors(async (req, res, next) => {
  const { quizId } = req.params;
  const { title, description, category, status } = req.body;

  let quiz = await quizModel.findById(quizId);

  if (!quiz) {
    return next(new ErrorHandler(`Quiz not found" with id ${quizId}`, 404));
  }

  const newQuizData = {
    title: title,
    description: description,
    category: category,
    status: status,
  };

  quiz = await quizModel.findByIdAndUpdate(quizId, newQuizData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res.status(200).json({
    success: "success",
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
    success: "success",
    message: "Quiz deleted successfully",
  });
});
