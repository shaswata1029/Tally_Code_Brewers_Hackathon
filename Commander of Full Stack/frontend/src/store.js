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
} from "./reducers/questionReducer";

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
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
