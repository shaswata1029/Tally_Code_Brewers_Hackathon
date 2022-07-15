import {
  NEW_QUIZ_REQUEST,
  NEW_QUIZ_SUCCESS,
  NEW_QUIZ_RESET,
  NEW_QUIZ_FAIL,
  ALL_QUIZ_REQUEST,
  ALL_QUIZ_SUCCESS,
  ALL_QUIZ_FAIL,
  QUIZ_DETAILS_REQUEST,
  QUIZ_DETAILS_SUCCESS,
  QUIZ_DETAILS_FAIL,
  UPDATE_QUIZ_REQUEST,
  UPDATE_QUIZ_SUCCESS,
  UPDATE_QUIZ_RESET,
  UPDATE_QUIZ_FAIL,
  CLEAR_ERRORS,
} from "../constants/quizConstants";

import axios from "axios";

// Create a new Quiz
export const createQuiz = (quizData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_QUIZ_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/v1/quiz/create`, quizData, config);

    dispatch({
      type: NEW_QUIZ_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_QUIZ_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Quizzes
export const getAllQuizzes = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_QUIZ_REQUEST });

    const { data } = await axios.get(`/api/v1/quiz/quizzes/get`);

    dispatch({
      type: ALL_QUIZ_SUCCESS,
      payload: data.quizzes,
    });
  } catch (error) {
    dispatch({
      type: ALL_QUIZ_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Details of a Quiz
export const getQuizDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: QUIZ_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/quiz/get/${id}`);

    dispatch({
      type: QUIZ_DETAILS_SUCCESS,
      payload: data.quiz,
    });
  } catch (error) {
    dispatch({
      type: QUIZ_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update a quiz
export const updateQuiz = (id, quizData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_QUIZ_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/quiz/update/${id}`,
      quizData,
      config
    );

    dispatch({
      type: UPDATE_QUIZ_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_QUIZ_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
