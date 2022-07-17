const questionModel = require("../models/questionModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Get statistics for a particular question
module.exports.getStatsByQuestion = catchAsyncErrors(async (req, res, next) => {
  const { questionId } = req.params;

  const question = await questionModel
    .findById(questionId)
    .select(
      "+totalResponses +totalCorrectResponses +totalIncorrectResponses +options.frequency"
    );

  if (!question) {
    return next(new ErrorHandler(404, "Invalid Question ID"));
  }

  if (question.author != req.user._id) {
    return next(new ErrorHandler(403, "Cannot access stats for this question"));
  }

  res.status(200).json({
    success: true,
    message: "Statistics retreived successfully",
    data: question,
  });
});
