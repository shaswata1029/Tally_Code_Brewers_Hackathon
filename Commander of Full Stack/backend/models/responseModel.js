const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A response must have a user name."],
    },
    email: {
      type: String,
      required: [true, "A response must have a user email."],
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "quizModel",
      required: [true, "A response has to be associated with a quiz"],
    },
    score: {
      type: Number,
      required: [true, "A response has to be associated with a score"],
    },
    correctAnswers: {
      type: Number,
      required: [true, "Count of correct answers is required"],
    },
    incorrectAnswers: {
      type: Number,
      required: [true, "Count of incorrect answers is required"],
    },
    responses: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "questionModel",
          required: [true, "A response has to be associated with a question."],
        },
        responseAnswer: {
          type: String,
          required: [
            true,
            "A response must be associated with a response answer",
          ],
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const responseModel = mongoose.model("responseModel", responseSchema);
module.exports = responseModel;
