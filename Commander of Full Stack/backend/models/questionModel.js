const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "quizModel",
      required: [true, "A question has to be associated with a quiz required"],
    },
    title: {
      type: String,
      required: [true, "Question title required"],
    },
    correct: {
      type: String,
      required: [true, "Correct option required"],
    },
    marks: {
      type: Number,
      required: [true, "Question mark required"],
      min: [1, "Marks should be greater than 0"],
    },
    options: {
      type: [
        {
          value: String,
          frequency: { type: Number, default: 0, select: false },
        },
      ],
      validate: [checkArrayLimit, "Options length should only be 4"],
    },
    author: {
      type: String,
      required: [true, "A question needs an author."],
    },
    totalResponses: {
      type: Number,
      default: 0,
      select: false,
    },
    totalCorrectResponses: {
      type: Number,
      default: 0,
      select: false,
    },
    totalIncorrectResponses: {
      type: Number,
      default: 0,
      select: false,
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

function checkArrayLimit(val) {
  return val.length === 4;
}

const questionModel = mongoose.model("questionModel", questionSchema);
module.exports = questionModel;
