const express = require("express");
const statisticsRouter = express.Router();

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const { getStatsByQuestion } = require("../controllers/statisticsController");

statisticsRouter
  .route("/question/:questionId")
  .get(isAuthenticated, getStatsByQuestion);

module.exports = statisticsRouter;
