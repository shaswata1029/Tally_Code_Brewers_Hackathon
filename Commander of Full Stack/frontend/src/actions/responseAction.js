import {
  NEW_RESPONSE_REQUEST,
  NEW_RESPONSE_SUCCESS,
  NEW_RESPONSE_RESET,
  NEW_RESPONSE_FAIL,
  ALL_RESPONSE_REQUEST,
  ALL_RESPONSE_SUCCESS,
  ALL_RESPONSE_FAIL,
  CLEAR_ERRORS,
} from "../constants/responseConstants";

import axios from "axios";

// Create new response for a quizzes
export const createResponse = (quizId, responseData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_RESPONSE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/response/create/${quizId}`,
      responseData,
      config
    );

    dispatch({
      type: NEW_RESPONSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_RESPONSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all responses for a particular quiz
export const getAllResponses = (quizId) => async (dispatch) => {
  try {
    dispatch({ type: ALL_RESPONSE_REQUEST });

    const { data } = await axios.get(`/api/v1/response/get/all/${quizId}`);

    dispatch({
      type: ALL_RESPONSE_SUCCESS,
      payload: data.responses,
    });
  } catch (error) {
    dispatch({
      type: ALL_RESPONSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
