import {
  NEW_QUESTION_REQUEST,
  NEW_QUESTION_SUCCESS,
  NEW_QUESTION_FAIL,
  NEW_QUESTION_RESET,
  ADMIN_QUESTION_REQUEST,
  ADMIN_QUESTION_SUCCESS,
  ADMIN_QUESTION_FAIL,
  ALL_QUESTION_REQUEST,
  ALL_QUESTION_SUCCESS,
  ALL_QUESTION_FAIL,
  QUESTION_STATS_REQUEST,
  QUESTION_STATS_SUCCESS,
  QUESTION_STATS_FAIL,
  CLEAR_ERRORS,
} from "../constants/questionConstants";

import axios from "axios";

// Create a new Question
export const createQuestion = (quizId, questionData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_QUESTION_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/question/create/${quizId}`,
      questionData,
      config
    );

    dispatch({
      type: NEW_QUESTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_QUESTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all questions with answers of a particular quiz
export const getAllQuestionsWithAnswers = (quizId) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_QUESTION_REQUEST });

    const { data } = await axios.get(
      `/api/v1/question/get/answers/all/${quizId}`
    );

    dispatch({
      type: ADMIN_QUESTION_SUCCESS,
      payload: data.questions,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_QUESTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all questions of a particular quiz without answers
export const getAllQuestions = (quizId) => async (dispatch) => {
  try {
    dispatch({ type: ALL_QUESTION_REQUEST });

    const { data } = await axios.get(`/api/v1/question/get/all/${quizId}`);

    dispatch({
      type: ALL_QUESTION_SUCCESS,
      payload: data.questions,
    });
  } catch (error) {
    dispatch({
      type: ALL_QUESTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get statistics for a particular questions
export const getQuestionStats = (questionId) => async (dispatch) => {
  try {
    dispatch({ type: QUESTION_STATS_REQUEST });

    const { data } = await axios.get(`/api/v1/stats/question/${questionId}`);

    dispatch({
      type: QUESTION_STATS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_STATS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
