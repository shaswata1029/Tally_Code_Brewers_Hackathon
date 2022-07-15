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

export const quizzesReducer = (state = { quizzes: [] }, action) => {
  switch (action.type) {
    case ALL_QUIZ_REQUEST:
      return {
        loading: true,
        quizzes: [],
      };
    case ALL_QUIZ_SUCCESS:
      return {
        loading: false,
        quizzes: action.payload,
      };
    case ALL_QUIZ_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newQuizReducer = (state = { quiz: {} }, action) => {
  switch (action.type) {
    case NEW_QUIZ_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_QUIZ_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        quiz: action.payload.quiz,
      };
    case NEW_QUIZ_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_QUIZ_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const quizDetailsReducer = (state = { quiz: {} }, action) => {
  switch (action.type) {
    case QUIZ_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case QUIZ_DETAILS_SUCCESS:
      return {
        loading: false,
        quiz: action.payload,
      };
    case QUIZ_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const quizReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_QUIZ_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_QUIZ_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_QUIZ_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
