const questionModel = require("../models/questionModel");
const quizModel = require("../models/quizModel");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { shuffleArray } = require("../utils/shuffleArray");

// Create new Question
module.exports.createQuestion = catchAsyncErrors(async (req, res, next) => {
  const { quizId } = req.params;
  const { title, correct, options, marks } = req.body;
  const author = req.user._id;

  const quiz = await quizModel.findById(quizId);

  if (!quiz) {
    return next(new ErrorHandler(404, `Quiz not found with id ${quizId}`));
  }

  if (!title || !correct || !options || !marks) {
    return next(
      new ErrorHandler(
        400,
        "Please send Quiz, title, correct, marks and  options array"
      )
    );
  }

  options.forEach((option) => {
    if (!option.value) {
      return next(
        new ErrorHandler(400, "Please send all option with a value key in it.")
      );
    }
  });

  const question = await questionModel.create({
    quiz: quizId,
    author: author,
    title,
    correct,
    marks,
    options,
  });

  return res.status(201).json({
    success: "success",
    message: "Question created successfully",
    question,
  });
});

// Get All Questions for a quiz
module.exports.getAllQuestions = catchAsyncErrors(async (req, res, next) => {
  const { quizId } = req.params;
  const quiz = await quizModel.findById(quizId);

  if (!quiz) {
    return next(new ErrorHandler(404, `Quiz not found with id ${quizId}`));
  }

  if (quiz.status !== "active") {
    return next(new ErrorHandler(404, `Quiz not active now`));
  }

  let questions = await questionModel.find({ quiz: quizId }).select("-correct");

  if (!questions || questions.length == 0) {
    return next(
      new ErrorHandler(404, `Questions not found for quiz with id ${quizId}`)
    );
  }

  let newQuestions = shuffleArray(questions);
  return res.status(200).json({
    success: "success",
    message: "Questions successfully retrieved",
    questions: newQuestions,
    author: quiz.author,
  });
});

// Get All questions with correct answers
module.exports.getAllQuestionsWithAnswers = catchAsyncErrors(
  async (req, res, next) => {
    const { quizId } = req.params;
    const quiz = await quizModel.findById(quizId);

    if (!quiz) {
      return next(new ErrorHandler(404, `Quiz not found with id ${quizId}`));
    }

    if (quiz.author != req.user._id) {
      return next(new ErrorHandler(403, `Quiz not allowed to access`));
    }

    const questions = await questionModel.find({ quiz: quizId });

    if (!questions) {
      return next(
        new ErrorHandler(404, `Questions not found for quiz with id ${quizId}`)
      );
    }

    return res.status(200).json({
      success: "success",
      message: "Question successfully retrieved",
      questions,
      author: quiz.author,
    });
  }
);
