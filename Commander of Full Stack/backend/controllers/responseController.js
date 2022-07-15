const quizModel = require("../models/quizModel");
const questionModel = require("../models/questionModel");
const responseModel = require("../models/responseModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create a new response
module.exports.createResponse = catchAsyncErrors(async (req, res, next) => {
  const { quizId } = req.params;
  const { name, email, score, correctAnswers, incorrectAnswers, responses } =
    req.body;

  const quiz = await quizModel.findById(quizId);

  if (!quiz) {
    return next(new ErrorHandler(`Quiz not found" with id ${quizId}`, 404));
  }

  if (!Array.isArray(responses)) {
    return next(new ErrorHandler("Please responses as an array.", 400));
  }
  if (!(responses.length > 0)) {
    return next(new ErrorHandler("Please do not send empty response.", 400));
  }

  const response = await responseModel.create({
    quiz: quizId,
    name,
    email,
    score,
    correctAnswers,
    incorrectAnswers,
    responses,
  });

  res.status(201).json({
    sucess: true,
    message: "Response created successfully",
    response,
  });
});

// Get All Responses of a Particular Quiz
module.exports.getAllResponses = catchAsyncErrors(async (req, res, next) => {
  const { quizId } = req.params;

  const quiz = await quizModel.findById(quizId);

  if (!quiz) {
    return next(new ErrorHandler(`Quiz not found" with id ${quizId}`, 404));
  }

  const responses = await responseModel
    .find({ quiz: quizId })
    .select("-responses");

  res.status(200).json({
    sucess: true,
    message: "Responses retrieved successfully",
    responses,
  });
});
