const express = require("express");
const rootRouter = express.Router();

const userRouter = require("./userRoute");
const quizRouter = require("./quizRoute");
const questionRouter = require("./questionRoute");
const responseRouter = require("./responseRoute");
const statisticsRouter = require("./statisticsRoute");

rootRouter.use("/user", userRouter);
rootRouter.use("/quiz", quizRouter);
rootRouter.use("/question", questionRouter);
rootRouter.use("/response", responseRouter);
rootRouter.use("/stats", statisticsRouter);

module.exports = rootRouter;
