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

export const newResponseReducer = (state = { response: {} }, action) => {
  switch (action.type) {
    case NEW_RESPONSE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_RESPONSE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        response: action.payload.response,
      };
    case NEW_RESPONSE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_RESPONSE_RESET:
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

export const responsesReducer = (state = { responses: [] }, action) => {
  switch (action.type) {
    case ALL_RESPONSE_REQUEST:
      return {
        loading: true,
        responses: [],
      };
    case ALL_RESPONSE_SUCCESS:
      return {
        loading: false,
        responses: action.payload,
      };
    case ALL_RESPONSE_FAIL:
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
