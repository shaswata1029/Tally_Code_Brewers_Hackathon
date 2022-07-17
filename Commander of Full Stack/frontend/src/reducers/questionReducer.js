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

export const newQuestionReducer = (state = { question: {} }, action) => {
  switch (action.type) {
    case NEW_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_QUESTION_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        question: action.payload.question,
      };
    case NEW_QUESTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_QUESTION_RESET:
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

export const adminQuestionsReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case ADMIN_QUESTION_REQUEST:
      return {
        loading: true,
        questions: [],
      };
    case ADMIN_QUESTION_SUCCESS:
      return {
        loading: false,
        questions: action.payload,
      };
    case ADMIN_QUESTION_FAIL:
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

export const questionsReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case ALL_QUESTION_REQUEST:
      return {
        loading: true,
        questions: [],
      };
    case ALL_QUESTION_SUCCESS:
      return {
        loading: false,
        questions: action.payload,
      };
    case ALL_QUESTION_FAIL:
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

export const questionStatsReducer = (state = { questionStats: {} }, action) => {
  switch (action.type) {
    case QUESTION_STATS_REQUEST:
      return {
        loading: true,
        questionStats: {},
      };
    case QUESTION_STATS_SUCCESS:
      return {
        loading: false,
        questionStats: action.payload,
      };
    case QUESTION_STATS_FAIL:
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
