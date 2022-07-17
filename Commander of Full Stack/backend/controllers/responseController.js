const quizModel = require("../models/quizModel");
const questionModel = require("../models/questionModel");
const responseModel = require("../models/responseModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create a new response
module.exports.createResponse = catchAsyncErrors(async (req, res, next) => {
  const { quizId } = req.params;
  const { name, email, responses } = req.body;

  const quiz = await quizModel.findById(quizId);

  if (!quiz) {
    return next(new ErrorHandler(404, `Quiz not found" with id ${quizId}`));
  }

  if (!Array.isArray(responses)) {
    return next(new ErrorHandler(400, "Please responses as an array."));
  }
  if (!(responses.length > 0)) {
    return next(new ErrorHandler(400, "Please do not send empty response."));
  }

  const length = responses.length;
  let score = 0;
  let incorrectAnswers = 0;
  let correctAnswers = 0;

  for (let index = 0; index < length; index++) {
    let questionId = responses[index].questionId;
    let question = await questionModel
      .findById(questionId)
      .select(
        "+totalResponses +totalCorrectResponses +totalIncorrectResponses +options.frequency"
      );

    if (!question) {
      return next(new ErrorHandler(404, "Invalid Question"));
    }

    let correctResponse = question.correct;
    let userResponse = responses[index].responseAnswer;

    question.totalResponses = question.totalResponses + 1;
    if (correctResponse == userResponse) {
      score += question.marks;
      correctAnswers++;
      question.totalCorrectResponses = question.totalCorrectResponses + 1;
    } else if (userResponse !== " ") {
      incorrectAnswers++;
      question.totalIncorrectResponses = question.totalIncorrectResponses + 1;
    }

    for (let option = 0; option < 4; option++) {
      if (question.options[option].value == userResponse) {
        question.options[option].frequency =
          question.options[option].frequency + 1;

        break;
      }
    }

    await question.save();
  }

  if (correctAnswers > incorrectAnswers) {
    score += Math.trunc(score / 5);
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

  console.log(response);

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
    return next(new ErrorHandler(404, `Quiz not found with id ${quizId}`));
  }

  const responses = await responseModel
    .find({ quiz: quizId })
    .select("-responses");

  if (!responses) {
    return next(new ErrorHandler(404, `Responses not found`));
  }

  res.status(200).json({
    sucess: true,
    message: "Responses retrieved successfully",
    responses,
  });
});
