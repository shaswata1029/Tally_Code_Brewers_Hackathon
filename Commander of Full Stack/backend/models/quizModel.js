const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Quiz title required"],
    },
    description: {
      type: String,
      default: "No Description",
    },
    status: {
      type: String,
      default: "draft",
      enum: ["draft", "active", "inactive"],
    },
    deleted: {
      type: Boolean,
      default: false,
      select: false,
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

const quizModel = mongoose.model("quizModel", quizSchema);
module.exports = quizModel;
