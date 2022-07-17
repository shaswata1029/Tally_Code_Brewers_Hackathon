import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userReducer, profileReducer } from "./reducers/userReducer";

import {
  quizzesReducer,
  newQuizReducer,
  quizDetailsReducer,
  quizReducer,
} from "./reducers/quizReducer";

import {
  newQuestionReducer,
  adminQuestionsReducer,
  questionsReducer,
  questionStatsReducer,
} from "./reducers/questionReducer";

import {
  newResponseReducer,
  responsesReducer,
} from "./reducers/responseReducer";

const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  quizzes: quizzesReducer,
  newQuiz: newQuizReducer,
  quizDetails: quizDetailsReducer,
  quiz: quizReducer,
  newQuestion: newQuestionReducer,
  adminQuestions: adminQuestionsReducer,
  questions: questionsReducer,
  newResponse: newResponseReducer,
  responses: responsesReducer,
  questionStats: questionStatsReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
