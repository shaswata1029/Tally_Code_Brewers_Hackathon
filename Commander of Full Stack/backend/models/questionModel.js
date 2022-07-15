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
    options: {
      type: [{ value: String }],
      validate: [checkArrayLimit, "Options length should only be 4"],
    },
    author: {
      type: String,
      required: [true, "A quiz needs an author."],
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
